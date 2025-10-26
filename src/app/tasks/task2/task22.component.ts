import {ChangeDetectionStrategy, Component, signal, TrackByFunction} from '@angular/core';
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatButton} from '@angular/material/button';
import {SelectionModel} from '@angular/cdk/collections';

interface Row {
  id: number;
  title: string;
}

function createRows(): Row[] {
  return Array.from({length: 50000}, (_, i) => i).map(i => ({id: i, title: `Item ${i}`}))
}

@Component({
  selector: 'app-task22',
  imports: [
    CdkVirtualScrollViewport,
    MatCheckbox,
    CdkVirtualForOf,
    CdkFixedSizeVirtualScroll,
    MatButton
  ],
  standalone: true,
  templateUrl: './task22.component.html',
  styleUrls: ['./task2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Task22Component {
  rows = signal<Row[]>(createRows());

  protected trackBy: TrackByFunction<Row> | undefined = (_, item) => item.id;

  protected selection = new SelectionModel<Row>(true, []);

  protected selectAll() {
    this.rows().forEach(row => this.selection.select(row));
  }

  protected deselectAll() {
    this.selection.clear();
  }

  protected recreateData() {
    this.rows.set(createRows());
    this.selection.clear();
  }
}
