import { Injectable } from '@angular/core';
import { Quiz } from '../models/quiz.model';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QuizDto } from '../dtos/quiz.dto';
import { QuizMapper } from './quiz.mapper';

@Injectable({ providedIn: 'root' })
export class QuizService {
  constructor(
    private readonly mapper: QuizMapper,
    private readonly client: HttpClient
  ) {}

  // route pour recuperer la liste des quizz
  public list(): Observable<Quiz[]> {
    return this.client
      .get<QuizDto[]>('https://localhost:5000/api/quizzes')
      .pipe(map((dtos) => dtos.map((dto) => this.mapper.fromDto(dto))));
  }

  // route pour recuperer un quizz
  public get(id: string): Observable<Quiz> {
    return this.client
      .get<QuizDto>(`https://localhost:5000/api/quizzes/${id}`)
      .pipe(map((dto) => this.mapper.fromDto(dto)));
  }

  // route pour recuperer les qquestions d'un quizz
  public getQuestions(id: string): Observable<Quiz> {
    return this.client
      .get<QuizDto>(`https://localhost:5000/api/quizzes/${id}/questions`)
      .pipe(map((dto) => this.mapper.fromDto(dto)));
  }
}
