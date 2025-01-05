import { Routes } from '@angular/router';
import { QuizDetailsPage } from './pages/quiz-details-page/quiz-details.page';
import { HomePage } from './pages/home-page/home.page';
import { QuizListPage } from './pages/quiz-list-page/quiz-list.page';
import { NotfoundPage } from './pages/notfound-page/notfound.page';
import { QuizPage } from './pages/quiz-page/quiz.page';
import { ScoresPage } from './pages/scores-page/scores.page';
import { ProfilePage } from './pages/profile-page/profile.page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'profile', component: ProfilePage },
  { path: 'quizzes', component: QuizListPage },
  { path: 'quizzes/:id', component: QuizDetailsPage },
  { path: 'quizzes/:id/questions', component: QuizPage },
  { path: 'scores', component: ScoresPage },
  { path: '**', component: NotfoundPage },
];
