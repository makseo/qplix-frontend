import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {ValuePoint} from '../collectible-dashboard.component';
import {MatCardModule} from '@angular/material/card';
import {LineChartModule} from '@swimlane/ngx-charts';
import {CdkDragHandle} from '@angular/cdk/drag-drop';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-performance-chart',
  standalone: true,
  imports: [
    MatCardModule,
    LineChartModule,
    CdkDragHandle,
    MatIcon
  ],
  templateUrl: './performance-chart.component.html',
  styleUrl: './performance-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformanceChartComponent {
  readonly performanceData = input.required<ValuePoint[]>();

  protected readonly chartData = computed(() => {
    const series = this.performanceData();
    return [
      {
        series,
        name: 'Value Trend',
      }
    ];
  });
}
