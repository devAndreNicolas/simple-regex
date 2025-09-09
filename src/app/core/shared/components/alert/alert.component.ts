import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="alert" [ngClass]="type">
      <lucide-icon [name]="iconName" class="icon"></lucide-icon>
      <div class="message">
        {{ message }}
      </div>
    </div>
  `,
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'warning' = 'warning';

  get iconName(): string {
    switch (this.type) {
      case 'success': return 'check-circle';
      case 'error': return 'x-circle';
      case 'warning': return 'alert-circle';
      default: return 'info';
    }
  }
}