import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ad-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ad-banner.component.html',
  styleUrls: ['./ad-banner.component.scss']
})
export class AdBannerComponent {
  @Input() imageUrl: string = '';
  @Input() linkUrl: string = '#';
  @Input() altText: string = 'Anúncio promocional';
}