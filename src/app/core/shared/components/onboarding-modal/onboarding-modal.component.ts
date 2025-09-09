import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-onboarding-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="modal-overlay" (click)="closeModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <h2>Bem-vindo ao Gerador de Regex!</h2>
        <p>Este guia rápido irá te ajudar a começar:</p>
        <ol>
          <li>**Gerador:** Escolha o tipo de regex que precisa (ex: E-mail).</li>
          <li>**Explicador:** Entenda cada parte da regex gerada.</li>
          <li>**Testador:** Cole um texto para ver se ele corresponde ao padrão.</li>
        </ol>
        <button class="btn btn-primary" (click)="closeModal()">Entendi!</button>
      </div>
    </div>
  `,
  styleUrls: ['./onboarding-modal.component.scss']
})
export class OnboardingModalComponent {
  @Output() closed = new EventEmitter<void>();

  closeModal(): void {
    localStorage.setItem('onboardingDone', 'true');
    this.closed.emit();
  }
}