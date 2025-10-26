import {ChangeDetectionStrategy, Component, computed, signal, TrackByFunction} from '@angular/core';
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatButton} from '@angular/material/button';

interface Row {
  id: number;
  title: string;
}

function createRows(): Row[] {
  return Array.from({length: 50000}, (_, i) => i).map(i => ({id: i, title: `Item ${i}`}))
}

@Component({
  selector: 'app-task2',
  imports: [
    CdkVirtualScrollViewport,
    MatCheckbox,
    CdkVirtualForOf,
    CdkFixedSizeVirtualScroll,
    MatButton
  ],
  standalone: true,
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Task2Component {
  rows = signal<Row[]>(createRows());

  // NOTICE: store only ids to reduce memory consumption
  private selectedIds = signal<Set<number>>(new Set());

  // NOTICE: Precompute selection state for each row to avoid recalculating it on each change detection cycle
  protected selectionMap = computed(() => {
    const selected = this.selectedIds();
    const map = new Map<number, boolean>();
    this.rows().forEach(row => map.set(row.id, selected.has(row.id)));
    return map;
  });

  protected trackBy: TrackByFunction<Row> | undefined = (_, item) => item.id;

  protected toggle(row: Row) {
    const currentSelection = new Set(this.selectedIds());
    if (currentSelection.has(row.id)) {
      currentSelection.delete(row.id);
    } else {
      currentSelection.add(row.id);
    }
    this.selectedIds.set(currentSelection);
  }

  protected selectAll() {
    this.selectedIds.set(new Set(this.rows().map(row => row.id)));
  }

  protected deselectAll() {
    this.selectedIds.set(new Set());
  }

  protected recreateData() {
    this.rows.set(createRows());
    this.selectedIds.set(new Set());
  }
}
