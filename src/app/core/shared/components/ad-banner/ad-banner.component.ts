import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegexGuideModalComponent } from '../../../features/regex-guide-modal/regex-guide-modal.component';

@Component({
  selector: 'app-ad-banner',
  standalone: true,
  imports: [CommonModule, MatDialogModule ,RegexGuideModalComponent],
  templateUrl: './ad-banner.component.html',
  styleUrls: ['./ad-banner.component.scss']
})
export class AdBannerComponent {
  constructor(
    public dialog: MatDialog
  ) {}

  @Input() mode: 'fake' | 'real' = 'fake';
  
  openRegexGuide() {
    this.dialog.open(RegexGuideModalComponent, {
      width: '600px',
    });
  }
}
