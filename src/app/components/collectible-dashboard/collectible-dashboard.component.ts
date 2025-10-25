import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {AssetHeaderComponent} from './asset-header/asset-header.component';
import {CarouselImage} from '../../shared';
import {AssetDetailsComponent} from './asset-details/asset-details.component';
import {PerformanceChartComponent} from './performance-chart/performance-chart.component';
import {TransactionHistoryComponent} from './transaction-history/transaction-history.component';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';

export type AssetDetails = {
  name: string;
  images: CarouselImage[];
  estimatedValue: number;
  acquisitionDate: Date;
  acquisitionCost: number;
  serialNumber: string;
  condition: string;
}

export type ValuePoint = {
  name: string;
  value: number;
  date: Date;
}

export type Transaction = {
  date: Date;
  salePrice: number;
  location: string;
  details: string;
}

export type DashboardItem = {
  id: 'details' | 'performance' | 'transactions';
  title: string;
  order: number;
}

@Component({
  selector: 'app-collectible-dashboard',
  standalone: true,
  imports: [
    AssetHeaderComponent,
    AssetDetailsComponent,
    PerformanceChartComponent,
    TransactionHistoryComponent,
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './collectible-dashboard.component.html',
  styleUrl: './collectible-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectibleDashboardComponent {
  // DEMO data - this would typically come from HTTP service via input bindings
  protected readonly assetDetails = signal<AssetDetails>({
    name: '1964 Aston Martin DB5',
    images: [
      {url: '/1964_aston_martin_db5_1.jpg', alt: '1964 Aston Martin DB5 Front View'},
      {url: '/1964_aston_martin_db5_2.jpg', alt: '1964 Aston Martin DB5 Side View'},
      {url: '/1964_aston_martin_db5_3.jpg', alt: '1964 Aston Martin DB5 Interior'},
    ],
    estimatedValue: 1250000,
    acquisitionDate: new Date('2018-06-15'),
    acquisitionCost: 850000,
    serialNumber: 'DB5/2161/R',
    condition: 'Concours Condition - Fully Restored',
  });

  // Performance demo data
  protected readonly performanceData = signal<ValuePoint[]>([
    {name: '2018', value: 850000, date: new Date('2018-01-01')},
    {name: '2019', value: 950000, date: new Date('2019-01-01')},
    {name: '2020', value: 1050000, date: new Date('2020-01-01')},
    {name: '2021', value: 1150000, date: new Date('2021-01-01')},
    {name: '2022', value: 1200000, date: new Date('2022-01-01')},
    {name: '2023', value: 1250000, date: new Date('2023-01-01')},
    {name: '2024', value: 1300000, date: new Date('2024-01-01')},
    {name: '2025', value: 1350000, date: new Date('2025-01-01')},
  ]);

  // Transaction history
  protected readonly transactions = signal<Transaction[]>([
    {
      date: new Date('2023-05-15'),
      salePrice: 1320000,
      location: 'London, UK',
      details: 'Similar model, matching numbers'
    },
    {
      date: new Date('2022-11-20'),
      salePrice: 1180000,
      location: 'Monte Carlo, Monaco',
      details: 'Excellent condition, one owner'
    },
    {date: new Date('2022-03-10'), salePrice: 1120000, location: 'New York, USA', details: 'Full service history'},
    {date: new Date('2021-08-05'), salePrice: 1050000, location: 'Paris, France', details: 'Recent restoration'},
    {date: new Date('2020-12-18'), salePrice: 980000, location: 'Munich, Germany', details: 'Original paint preserved'},
  ]);

  constructor() {
    this.loadSavedLayout();
  }

  protected readonly dashboardItems = signal<DashboardItem[]>([
    {id: 'details', title: 'Asset Details', order: 1},
    {id: 'performance', title: 'Performance Analytics', order: 2},
    {id: 'transactions', title: 'Transaction History', order: 3}
  ]);

  protected onDrop(event: CdkDragDrop<DashboardItem[]>) {
    const items = [...this.dashboardItems()];
    moveItemInArray(items, event.previousIndex, event.currentIndex);

    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1
    }));

    this.dashboardItems.set(updatedItems);

    this.saveDashboardLayout(updatedItems);
  }

  private saveDashboardLayout(items: DashboardItem[]) {
    localStorage.setItem('dashboard-layout', JSON.stringify(items));
  }

  private loadSavedLayout() {
    const savedLayout = localStorage.getItem('dashboard-layout');
    if (savedLayout) {
      try {
        const items = JSON.parse(savedLayout);
        this.dashboardItems.set(items);
      } catch (e) {
        console.warn('Failed to load saved dashboard layout', e);
      }
    }
  }
}

