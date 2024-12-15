import { Routes } from '@angular/router';
import { QuizDetailsPage } from './pages/quiz-details/quiz-details.page';
import { HomePage } from './pages/home/home.page';
import { DashboardComponent } from './pages/home/components/dashboard/dashboard.component';
import { NotfoundPage } from './pages/notfound/notfound.page';
import { QuizPage } from './pages/quiz/quiz.page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'quizzes', component: DashboardComponent },
  { path: 'quizzes/:id', component: QuizDetailsPage },
  { path: 'quizzes/:id/questions', component: QuizPage },
  { path: '**', component: NotfoundPage },
];
