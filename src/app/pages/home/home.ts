import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { RegexValidatorService } from '../../core/services/regex-validator.service';
import { RegexExplainerService } from '../../core/services/regex-explainer.service';
import { LucideAngularModule } from 'lucide-angular';
import { OnboardingModalComponent } from '../../core/shared/components/onboarding-modal/onboarding-modal.component';
import { AlertComponent } from '../../core/shared/components/alert/alert.component';
import { RegexDisplayComponent } from '../../core/shared/components/regex-display/regex-display.component';
import { AdBannerComponent } from "../../core/shared/components/ad-banner/ad-banner.component";
import { RegexGeneratorService } from '../../core/services/regex-generator.service';
import { RegexDescriptionService } from '../../core/services/regex-description.service';

@Component({
  selector: 'app-home',
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
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
  title = 'regex-simples';
  
  generatedRegex: string = '';
  testText: string = '';
  feedbackMessage: string = '';
  feedbackType: 'success' | 'error' | 'warning' = 'warning';
  showOnboarding: boolean = false;
  regexParts: any[] = [];
  regexDescription: string = '';
  currentType = '';
  currentCategory = '';
  
  urlCategories: string[] = ['optional', 'mandatory'];
  postalCodeCategories: string[] = ['brazil', 'usa', 'canada', 'uk', 'germany'];
  
  selectedUrlCategory!: string | null;
  selectedPostalCodeCategory!: string | null;
  
  constructor(
    private validatorService: RegexValidatorService,
    private explainerService: RegexExplainerService,
    private regexGeneratorService: RegexGeneratorService,
    private descriptionService: RegexDescriptionService,
    private titleService: Title,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      const onboardingDone = localStorage.getItem('onboardingDone');
      if (!onboardingDone) {
        this.showOnboarding = true;
      }
    }
  }
  
  generateRegex(type: string, category?: string): void {
    this.testText = '';
    this.setFeedback('', 'warning');
  
    this.currentType = type;
    this.currentCategory = category || 'default';
  
    if (type !== 'url') {
      this.selectedUrlCategory = null;
    }
  
    if (type !== 'cep') {
      this.selectedPostalCodeCategory = null;
    }
  
    const regex = this.regexGeneratorService.getRegex(type, category);
    this.generatedRegex = regex;
    this.explainRegex(this.generatedRegex);
    this.updateMetaTags(type, category);
  }
  
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
  
  explainRegex(regex: string): void {
    this.regexParts = this.explainerService.explain(regex);
    this.regexDescription = this.descriptionService.generateDescription(this.currentType, this.currentCategory);
  }
  
  private setFeedback(message: string, type: 'success' | 'error' | 'warning'): void {
    this.feedbackMessage = message;
    this.feedbackType = type;
  }
  
  private updateMetaTags(type: string, category?: string): void {
    const typeMap: { [key: string]: string } = {
      'email': 'E-mail',
      'phone': 'Telefone',
      'cpf': 'CPF',
      'cep': 'CEP',
      'date': 'Data',
      'url': 'URL',
    };
    const categoryMap: { [key: string]: string } = {
      'brazil': 'do Brasil',
      'usa': 'dos EUA',
      'canada': 'do Canadá',
      'uk': 'do Reino Unido',
      'germany': 'da Alemanha',
      'optional': 'com HTTPS Opcional',
      'mandatory': 'com HTTPS Obrigatório',
      'default': '',
    };
    
    const typeDescription = typeMap[type] || '';
    const categoryDescription = categoryMap[category || 'default'] || '';
    
    let description = '';
    if (typeDescription && categoryDescription && categoryDescription !== 'default') {
        description = `Gere a regex para ${typeDescription} ${categoryDescription} de forma simples e rápida com a nossa ferramenta online.`;
    } else if (typeDescription) {
        description = `Gere e teste a regex para ${typeDescription} de forma simples e rápida com a nossa ferramenta online.`;
    } else {
        description = 'Gere e teste expressões regulares de forma simples e rápida com nossa ferramenta intuitiva.';
    }
  
    const newTitle = `Regex para ${typeDescription} ${categoryDescription} | Regex Simples`.trim();
    this.titleService.setTitle(newTitle);
    this.metaService.updateTag({ name: 'description', content: description });
  }
}