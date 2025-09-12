import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegexDescriptionService {

  generateDescription(type: string, category?: string): string {
    switch (type) {
      case 'email':
        return `Valida endereços de e-mail com estrutura: nome@domínio.extensão. Aceita letras, números e símbolos como ponto ou sublinhado.`;

      case 'phone':
        return `Valida telefones brasileiros com ou sem DDD e hífen. Aceita formatos como (11) 91234-5678 ou 11912345678.`;

      case 'cpf':
        return `Verifica se o texto segue o padrão de CPF brasileiro: 000.000.000-00 ou 00000000000.`;

      case 'date':
        return `Valida datas no formato brasileiro DD/MM/AAAA, como 25/12/2025.`;

      case 'cep':
        switch (category) {
          case 'brazil':
            return `Valida CEPs do Brasil no formato 12345-678 ou 12345678.`;
          case 'usa':
            return `Valida ZIP Codes dos EUA, como 12345 ou 12345-6789.`;
          case 'canada':
            return `Valida códigos postais canadenses no formato A1A 1A1, com ou sem espaço.`;
          case 'uk':
            return `Valida postcodes do Reino Unido como SW1A 0AA.`;
          case 'germany':
            return `Valida códigos postais da Alemanha com 5 dígitos.`;
        }
        break;

      case 'url':
        if (category === 'optional') {
          return `Valida URLs com ou sem protocolo (http:// ou https://), como www.site.com ou https://site.com.`;
        } else if (category === 'mandatory') {
          return `Valida URLs que **exigem** o protocolo (http:// ou https://), como https://site.com.`;
        }
        break;
    }

    return `Expressão regular personalizada. Confira a explicação técnica abaixo.`;
  }
}