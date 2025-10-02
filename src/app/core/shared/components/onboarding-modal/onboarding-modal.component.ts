import { Component, EventEmitter, Inject, Output, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-onboarding-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="modal-overlay" (click)="closeModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <h2>Bem-vindo ao Simple Regex!</h2>
        <p>Confira rapidamente nossas funcionalidades para começar:</p>
        <ol>
          <li>Guia de Visual de Regex: Aprenda e entenda expressões regulares de forma simples.</li>
          <li>Gerador: Escolha o tipo de regex que precisa (ex: E-mail).</li>
          <li>Explicador: Entenda cada parte da regex gerada.</li>
          <li>Testador: Cole um texto para ver se ele corresponde ao padrão.</li>
        </ol>
        <button class="btn btn-primary" (click)="closeModal()">Entendi!</button>
      </div>
    </div>
  `,
  styleUrls: ['./onboarding-modal.component.scss']
})
export class OnboardingModalComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ){}

  @Output() closed = new EventEmitter<void>();
  
  closeModal(): void {
    // Apenas execute este código se estiver no navegador.
    // Isso evita o erro no servidor, que não tem localStorage.
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('onboardingDone', 'true');
    }
    this.closed.emit();
  }
}