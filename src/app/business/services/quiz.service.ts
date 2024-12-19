import { Injectable } from '@angular/core';
import { Quiz } from '../models/quiz.model';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QuizDto } from '../dtos/quiz.dto';
import { QuizMapper } from './quiz.mapper';
import { Question } from '../models/question.model';
import { QuestionDto } from '../dtos/question.dto';

@Injectable({ providedIn: 'root' })
export class QuizService {
  constructor(
    private readonly mapper: QuizMapper,
    private readonly client: HttpClient
  ) {}

  // route pour recuperer la liste des quiz
  public getQuizList(): Observable<Quiz[]> {
    return this.client
      .get<QuizDto[]>('https://localhost:5000/api/quizzes')
      .pipe(map((dtos) => dtos.map((dto) => this.mapper.fromDto(dto))));
  }

  // route pour recuperer un quiz par son id
  public getQuizById(id: string): Observable<Quiz> {
    return this.client
      .get<QuizDto>(`https://localhost:5000/api/quizzes/${id}`)
      .pipe(map((dto) => this.mapper.fromDto(dto)));
  }

  // route pour recuperer les questions d'un quiz par l'id du quiz
  public getQuestionsByQuizId(id: string): Observable<Question[]> {
    return this.client
      .get<QuestionDto[]>(`https://localhost:5000/api/quizzes/${id}/questions`)
      .pipe(map((dtos) => dtos.map((dto) => this.mapper.fromQuestionDto(dto))));
  }
}
