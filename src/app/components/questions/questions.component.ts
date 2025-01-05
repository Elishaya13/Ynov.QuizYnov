import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Question } from '../../business/models/question.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent {
  @Input() public questions: Question[] = []; // Reçoit les questions depuis le parent

  public form: FormGroup; // Représente le formulaire principal

  constructor(private formBuilder: FormBuilder) {
    // Initialise le formulaire avec un tableau de groupes
    this.form = this.formBuilder.group({
      questions: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    console.log('questions recues :', this.questions);
    this.initializeForm();
  }

  // Initialise le FormArray avec les questions
  private initializeForm(): void {
    if (!this.questions || this.questions.length === 0) {
      console.error('No questions available to initialize the form.');
      return;
    }

    const questionGroups = this.questions.map((question) =>
      this.formBuilder.group({
        id: [question.id], // Identifiant de la question
        selectedAnswer: [null], // Réponse sélectionnée
      })
    );

    this.form.setControl('questions', this.formBuilder.array(questionGroups));
  }
  public onSubmitForm(): void {
    console.log('form réponses :', this.form.value);
  }
}