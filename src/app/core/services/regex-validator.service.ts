import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegexValidatorService {

  validateText(regex: string, text: string): { isValid: boolean, matches: number } {
    try {
      // Para a validacao completa
      const reTest = new RegExp(regex);
      const isValid = reTest.test(text);

      // Para contar todas as ocorrencias
      const reMatch = new RegExp(regex, 'g');
      const allMatches = text.match(reMatch);
      const matches = allMatches ? allMatches.length : 0;

      return { isValid, matches };
    } catch (e) {
      // Lança o erro para que o componente principal possa capturá-lo
      throw new Error("Sua expressão regular é inválida.");
    }
  }
}