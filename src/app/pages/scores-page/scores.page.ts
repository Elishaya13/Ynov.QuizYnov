import { Component } from '@angular/core';

@Component({
  selector: 'app-scores-page',
  standalone: true,
  imports: [],
  templateUrl: './scores.page.html',
  styleUrl: './scores.page.scss',
})
export class ScoresPage {
  quizAttempts: any[] = [
    {
      quizId: 1,
      quizName: 'CSS pour débutant',
      attemptsCount: 5,
      lastScore: 80,
    },
    { quizId: 2, quizName: 'Défi JavaScript', attemptsCount: 3, lastScore: 90 },
    {
      quizId: 3,
      quizName: 'CSS Intermediaire',
      attemptsCount: 4,
      lastScore: 75,
    },
    {
      quizId: 4,
      quizName: 'Horizons du Développement',
      attemptsCount: 2,
      lastScore: 85,
    },
  ];
}
