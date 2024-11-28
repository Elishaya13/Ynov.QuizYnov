import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Quiz } from '../../../../business/models/quiz.model';
import { Router, RouterLink } from '@angular/router';
import { QuizService } from '../../../../business/services/quiz.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  protected quizzes: Quiz[] | null = null;
  private subscription: Subscription | null = null;

  constructor(private readonly quizService: QuizService) {}

  public ngOnInit(): void {
    this.subscription = this.quizService
      .list()
      .subscribe((list) => (this.quizzes = list));
  }
  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
