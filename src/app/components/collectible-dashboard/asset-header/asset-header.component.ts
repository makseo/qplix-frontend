import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {CurrencyPipe} from '@angular/common';
import {CarouselComponent, CarouselImage} from '../../../shared';

@Component({
  selector: 'app-asset-header',
  standalone: true,
  imports: [
    MatCardModule,
    CurrencyPipe,
    CarouselComponent
  ],
  templateUrl: './asset-header.component.html',
  styleUrl: './asset-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetHeaderComponent {
  readonly name = input.required<string>();
  readonly estimatedValue = input.required<number>();
  readonly images = input.required<CarouselImage[]>();
}
