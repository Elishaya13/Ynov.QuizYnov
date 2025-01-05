import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Quiz } from '../../business/models/quiz.model';
import { RouterLink } from '@angular/router';
import { QuizService } from '../../business/services/quiz.service';
import { CategoryTagComponent } from '../../shared/category-tag/category-tag.component';

@Component({
  selector: 'app-quiz-list-page',
  standalone: true,
  imports: [RouterLink, CategoryTagComponent],
  templateUrl: './quiz-list.page.html',
  styleUrl: './quiz-list.page.scss',
})
export class QuizListPage implements OnInit, OnDestroy {
  protected quizzes: Quiz[] | null = null;
  private subscription: Subscription | null = null;

  constructor(private readonly quizService: QuizService) {}

  public ngOnInit(): void {
    this.subscription = this.quizService
      .getQuizList()
      .subscribe((list) => (this.quizzes = list));
  }
  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
