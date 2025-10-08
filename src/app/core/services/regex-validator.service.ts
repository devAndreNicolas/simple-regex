import { Injectable } from '@angular/core';

declare const $localize: any;

@Injectable({
  providedIn: 'root'
})
export class RegexValidatorService {


  validateText(regex: string, text: string): { isValid: boolean, matches: number } {
    try {
      const reTest = new RegExp(regex);
      const isValid = reTest.test(text);

      const reMatch = new RegExp(regex, 'g');
      const allMatches = text.match(reMatch);
      const matches = allMatches ? allMatches.length : 0;

      return { isValid, matches };
    } catch (e) {
      throw new Error($localize`:@@errorInvalidRegex:Sua expressão regular é inválida.`);
    }
  }
}