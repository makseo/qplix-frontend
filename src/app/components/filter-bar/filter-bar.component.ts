import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  OnInit,
  output
} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';

export type FilterField = {
  key: string;
  type: 'text' | 'multi-select' | 'select';
  label: string;
  options?: { label: string; value: unknown }[];
  placeholder?: string;
}

export type FilterBarConfig = {
  fields: FilterField[];
  debounceTime?: number;
}

@Component({
  selector: 'filter-bar',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatButton,

  ],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterBarComponent implements OnInit {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  config = input.required<FilterBarConfig>();
  filterChange = output<Record<string, unknown>>();

  protected filterForm = this.formBuilder.group({});
  private readonly debounceTime = computed(() => this.config()?.debounceTime ?? 0);

  constructor() {
    // Reinitialize form when config changes
    effect(() => {
      const config = this.config();
      this.initializeForm(config);
      this.setupFilterListeners();
    });
  }

  ngOnInit() {
    this.initializeForm(this.config());
  }

  protected clearFilter() {
    this.filterForm.reset();
  }

  private initializeForm(config: FilterBarConfig) {
    const formControls: Record<string, unknown> = {};

    config.fields.forEach(field => {
      switch (field.type) {
        case 'text':
          formControls[field.key] = '';
          break;
        case 'multi-select':
          formControls[field.key] = [];
          break;
        case 'select':
          formControls[field.key] = null;
          break;
      }
    });

    this.filterForm = this.formBuilder.group(formControls);
  }

  private setupFilterListeners() {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(this.debounceTime()),
        // NOTICE: alternative `isEqual` from `lodash` like this: `distinctUntilChanged(isEqual),`
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(value => {
        this.filterChange.emit(this.sanitizeFilterValue(value));
      });
  }

  private sanitizeFilterValue(value: Record<string, unknown>) {
    const sanitized: Record<string, unknown> = {};
    for (const key in value) {
      if (value[key] !== null && value[key] !== undefined && value[key] !== '' && !(Array.isArray(value[key]) && value[key].length === 0)) {
        sanitized[key] = value[key];
      }
    }
    return sanitized;
  }
}
