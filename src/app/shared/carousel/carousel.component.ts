import {ChangeDetectionStrategy, Component, input, output, signal} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

export type CarouselImage = {
  url: string;
  alt: string;
  caption?: string;
};

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatIconModule, MatButtonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent {
  readonly images = input.required<CarouselImage[]>();
  readonly showIndicators = input(true);
  readonly showNavigation = input(true);
  readonly showCaptions = input(true);
  readonly aspectRatio = input('16/9'); // e.g., '16/9', '4/3', '1/1'

  readonly imageChanged = output<{ index: number; image: CarouselImage }>();

  protected currentImageIndex = signal(0);

  protected get currentImage(): CarouselImage {
    return this.images()[this.currentImageIndex()];
  }

  protected get hasMultipleImages(): boolean {
    return this.images().length > 1;
  }

  protected nextImage(): void {
    const nextIndex = (this.currentImageIndex() + 1) % this.images().length;
    this.setImageIndex(nextIndex);
  }

  protected previousImage(): void {
    const prevIndex = this.currentImageIndex() === 0
      ? this.images().length - 1
      : this.currentImageIndex() - 1;
    this.setImageIndex(prevIndex);
  }

  protected goToImage(index: number): void {
    this.setImageIndex(index);
  }

  private setImageIndex(index: number): void {
    this.currentImageIndex.set(index);
    this.imageChanged.emit({
      index,
      image: this.images()[index]
    });
  }
}
