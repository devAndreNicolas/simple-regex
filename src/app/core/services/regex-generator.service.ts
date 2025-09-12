import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegexGeneratorService {
  
  private regexGenerators: Map<string, Map<string, () => string>>;

  constructor() {
    // Inicializa o mapa com todos os tipos de regex, agora com categorias
    this.regexGenerators = new Map<string, Map<string, () => string>>([
      ['email', new Map<string, () => string>([['default', this.generateEmail]])],
      ['phone', new Map<string, () => string>([['default', this.generatePhone]])],
      ['cpf', new Map<string, () => string>([['default', this.generateCpf]])],
      ['cep', new Map<string, () => string>([
        ['brazil', this.generateCepBrazil],
        ['usa', this.generateZipCodeUsa],
        ['canada', this.generatePostalCodeCanada],
        ['uk', this.generatePostalCodeUk],
        ['germany', this.generatePlzGermany]
      ])],
      ['date', new Map<string, () => string>([['default', this.generateDate]])],
      ['url', new Map<string, () => string>([
        ['optional', this.generateUrlOptional],
        ['mandatory', this.generateUrlMandatory]
      ])],
    ]);
  }

  /**
   * Método genérico para obter a regex baseada no tipo e categoria.
   */
  getRegex(type: string, category?: string): string {
    const typeMap = this.regexGenerators.get(type);
    if (typeMap) {
      // Se não houver categoria, assume 'default'
      const categoryToUse = category || 'default';
      const generatorFn = typeMap.get(categoryToUse);
      if (generatorFn) {
        return generatorFn();
      }
    }
    return ''; // Retorna string vazia se o tipo ou categoria não for encontrado
  }

  // --- Regexes de Categoria Única ---
  private generateEmail(): string {
    return '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
  }

  private generatePhone(): string {
    return '^\\(?(?:[14689][1-9]|2[12478]|3[1234578]|51|6[1-9])\\)?\\s?(?:9\\d{4}|[2-8]\\d{3})\\-?\\d{4}$';
  }

  private generateCpf(): string {
    return '^\\d{3}\\.?\\d{3}\\.?\\d{3}\\-?\\d{2}$';
  }
  
  private generateDate(): string {
    return '^\\d{2}\\/\\d{2}\\/\\d{4}$';
  }

  // --- Regexes com Categorias ---

  /**
   * Gera uma regex para validar o formato de um CEP do Brasil.
   * Ex: 12345-678 ou 12345678
   */
  private generateCepBrazil(): string {
    return '^\\d{5}-?\\d{3}$';
  }

  /**
   * Gera uma regex para validar um ZIP Code dos EUA.
   * Ex: 12345 ou 12345-6789
   */
  private generateZipCodeUsa(): string {
    return '^\\d{5}(?:[-\\s]\\d{4})?$';
  }

  /**
   * Gera uma regex para validar um Postal Code do Canadá.
   * Ex: A1A 1A1
   */
  private generatePostalCodeCanada(): string {
    return '^[A-Za-z]\\d[A-Za-z][ -]?\\d[A-Za-z]\\d$';
  }

  /**
   * Gera uma regex para validar um Postcode do Reino Unido.
   * Ex: SW1A 0AA
   */
  private generatePostalCodeUk(): string {
    return '^([A-Z]{1,2}\\d[A-Z\\d]?\\s?\\d[A-Z]{2})$';
  }
  
  /**
   * Gera uma regex para validar um PLZ da Alemanha.
   * Ex: 12345
   */
  private generatePlzGermany(): string {
    return '^\\d{5}$';
  }


  /**
   * Gera uma regex para validar uma URL, onde o protocolo é opcional.
   */
  private generateUrlOptional(): string {
    return '^(https?:\\/\\/)?(www\\.)?([a-zA-Z0-9-]+\\.)+([a-zA-Z]{2,}|[a-zA-Z]{2,}\\.[a-zA-Z]{2,})$';
  }

  /**
   * Gera uma regex para validar uma URL, onde o protocolo é obrigatório.
   */
  private generateUrlMandatory(): string {
    return '^(https?:\\/\\/)(www\\.)?([a-zA-Z0-9-]+\\.)+([a-zA-Z]{2,}|[a-zA-Z]{2,}\\.[a-zA-Z]{2,})$';
  }
}
