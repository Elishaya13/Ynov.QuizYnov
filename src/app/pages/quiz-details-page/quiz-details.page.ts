import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Quiz } from '../../business/models/quiz.model';
import { RouterLink } from '@angular/router';
import { QuizService } from '../../business/services/quiz.service';
import { CategoryTagComponent } from '../../shared/category-tag/category-tag.component';

@Component({
  selector: 'app-quiz-details-page',
  standalone: true,
  imports: [RouterLink, CategoryTagComponent],
  templateUrl: './quiz-details.page.html',
  styleUrl: './quiz-details.page.scss',
})
export class QuizDetailsPage implements OnInit, OnDestroy {
  public readonly id = input.required<string>();

  protected quiz: Quiz | null = null;

  private subscription: Subscription | null = null;

  constructor(private readonly quizService: QuizService) {}

  public ngOnInit(): void {
    this.subscription = this.quizService
      .getQuizById(this.id())
      .subscribe((quiz) => (this.quiz = quiz));
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
