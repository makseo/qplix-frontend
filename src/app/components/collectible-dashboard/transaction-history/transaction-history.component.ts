import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Transaction} from '../collectible-dashboard.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {CdkDragHandle} from '@angular/cdk/drag-drop';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    CurrencyPipe,
    DatePipe,
    CdkDragHandle,
    MatIcon,
  ],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionHistoryComponent {
  readonly transactions = input.required<Transaction[]>();

  protected readonly displayedColumns = ['date', 'salePrice', 'location', 'details'];
}
