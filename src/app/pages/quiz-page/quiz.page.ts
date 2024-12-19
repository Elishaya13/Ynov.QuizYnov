// import { Component, input, OnDestroy, OnInit } from '@angular/core';
// import { QuestionsComponent } from '../../components/questions/questions.component';
// import { Subscription } from 'rxjs';
// import { Quiz } from '../../business/models/quiz.model';
// import { QuizService } from '../../business/services/quiz.service';
// import { Question } from '../../business/models/question.model';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-quiz-page',
//   standalone: true,
//   imports: [CommonModule, QuestionsComponent],
//   templateUrl: './quiz.page.html',
//   styleUrl: './quiz.page.scss',
// })
// export class QuizPage implements OnInit, OnDestroy {
//   public readonly id = input.required<string>();

//   protected quiz: Quiz | null = null;
//   protected questions: Question[] = [];

//   private quizSubscription: Subscription | null = null;
//   private questionSubscription: Subscription | null = null;

//   constructor(private readonly quizService: QuizService) {}

//   public ngOnInit(): void {
//     // Charger le quiz
//     this.quizSubscription = this.quizService
//       .getQuizById(this.id())
//       .subscribe((quiz) => {
//         this.quiz = quiz;
//         console.log('Quiz chargé :', this.quiz); // Vérifie les données du quiz
//       });

//     // Charger les questions du quiz
//     this.questionSubscription = this.quizService
//       .getQuestionsByQuizId(this.id())
//       .subscribe((questions) => {
//         this.questions = questions;
//         console.log('Questions chargées dans quiz page:', this.questions); // Vérifie les données des questions
//       });
//   }

//   public ngOnDestroy(): void {
//     this.quizSubscription?.unsubscribe();
//     this.questionSubscription?.unsubscribe();
//   }
// }
import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { QuestionsComponent } from '../../components/questions/questions.component';
import { Subscription } from 'rxjs';
import { Quiz } from '../../business/models/quiz.model';
import { QuizService } from '../../business/services/quiz.service';
import { Question } from '../../business/models/question.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [CommonModule, QuestionsComponent],
  templateUrl: './quiz.page.html',
  styleUrl: './quiz.page.scss',
})
export class QuizPage implements OnInit, OnDestroy {
  public readonly id = input.required<string>();

  protected quiz: Quiz | null = null;
  protected questions: Question[] = [];

  private quizSubscription: Subscription | null = null;
  private questionSubscription: Subscription | null = null;

  constructor(
    private readonly quizService: QuizService,
    private readonly router: Router // Pour la navigation
  ) {}

  public ngOnInit(): void {
    // Charger le quiz
    this.quizSubscription = this.quizService
      .getQuizById(this.id())
      .subscribe((quiz) => {
        this.quiz = quiz;
        console.log('Quiz chargé :', this.quiz);
      });

    // Charger les questions du quiz
    this.questionSubscription = this.quizService
      .getQuestionsByQuizId(this.id())
      .subscribe((questions) => {
        this.questions = questions;
        console.log('Questions chargées dans quiz page:', this.questions);
      });
  }

  public validateQuiz(): void {
    // Logique pour valider le quiz (temporaire)
    console.log('Validation des réponses :', this.questions);
    alert('Quiz validé avec succès !');
  }

  public abandonQuiz(): void {
    // Confirmation avant d'abandonner
    const confirmAbandon = confirm(
      'Êtes-vous sûr de vouloir abandonner le quiz ?'
    );
    if (confirmAbandon) {
      this.router.navigate(['/quizzes']); // Retour à la liste des quiz
    }
  }

  public ngOnDestroy(): void {
    this.quizSubscription?.unsubscribe();
    this.questionSubscription?.unsubscribe();
  }
}