import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-regex-guide-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './regex-guide-modal.component.html',
  styleUrl: './regex-guide-modal.component.scss'
})
export class RegexGuideModalComponent implements OnInit {
  // FormGroups para cada passo do guia
  introForm!: FormGroup;
  oQueEForm!: FormGroup;
  lendoRegexForm!: FormGroup;
  quantificadoresForm!: FormGroup;
  geradorForm!: FormGroup;
  testadorForm!: FormGroup;
  praticaForm!: FormGroup;

  // Variáveis para os exemplos de regex
  readonly emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$';

  // Dados para o guia de sintaxe
  readonly syntaxGuide = [
    { pattern: '\\d', description: 'Encontra qualquer dígito (0-9).' },
    { pattern: '\\s', description: 'Encontra qualquer espaço em branco.' },
    { pattern: '.', description: 'Encontra qualquer caractere, exceto quebras de linha.' },
    { pattern: '^', description: 'Início da linha.' },
    { pattern: '$', description: 'Fim da linha.' },
    { pattern: '[ ]', description: 'Define um conjunto de caracteres. Ex: [abc] encontra "a", "b" ou "c".' }
  ];

  // Dados para o guia de quantificadores
  readonly quantifierGuide = [
    { pattern: '+', description: 'Uma ou mais vezes.' },
    { pattern: '*', description: 'Zero ou mais vezes.' },
    { pattern: '?', description: 'Zero ou uma vez.' },
    { pattern: '{n}', description: 'Exatamente "n" vezes. Ex: \\d{3} encontra "123".' },
    { pattern: '{n,m}', description: 'De "n" a "m" vezes. Ex: \\d{2,4} encontra "12", "123" ou "1234".' }
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegexGuideModalComponent>
  ) {}

  ngOnInit(): void {
    this.introForm = this.fb.group({
      understandIntro: [false, Validators.requiredTrue]
    });

    this.oQueEForm = this.fb.group({
      understoodConcept: [false, Validators.requiredTrue]
    });

    this.lendoRegexForm = this.fb.group({
      understoodReading: [false, Validators.requiredTrue]
    });

    this.quantificadoresForm = this.fb.group({
      understoodQuantifiers: [false, Validators.requiredTrue]
    });

    this.geradorForm = this.fb.group({
      understoodGenerator: [false, Validators.requiredTrue]
    });

    this.testadorForm = this.fb.group({
      understoodTester: [false, Validators.requiredTrue]
    });

    this.praticaForm = this.fb.group({
      practiceAnswer: ['', [Validators.required, Validators.pattern(this.emailRegex)]]
    });
  }

  checkPractice(): boolean {
    const answer = this.praticaForm.get('practiceAnswer')?.value || '';
    const regex = new RegExp(this.emailRegex);
    return regex.test(answer);
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}