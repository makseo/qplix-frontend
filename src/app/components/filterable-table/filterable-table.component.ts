import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import {Observable} from 'rxjs';
import {MatColumnDef, MatHeaderRowDef, MatNoDataRow, MatRowDef, MatTable,} from '@angular/material/table';
import {DataSource} from '@angular/cdk/collections';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

export const DEFAULT_PAGE_SIZE = 10;

@Component({
  selector: 'filterable-table',
  standalone: true,
  imports: [MatProgressSpinner, MatTable, MatPaginator],
  templateUrl: './filterable-table.component.html',
  styleUrl: './filterable-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterableTableComponent<T> implements AfterContentInit {
  @ContentChildren(MatHeaderRowDef) headerRowDefs?: QueryList<MatHeaderRowDef>;
  @ContentChildren(MatRowDef) rowDefs?: QueryList<MatRowDef<T>>;
  @ContentChildren(MatColumnDef) columnDefs?: QueryList<MatColumnDef>;
  @ContentChild(MatNoDataRow) noDataRow?: MatNoDataRow;

  @ViewChild(MatTable, {static: true}) table?: MatTable<T>;

  @Input() columns: string[] = [];

  @Input() dataSource:
    | readonly T[]
    | DataSource<T>
    | Observable<readonly T[]>
    | null = null;
  @Input() isLoading: boolean | null = false;
  @Input() pageIndex: number = 0;
  @Input() pageSize: number = DEFAULT_PAGE_SIZE;
  @Input() pageSizeOptions: number[] = [5, DEFAULT_PAGE_SIZE, 25, 100];
  @Input() totalItems: number = 0;

  @Output() pageChange = new EventEmitter<PageEvent>();

  public ngAfterContentInit(): void {
    this.columnDefs?.forEach((columnDef) =>
      this.table?.addColumnDef(columnDef)
    );
    this.rowDefs?.forEach((rowDef) => this.table?.addRowDef(rowDef));
    this.headerRowDefs?.forEach((headerRowDef) =>
      this.table?.addHeaderRowDef(headerRowDef)
    );
    this.table?.setNoDataRow(this.noDataRow ?? null);
  }

  protected onPageChange(event: PageEvent): void {
    this.pageChange.emit(event);
  }
}
