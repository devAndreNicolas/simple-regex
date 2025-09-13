import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
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
    MatRadioModule
  ],
  templateUrl: './regex-guide-modal.component.html',
  styleUrls: ['./regex-guide-modal.component.scss']
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

  readonly emailExample = "usuario@gmail.com"
  readonly emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$';

  readonly syntaxGuide = [
    { pattern: '\\d', description: 'Encontra qualquer dígito (0-9).', example: '123, 0, 9' },
    { pattern: '\\s', description: 'Encontra qualquer espaço em branco.', example: 'espaço, tab' },
    { pattern: '.', description: 'Encontra qualquer caractere, exceto quebras de linha.', example: 'a, 1, *' },
    { pattern: '^', description: 'Indica o início da linha.', example: 'Começa com...' },
    { pattern: '$', description: 'Indica o fim da linha.', example: 'Termina com...' },
    { pattern: '[ ]', description: 'Define um conjunto de caracteres. Ex: [abc] encontra "a", "b" ou "c".', example: 'a, b ou c' }
  ];

  readonly quantifierGuide = [
    { pattern: '+', description: 'Uma ou mais vezes.', example: 'abc+, encontra abcc, abccc' },
    { pattern: '*', description: 'Zero ou mais vezes.', example: 'abc*, encontra ab, abc, abcc' },
    { pattern: '?', description: 'Zero ou uma vez.', example: 'abc?, encontra ab ou abc' },
    { pattern: '{n}', description: 'Exatamente "n" vezes. Ex: \\d{3} encontra "123".', example: 'exato 3 dígitos' },
    { pattern: '{n,m}', description: 'De "n" a "m" vezes. Ex: \\d{2,4} encontra "12", "123" ou "1234".', example: 'entre 2 e 4 dígitos' }
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegexGuideModalComponent>
  ) {}

  ngOnInit(): void {
    this.introForm = this.fb.group({
      usedRegex: ['', Validators.required],
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