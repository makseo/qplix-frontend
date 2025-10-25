import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {AssetDetails} from '../collectible-dashboard.component';
import {CdkDragHandle} from '@angular/cdk/drag-drop';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-asset-details',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    DatePipe,
    CurrencyPipe,
    CdkDragHandle,
    MatIcon
  ],
  templateUrl: './asset-details.component.html',
  styleUrl: './asset-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetDetailsComponent {
  readonly assetDetails = input.required<AssetDetails>();
}
