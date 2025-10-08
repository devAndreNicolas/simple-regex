import { Injectable, Inject, LOCALE_ID } from '@angular/core';

declare const $localize: any; 

@Injectable({
  providedIn: 'root'
})
export class RegexExplainerService {

  private explanations: { [key: string]: string } = {
    '^': $localize`:@@explainStart:Início da linha.`,
    '$': $localize`:@@explainEnd:Fim da linha.`,
    '\\d': $localize`:@@explainDigit:Qualquer número (0-9).`,
    '\\w': $localize`:@@explainWord:Qualquer letra, número ou sublinhado (_).`,
    '\\s': $localize`:@@explainWhitespace:Um espaço em branco (espaço, tab, quebra de linha).`,
    '\\.': $localize`:@@explainDotLiteral:Um ponto literal.`,
    '\\+': $localize`:@@explainPlusLiteral:O sinal de mais literal.`,
    '\\-': $localize`:@@explainHyphenLiteral:Um traço literal.`,
    '\\@': $localize`:@@explainAtLiteral:O símbolo de arroba (@).`,
    '.': $localize`:@@explainAnyChar:Qualquer caractere (exceto nova linha).`,
    '*': $localize`:@@explainZeroPlus:0 ou mais vezes.`,
    '+': $localize`:@@explainOnePlus:1 ou mais vezes.`,
    '?': $localize`:@@explainOptional:Opcional (0 ou 1 vez).`,
    '|': $localize`:@@explainOR:OU (alternativa entre opções).`,
    '()': $localize`:@@explainCaptureGroup:Grupo de captura.`,
    '(?:': $localize`:@@explainNonCaptureGroup:Grupo sem captura (só agrupamento lógico).`,
    '(?=': $localize`:@@explainLookaheadPos:Lookahead positivo (verifica se algo vem depois).`,
    '(?!': $localize`:@@explainLookaheadNeg:Lookahead negativo (verifica se algo não vem depois).`,
    '(?P<': $localize`:@@explainNamedGroup:Grupo nomeado (usado em algumas engines).`,
    '{n}': $localize`:@@explainRepeatN:Repete exatamente n vezes.`,
    '{n,}': $localize`:@@explainRepeatNPlus:Repete n ou mais vezes.`,
    '{n,m}': $localize`:@@explainRepeatNM:Repete entre n e m vezes.`,
    '_': $localize`:@@explainUnderscore:Um sublinhado literal.`,
    '@': $localize`:@@explainAtSymbol:O símbolo arroba (@).`,
    '-': $localize`:@@explainDash:Um traço literal.`
  };

  constructor(@Inject(LOCALE_ID) private localeId: string) { }

  explain(regex: string): { pattern: string, explanation: string }[] {
    const tokens: { pattern: string; explanation: string; }[] = [];

    const regexPattern = /(\(\?:|\(\?=|\(\?!|\(\?<=|\(\?<!|\(\?P<[^>]+>|\\[dDwWsS])|(\^|\$)|\{[0-9,]*\}|\.|\?|\*|\+|\(|\)|\[[^\]]*\]|\\.|[a-zA-Z0-9@%+_'-]+|[\|]/g;

    let match;

    while ((match = regexPattern.exec(regex)) !== null) {
      const pattern = match[0];
      let explanation = this.explanations[pattern] || '';

      if (!explanation && pattern.startsWith('[') && pattern.endsWith(']')) {
        const isNegated = pattern.startsWith('[^');
        const content = pattern.slice(isNegated ? 2 : 1, -1);
        
        const parts: string[] = [];

        if (content.includes('a-z')) parts.push($localize`:@@partLower:letras minúsculas (a–z)`);
        if (content.includes('A-Z')) parts.push($localize`:@@partUpper:letras maiúsculas (A–Z)`);
        if (content.includes('0-9')) parts.push($localize`:@@partNumbers:números (0–9)`);
        if (content.includes('_')) parts.push($localize`:@@partUnderscore:sublinhado`);
        if (content.includes('%')) parts.push($localize`:@@partPercent:porcentagem`);
        if (content.includes('+')) parts.push($localize`:@@partPlus:mais`);
        if (content.includes('-')) parts.push($localize`:@@partDash:traço`);
        if (content.includes('.')) parts.push($localize`:@@partDot:ponto`);

        explanation = isNegated
          ? $localize`:@@explainSetNegated:Qualquer caractere exceto: ${parts.join(', ')}.`
          : $localize`:@@explainSetPositive:Qualquer caractere entre: ${parts.join(', ')}.`;
      }

      else if (!explanation && /^\{\d+(,\d*)?\}$/.test(pattern)) {
        const content = pattern.slice(1, -1);
        if (content.includes(',')) {
          const [min, max] = content.split(',');
          if (!max) explanation = $localize`:@@explainRepeatNOrMore:Repete ${min} ou mais vezes.`;
          else explanation = $localize`:@@explainRepeatNToM:Repete entre ${min} e ${max} vezes.`;
        } else {
          explanation = $localize`:@@explainRepeatExactlyN:Repete exatamente ${content} vezes.`;
        }
      }

      else if (!explanation && pattern.startsWith('\\')) {
        explanation = $localize`:@@explainEscapedChar:Caractere especial escapado: ${pattern.slice(1)}`;
      }

      else if (!explanation) {
        explanation = $localize`:@@explainFallback:Este é o caractere ${pattern}.`;
      }

      tokens.push({ pattern, explanation });
    }
    
    return tokens;
  }
}