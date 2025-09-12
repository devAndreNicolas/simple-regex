import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegexExplainerService {

  private explanations: { [key: string]: string } = {
    '^': 'Início da linha.',
    '$': 'Fim da linha.',
    '\\d': 'Qualquer número (0-9).',
    '\\w': 'Qualquer letra, número ou sublinhado (_).',
    '\\s': 'Um espaço em branco (espaço, tab, quebra de linha).',
    '\\.': 'Um ponto literal.',
    '\\+': 'O sinal de mais literal.',
    '\\-': 'Um traço literal.',
    '\\@': 'O símbolo de arroba (@).',
    '.': 'Qualquer caractere (exceto nova linha).',
    '*': '0 ou mais vezes.',
    '+': '1 ou mais vezes.',
    '?': 'Opcional (0 ou 1 vez).',
    '|': 'OU (alternativa entre opções).',
    '()': 'Grupo de captura.',
    '(?:': 'Grupo sem captura (só agrupamento lógico).',
    '(?=': 'Lookahead positivo (verifica se algo vem depois).',
    '(?!': 'Lookahead negativo (verifica se algo **não** vem depois).',
    '(?P<': 'Grupo nomeado (usado em algumas engines).',
    '{n}': 'Repete exatamente **n** vezes.',
    '{n,}': 'Repete **n ou mais** vezes.',
    '{n,m}': 'Repete entre **n e m** vezes.',
    '_': 'Um sublinhado literal.',
    '@': 'O símbolo arroba (@).',
    '-': 'Um traço literal.'
  };

  /**
   * Quebra a regex em partes e retorna uma lista de objetos com padrões e explicações.
   */
  explain(regex: string): { pattern: string, explanation: string }[] {
    const tokens: { pattern: string; explanation: string; }[] = [];

    const regexPattern = /(\(\?:|\(\?=|\(\?!|\(\?<=|\(\?<!|\(\?P<[^>]+>|\\[dDwWsS])|(\^|\$)|\{[0-9,]*\}|\.|\?|\*|\+|\(|\)|\[[^\]]*\]|\\.|[a-zA-Z0-9@%+_'-]+|[\|]/g;

    let match;

    while ((match = regexPattern.exec(regex)) !== null) {
      const pattern = match[0];
      let explanation = this.explanations[pattern] || '';

      // Conjuntos de caracteres: [a-z], [^a-z], etc.
      if (!explanation && pattern.startsWith('[') && pattern.endsWith(']')) {
        const isNegated = pattern.startsWith('[^');
        const content = pattern.slice(isNegated ? 2 : 1, -1);
        const parts: string[] = [];

        if (content.includes('a-z')) parts.push('letras minúsculas (a–z)');
        if (content.includes('A-Z')) parts.push('letras maiúsculas (A–Z)');
        if (content.includes('0-9')) parts.push('números (0–9)');
        if (content.includes('_')) parts.push('sublinhado');
        if (content.includes('%')) parts.push('porcentagem');
        if (content.includes('+')) parts.push('mais');
        if (content.includes('-')) parts.push('traço');
        if (content.includes('.')) parts.push('ponto');

        explanation = isNegated
          ? `Qualquer caractere **exceto**: ${parts.join(', ')}.`
          : `Qualquer caractere entre: ${parts.join(', ')}.`;
      }

      // Quantificadores do tipo {n}, {n,}, {n,m}
      else if (!explanation && /^\{\d+(,\d*)?\}$/.test(pattern)) {
        const content = pattern.slice(1, -1);
        if (content.includes(',')) {
          const [min, max] = content.split(',');
          if (!max) explanation = `Repete **${min} ou mais vezes**.`;
          else explanation = `Repete **entre ${min} e ${max} vezes**.`;
        } else {
          explanation = `Repete **exatamente ${content} vezes**.`;
        }
      }

      // Escape genérico (ex: \., \-, \@)
      else if (!explanation && pattern.startsWith('\\')) {
        explanation = `Caractere **especial escapado**: ${pattern.slice(1)}`;
      }

      // Fallback genérico
      else if (!explanation) {
        explanation = `Este é o caractere **${pattern}**.`;
      }

      tokens.push({ pattern, explanation });
    }
    
    return tokens;
  }
}