import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
} from '@angular/material/table';
import {BehaviorSubject, switchMap, tap} from 'rxjs';
import {SecurityService} from '../../services/security.service';
import {DEFAULT_PAGE_SIZE, FilterableTableComponent} from '../filterable-table/filterable-table.component';
import {AsyncPipe} from '@angular/common';
import {FilterBarComponent, FilterBarConfig} from '../filter-bar/filter-bar.component';
import {SecuritiesFilter} from '../../models/securities-filter';
import {PageEvent} from '@angular/material/paginator';
import {toObservable} from '@angular/core/rxjs-interop';
import {distinctUntilChanged} from 'rxjs/operators';
import {indicate} from '../../utils';

@Component({
  selector: 'securities-list',
  standalone: true,
  imports: [
    FilterableTableComponent,
    AsyncPipe,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatNoDataRow,
    MatRowDef,
    MatRow,
    FilterBarComponent,
  ],
  templateUrl: './securities-list.component.html',
  styleUrl: './securities-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecuritiesListComponent {
  protected displayedColumns: string[] = ['name', 'type', 'currency'];

  private _securityService = inject(SecurityService);
  protected loadingSecurities$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // Use signals for reactive state management
  // NOTICE: alternatively, we can still use BehaviorSubject + combineLatest from RxJS
  private filterState = signal<Record<string, unknown>>({});
  private pageState = signal<PageEvent>({
    pageIndex: 0,
    pageSize: DEFAULT_PAGE_SIZE,
    length: 0
  });

  private currentFilter = computed<SecuritiesFilter>(() => {
    const filter = this.filterState();
    const page = this.pageState();

    return {
      ...filter,
      skip: page.pageIndex * page.pageSize,
      limit: page.pageSize
    };
  });

  private filter$ = toObservable(this.currentFilter).pipe(
    distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
  );

  // NOTICE: alternative way using only RxJS
  // in template [totalItems]="(securities$ | async)?.total ?? 0"
  // in this case recommend to use shareReplay(1) to avoid multiple requests
  protected securities$ = this.filter$.pipe(
    switchMap((filter) => {
        return this._securityService.getSecurities(filter).pipe(
          indicate(this.loadingSecurities$),
          tap((response) => {
            this.pageState.update(prev => ({
              ...prev,
              length: response.total
            }));
          }),
        );
      }
    ),
  );

  protected pageIndex = computed(() => this.pageState().pageIndex);
  protected totalItems = computed(() => this.pageState().length);

  readonly filterConfig: FilterBarConfig = {
    fields: [
      {
        key: 'name',
        type: 'text',
        label: 'Name',
        placeholder: 'Filter by name...'
      },
      {
        key: 'types',
        type: 'multi-select',
        label: 'Types',
        options: [
          {label: 'Equity', value: 'Equity'},
          {label: 'Closed-end Fund', value: 'Closed-endFund'},
          {label: 'Bank Account', value: 'BankAccount'},
          {label: 'Direct Holding', value: 'DirectHolding'},
          {label: 'Generic', value: 'Generic'},
          {label: 'Loan', value: 'Loan'},
          {label: 'Collectible', value: 'Collectible'},
          {label: 'Real Estate', value: 'RealEstate'}
        ]
      },
      {
        key: 'currencies',
        type: 'multi-select',
        label: 'Currencies',
        options: [
          {label: 'USD', value: 'USD'},
          {label: 'EUR', value: 'EUR'},
          {label: 'GBP', value: 'GBP'},
          {label: 'CHF', value: 'CHF'},
        ]
      },
      {
        key: 'isPrivate',
        type: 'select',
        label: 'Private Only',
        options: [
          {label: 'Both', value: null},
          {label: 'Yes', value: true},
          {label: 'No', value: false}
        ]
      }
    ],
    debounceTime: 300
  };

  protected onFilterChange(filter: Record<string, unknown>) {
    // Reset to first page when filter changes
    this.pageState.update(prev => ({...prev, pageIndex: 0}));

    this.filterState.set(filter);
  }

  protected onPageChange(event: PageEvent) {
    this.pageState.set(event);
  }
}
