import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { QuestionsComponent } from '../../components/questions/questions.component';
import { Subscription } from 'rxjs';
import { Quiz } from '../../business/models/quiz.model';
import { QuizService } from '../../business/services/quiz.service';
import { Question } from '../../business/models/question.model';
import { CommonModule } from '@angular/common';

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

  constructor(private readonly quizService: QuizService) {}

  public ngOnInit(): void {
    // Charger le quiz
    this.quizSubscription = this.quizService
      .get(this.id())
      .subscribe((quiz) => {
        this.quiz = quiz;
        console.log('Quiz chargé :', this.quiz); // Vérifie les données du quiz
      });

    // Charger les questions du quiz
    this.questionSubscription = this.quizService
      .getQuestionsByQuizId(this.id())
      .subscribe((questions) => {
        this.questions = questions;
        console.log('Questions chargées dans quiz page:', this.questions); // Vérifie les données des questions
      });
  }

  public ngOnDestroy(): void {
    this.quizSubscription?.unsubscribe();
    this.questionSubscription?.unsubscribe();
  }
}
