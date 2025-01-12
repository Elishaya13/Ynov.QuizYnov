import { Component, input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Question } from '../../business/models/question.model';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent {
  public questions = input.required<Question[]>();
  public form: FormGroup;
  public formSubmitted = false;

  // Score et pourcentage
  public percentageFormatted: string = '';
  public score: number = 0;
  public totalQuestions: number = 0;
  public percentage: number = 0;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      questions: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    console.log('Questions received:', this.questions());
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      questions: this.formBuilder.array(
        this.questions().map((question) => this.createQuestionGroup(question))
      ),
    });
  }

  /**
   * Crée un FormGroup pour une question donnée.
   * Cette méthode initialise un FormGroup pour chaque question, avec les champs nécessaires pour gérer les réponses des utilisateurs.
   *
   * @param {Question} question - L'objet question contenant les données nécessaires pour créer le groupe de formulaire.
   * @returns {FormGroup} - Retourne un FormGroup configuré avec l'identifiant de la question et un champ pour la réponse sélectionnée.
   */
  private createQuestionGroup(question: Question): FormGroup {
    return this.formBuilder.group({
      id: question.id,
      selectedAnswer: [null],
    });
  }

  /**
   * Récupère les FormGroup pour chaque question du formulaire.
   * Chaque FormGroup contient les contrôles pour l'ID de la question et la réponse sélectionnée.
   * @returns {FormGroup[]} Tableau de FormGroup, un pour chaque question.
   */
  get questionsForm(): FormGroup[] {
    const formArray = this.form.get('questions') as FormArray;
    return formArray.controls as FormGroup[];
  }

  private updateScoreAndPercentage(): void {
    this.score = 0;
    this.totalQuestions = this.questions().length;

    // Calcul du score
    this.questions().forEach((question, index) => {
      const correctAnswer = question.answers.find((answer) => answer.isCorrect);
      const userAnswer = this.form.value.questions[index].selectedAnswer;

      if (userAnswer === correctAnswer?.text) {
        this.score++;
      }
    });

    this.percentage = (this.score / this.totalQuestions) * 100;
    this.percentageFormatted = this.percentage.toFixed(2) + '%';
  }

  public onSubmitForm(): void {
    this.formSubmitted = true;
    this.updateScoreAndPercentage();
  }
}
