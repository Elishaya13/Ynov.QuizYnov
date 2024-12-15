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

  constructor(private fb: FormBuilder) {
    // Initialise le formulaire avec un tableau de groupes
    this.form = this.fb.group({
      questions: this.fb.array([]),
    });
  }

  public serializedQuestions: any[] = [];

  ngOnInit(): void {
    console.log('questions recues :', this.questions);
    this.initializeForm();
    this.serializedQuestions = this.questionControls.map(
      (control) => control.value
    );
    // console.log('questionControls :', this.questionControls);
    console.log('Serialized questions:', this.serializedQuestions);
  }

  // Expose les FormGroups dans le FormArray
  get questionControls() {
    return (this.form.get('questions') as FormArray).controls as FormGroup[];
    // const controls = (this.form.get('questions') as FormArray).controls;
    // console.log('controls :', controls);
    // return controls;
  }

  // Initialise le FormArray avec les questions
  private initializeForm(): void {
    if (!this.questions || this.questions.length === 0) {
      console.error('No questions available to initialize the form.');
      return;
    }

    const questionGroups = this.questions.map((question) =>
      this.fb.group({
        id: [question.id], // Identifiant de la question
        selectedAnswer: [null], // Réponse sélectionnée
      })
    );

    this.form.setControl('questions', this.fb.array(questionGroups));
  }
  public onSubmit(): void {
    console.log('form :', this.form.value);
  }
  //   // Soumission du formulaire
  //   public onSubmit(): void {
  //     const userResponses = this.form.value.questions;

  //     // Vérifie les réponses et calcule les résultats
  //     const results = this.questions.map((question, index) => {
  //       const selectedAnswer = userResponses[index].selectedAnswer;
  //       const correctAnswer = question.answers.find(
  //         (a: any) => a.isCorrect
  //       )?.text;

  //       return {
  //         question: question.text,
  //         selectedAnswer,
  //         isCorrect: selectedAnswer === correctAnswer,
  //       };
  //     });

  //     console.log('Résultats du quiz :', results);
  //   }
}
// import { Component, input, Input, OnChanges, OnInit } from '@angular/core';
// import { Question } from '../../business/models/question.model';
// import {
//   FormArray,
//   FormBuilder,
//   FormGroup,
//   ReactiveFormsModule,
// } from '@angular/forms';

// @Component({
//   selector: 'app-questions',
//   standalone: true,
//   imports: [ReactiveFormsModule],
//   templateUrl: './questions.component.html',
//   styleUrl: './questions.component.scss',
// })
// export class QuestionsComponent implements OnInit {
//   // input pour recevoir les questions depuis le parent QuizPage
//   // public readonly questions = input.required<Question[]>();
//   @Input() public questions: Question[] = []; // Liste des questions reçues du parent

//   public form: FormGroup; // Représente le formulaire principal

//   constructor(private formBuilder: FormBuilder) {
//     // Initialisation du formulaire
//     this.form = this.formBuilder.group({
//       questions: this.formBuilder.array([]), // Un tableau de groupes (un pour chaque question)
//     });
//   }

//   ngOnInit(): void {
//     this.initializeForm(); // Réinitialise le formulaire lorsque les questions changent
//   }

//   // Méthode pour exposer les contrôles du FormArray
//   get questionControls() {
//     return (this.form.get('questions') as FormArray).controls;
//   }

//   private initializeForm(): void {
//     const questionGroups = this.questions.map((question) =>
//       this.formBuilder.group({
//         id: question.id, // Identifiant de la question
//         // text: question.text,
//         selectedAnswer: null, // Réponse sélectionnée
//       })
//     );

//     //Met à jour le formulaire avec les controles des questions
//     this.form.setControl('questions', this.formBuilder.array(questionGroups));
//   }

//   public onSubmit(): void {
//     const userResponses = this.form.value.questions;

//     //Vérification des réponses
//     const results = this.questions.map((question, index) => {
//       const selectedAnswer = userResponses[index].selectedAnswer;
//       const correctAnswer = question.answers.find((answer) => answer.isCorrect);

//       return {
//         question: question.text,
//         selectedAnswer,
//         isCorrect: selectedAnswer === correctAnswer,
//       };
//     });
//     console.log('Résultats :', results);
//   }
// }
