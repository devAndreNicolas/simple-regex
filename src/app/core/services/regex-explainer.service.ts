import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegexExplainerService {

  private explanations: { [key: string]: string } = {
    // Delimitadores de Posição
    '^': 'O padrão precisa começar aqui.',
    '$': 'O padrão precisa terminar aqui.',
    
    // Conjuntos de Caracteres Pré-definidos
    '\\d': 'Qualquer **número** (de 0 a 9).',
    '\\w': 'Qualquer **letra, número ou _**.',
    '.': 'Qualquer **caractere** (exceto uma nova linha).',
    
    // Quantificadores
    '+': 'Repete **1 ou mais vezes**.',
    '*': 'Repete **0 ou mais vezes**.',
    '?': 'É **opcional**.',
    
    // Agrupamento e Alternância
    '()': 'Grupo de caracteres.',
    '|': 'Escolha entre estas opções.',

    // Caracteres Literais (escritura)
    '@': 'O símbolo **@**.',
    '\\.': 'Um **ponto** literal.',
    '-': 'Um **traço** literal.',
    '_': 'Um **sublinhado** literal.'
  };

  /**
   * Quebra a regex em partes e retorna uma lista de objetos com padrões e explicações.
   */
  explain(regex: string): { pattern: string, explanation: string }[] {
    const tokens: { pattern: string; explanation: string; }[] = [];
    
    // Regex aprimorada para capturar blocos completos
    const regexPattern = /(\\[dDwWsS])|(\^+|\$+)|\.|\?|\*|\+|\(|\)|\[[^\]]*\]|\||\{|\}|([a-zA-Z0-9.@%+-]+)/g;
    let match;
    
    while ((match = regexPattern.exec(regex)) !== null) {
      const pattern = match[0];
      let explanation = this.explanations[pattern] || '';

      // Se a explicação não for encontrada no dicionário
      if (!explanation) {
        if (pattern.startsWith('[') && pattern.endsWith(']')) {
          // Explica conjuntos de caracteres de forma clara
          const content = pattern.substring(1, pattern.length - 1);
          let parts = [];
          if (content.includes('a-zA-Z')) parts.push('letras (a-z, A-Z)');
          if (content.includes('0-9')) parts.push('números (0-9)');
          if (content.includes('._%+-')) parts.push('símbolos (. _ % + -)');
          if (content.includes('.')) parts.push('o ponto');
          if (content.includes('-')) parts.push('o traço');

          explanation = `Corresponde a qualquer um destes: ${parts.join(', ')}.`;
        } else if (pattern.startsWith('{') && pattern.endsWith('}')) {
          const numbers = pattern.substring(1, pattern.length - 1);
          explanation = `Repete **${numbers} vezes**`;
        } else if (pattern.includes('|')) {
          explanation = 'OU lógico: pode ser um desses.';
        } else {
          // Explicação padrão para caracteres comuns
          explanation = `Este é o caractere **${pattern}**`;
        }
      }

      tokens.push({ pattern, explanation });
    }
    
    return tokens;
  }
}