import { Component, input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Question } from '../../business/models/question.model';

@Component({
  selector: 'app-questions-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './questions-form.component.html',
  styleUrl: './questions-form.component.scss',
})
export class QuestionsFormComponent implements OnInit {
  public questions = input.required<Question[]>();
  form!: FormGroup;
  questionsFormPreview$!: Observable<Question[]>;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    console.log('questions recues dans le composant :', this.questions);
    this.initializeForm();
    this.form = this.formBuilder.group({
      questions: this.formBuilder.array(
        this.questions().map((question) =>
          this.formBuilder.group({
            id: question.id,
            selectedAnswer: '',
          })
        )
      ),
    });
  }

  get questionsForm() {
    return this.form.get('questions') as FormArray;
  }

  // Initialise le FormArray avec les questions
  private initializeForm(): void {
    if (!this.questions() || this.questions().length === 0) {
      console.error('No questions available to initialize the form.');
      return;
    }

    const questionGroups = this.questions().map((question: { id: any }) =>
      this.formBuilder.group({
        id: [question.id], // Identifiant de la question
        selectedAnswer: [null], // Réponse sélectionnée
      })
    );

    this.form.setControl('questions', this.formBuilder.array(questionGroups));
  }

  public onSubmitForm(): void {
    console.log('form :', this.questionsForm.value);
  }
}
