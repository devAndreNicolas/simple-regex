import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
    MatRadioModule,
  ],
  templateUrl: './regex-guide-modal.component.html',
  styleUrls: ['./regex-guide-modal.component.scss'],
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

  readonly emailExample = 'usuario@gmail.com';
  readonly emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$';

  readonly syntaxGuide = [
    {
      pattern: '\\d',
      description: 'Qualquer dígito (de 0 a 9).',
      example: '<b>123</b>',
      expanded: false,
    },
    {
      pattern: '\\s',
      description: 'Qualquer espaço em branco.',
      example: 'Olá,<b> </b>Mundo',
      expanded: false,
    },
    {
      pattern: '.',
      description: 'Qualquer caractere (exceto quebras de linha).',
      example: 'a<b>.</b>b<b>.</b>c',
      expanded: false,
    },
    {
      pattern: '^',
      description: 'Início da linha.',
      example: '<b>^</b>[Olá] = "<b>Olá</b>, mundo"',
      expanded: false,
    },
    {
      pattern: '$',
      description: 'Fim da linha.',
      example: '[mundo]<b>$</b> = "Olá, <b>mundo</b>"',
      expanded: false,
    },
    {
      pattern: '[ ]',
      description: 'Um dos caracteres dentro dos colchetes.',
      example: '[abc] = "<b>a</b>" ou "<b>b</b>"',
      expanded: false,
    },
  ];

  readonly quantifierGuide = [
    {
      pattern: '+',
      description: 'Uma ou mais vezes.',
      example: 'abc<b>+</b> = "abccc"',
      expanded: false,
    },
    {
      pattern: '*',
      description: 'Zero ou mais vezes.',
      example: 'abc<b>*</b> = "ab" ou "abcc"',
      expanded: false,
    },
    {
      pattern: '?',
      description: 'Zero ou uma vez.',
      example: 'abc<b>?</b> = "ab" ou "abc"',
      expanded: false,
    },
    {
      pattern: '{n}',
      description: 'Exatamente n vezes.',
      example: '\\d<b>{3}</b> = "<b>123</b>"',
      expanded: false,
    },
    {
      pattern: '{n,m}',
      description: 'De n a m vezes.',
      example: '\\d<b>{2,4}</b> = "<b>1234</b>"',
      expanded: false,
    },
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
      understoodConcept: [false, Validators.requiredTrue],
    });

    this.lendoRegexForm = this.fb.group({
      understoodReading: [false, Validators.requiredTrue],
    });

    this.quantificadoresForm = this.fb.group({
      understoodQuantifiers: [false, Validators.requiredTrue],
    });

    this.geradorForm = this.fb.group({
      understoodGenerator: [false, Validators.requiredTrue],
    });

    this.testadorForm = this.fb.group({
      understoodTester: [false, Validators.requiredTrue],
    });

    this.praticaForm = this.fb.group({
      practiceAnswer: [
        '',
        [Validators.required, Validators.pattern(this.emailRegex)],
      ],
    });
  }

  toggleCard(clickedItem: any, guideArray: any[]): void {
    if (clickedItem.expanded) {
      clickedItem.expanded = false;
      return;
    }

    guideArray.forEach((item) => {
      item.expanded = false;
    });

    clickedItem.expanded = true;
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
