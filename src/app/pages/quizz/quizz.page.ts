import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { QuestionsComponent } from '../../components/questions/questions.component';
import { Subscription } from 'rxjs';
import { Quiz } from '../../business/models/quiz.model';
import { QuizService } from '../../business/services/quiz.service';

@Component({
  selector: 'app-quizz-page',
  standalone: true,
  imports: [QuestionsComponent],
  templateUrl: './quizz.page.html',
  styleUrl: './quizz.page.scss',
})
export class QuizzPage implements OnInit, OnDestroy {
  public readonly id = input.required<string>();

  protected quiz: Quiz | null = null;

  private subscription: Subscription | null = null;

  constructor(private readonly quizService: QuizService) {}

  public ngOnInit(): void {
    this.subscription = this.quizService
      .get(this.id())
      .subscribe((quiz) => (this.quiz = quiz));
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
