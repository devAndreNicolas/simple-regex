import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-regex-display',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="regex-container">
      <div class="regex-code">{{ regex }}</div>
      <button class="btn btn-copy" (click)="copyToClipboard()">
        <lucide-icon name="copy" class="icon"></lucide-icon>
      </button>
    </div>
  `,
  styleUrls: ['./regex-display.component.scss']
})
export class RegexDisplayComponent {
  @Input() regex: string = '';

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.regex)
      .then(() => console.log('Regex copiada!'))
      .catch(err => console.error('Erro ao copiar: ', err));
  }
}