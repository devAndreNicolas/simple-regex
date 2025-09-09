import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RegexValidatorService } from './core/services/regex-validator.service';
import { RegexExplainerService } from './core/services/regex-explainer.service';
import { NgIf, NgFor } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { OnboardingModalComponent } from './core/shared/components/onboarding-modal/onboarding-modal.component';
import { AlertComponent } from './core/shared/components/alert/alert.component';
import { RegexDisplayComponent } from './core/shared/components/regex-display/regex-display.component';
import { AdBannerComponent } from "./core/shared/components/ad-banner/ad-banner.component";
import { RegexGeneratorService } from './core/services/regex-generator.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    OnboardingModalComponent,
    AlertComponent,
    RegexDisplayComponent,
    LucideAngularModule,
    AdBannerComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'regex-tool';

  generatedRegex: string = '';
  testText: string = '';
  feedbackMessage: string = '';
  feedbackType: 'success' | 'error' | 'warning' = 'warning';
  showOnboarding: boolean = false;
  regexParts: any[] = [];

  // Variáveis para as opções de select
  urlCategories: string[] = ['optional', 'mandatory'];
  postalCodeCategories: string[] = ['brazil', 'usa', 'canada', 'uk', 'germany'];

    // Variáveis para controlar os valores dos selects
  selectedUrlCategory!: string | null;
  selectedPostalCodeCategory!: string | null;

  
  constructor(
    private validatorService: RegexValidatorService,
    private explainerService: RegexExplainerService,
    private regexGeneratorService: RegexGeneratorService
  ) {}

  ngOnInit(): void {
    const onboardingDone = localStorage.getItem('onboardingDone');
    if (!onboardingDone) {
      this.showOnboarding = true;
    }
  }

  generateRegex(type: string, category?: string): void {
    this.testText = '';
    this.setFeedback('', 'warning');

    // Reseta o select de URL se o tipo gerado não for uma URL
    if (type !== 'url') {
      this.selectedUrlCategory = null;
    }

    // Reseta o select de Código Postal se o tipo gerado não for um CEP
    if (type !== 'cep') {
      this.selectedPostalCodeCategory = null;
    }

    const regex = this.regexGeneratorService.getRegex(type, category);
    this.generatedRegex = regex;
    this.explainRegex(this.generatedRegex);
  }

  // Método de validação de texto
  validateText(): void {
    if (!this.generatedRegex) {
      this.setFeedback('Nenhuma regex para testar.', 'warning');
      return;
    }

    try {
      const validationResult = this.validatorService.validateText(this.generatedRegex, this.testText);

      if (this.testText === '') {
        this.setFeedback('', 'warning');
      } else if (validationResult.isValid) {
        this.setFeedback('✅ Texto válido! Corresponde 100% ao padrão.', 'success');
      } else if (validationResult.matches > 0) {
        this.setFeedback(`🔍 ${validationResult.matches} correspondência(s) encontrada(s).`, 'warning');
      } else {
        this.setFeedback('❌ Texto inválido! Não corresponde ao padrão.', 'error');
      }
    } catch (e) {
      const errorMessage = (e instanceof Error) ? e.message : String(e);
      this.setFeedback(`⚠️ Regex inválida: ${errorMessage}`, 'error');
    }
  }

  // Método para explicar a regex
  explainRegex(regex: string): void {
    this.regexParts = this.explainerService.explain(regex);
  }

  private setFeedback(message: string, type: 'success' | 'error' | 'warning'): void {
    this.feedbackMessage = message;
    this.feedbackType = type;
  }
}