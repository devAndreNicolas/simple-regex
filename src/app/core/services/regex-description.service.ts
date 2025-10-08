import { Injectable, Inject, LOCALE_ID } from '@angular/core';

declare const $localize: any;

@Injectable({
  providedIn: 'root'
})
export class RegexDescriptionService {

  constructor(@Inject(LOCALE_ID) private localeId: string) { }

  generateDescription(type: string, category?: string): string {
    switch (type) {
      case 'email':
        return $localize`:@@descEmail:Valida endereços de e-mail com estrutura: nome@domínio.extensão. Aceita letras, números e símbolos como ponto ou sublinhado.`;

      case 'phone':
        return $localize`:@@descPhone:Valida telefones brasileiros com ou sem DDD e hífen. Aceita formatos como (11) 91234-5678 ou 11912345678.`;

      case 'cpf':
        return $localize`:@@descCpf:Verifica se o texto segue o padrão de CPF brasileiro: 000.000.000-00 ou 00000000000.`;

      case 'date':
        return $localize`:@@descDate:Valida datas no formato brasileiro DD/MM/AAAA, como 25/12/2025.`;

      case 'cep':
        switch (category) {
          case 'brazil':
            return $localize`:@@descCepBrazil:Valida CEPs do Brasil no formato 12345-678 ou 12345678.`;
          case 'usa':
            return $localize`:@@descCepUsa:Valida ZIP Codes dos EUA, como 12345 ou 12345-6789.`;
          case 'canada':
            return $localize`:@@descCepCanada:Valida códigos postais canadenses no formato A1A 1A1, com ou sem espaço.`;
          case 'uk':
            return $localize`:@@descCepUk:Valida postcodes do Reino Unido como SW1A 0AA.`;
          case 'germany':
            return $localize`:@@descCepGermany:Valida códigos postais da Alemanha com 5 dígitos.`;
        }
        break;

      case 'url':
        if (category === 'optional') {
          return $localize`:@@descUrlOptional:Valida URLs com ou sem protocolo (http:// ou https://), como www.site.com ou https://site.com.`;
        } else if (category === 'mandatory') {
          return $localize`:@@descUrlMandatory:Valida URLs que exigem o protocolo (http:// ou https://), como https://site.com.`;
        }
        break;
    }

    return $localize`:@@descCustomRegex:Expressão regular personalizada. Confira a explicação técnica abaixo.`;
  }
}