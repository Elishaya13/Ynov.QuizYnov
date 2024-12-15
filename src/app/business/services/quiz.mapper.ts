import { Injectable } from '@angular/core';
import { QuizDto } from '../dtos/quiz.dto';
import { Quiz } from '../models/quiz.model';
import { QuestionDto } from '../dtos/question.dto';
import { Question } from '../models/question.model';

@Injectable({ providedIn: 'root' })
export class QuizMapper {
  // Mapper un QuizDto en Quiz
  public fromDto(dto: QuizDto): Quiz {
    const { published, ...rest } = dto;

    return {
      ...rest,
      published: new Date(published),
    };
  }
  // Mapper un Quiz en QuizDto
  public toDto(data: Quiz): QuizDto {
    const { published, ...rest } = data;

    return {
      ...rest,
      published: published.toISOString(),
    };
  }
  // Mapper un QuestionDto en Question
  public fromQuestionDto(dto: QuestionDto): Question {
    return {
      id: dto.id,
      text: dto.text,
      answers: dto.answers.map((answer) => ({
        text: answer.text,
        isCorrect: answer.isCorrect,
      })),
    };
  }
  // Mapper une Question en QuestionDto
  public toQuestionDto(data: Question): QuestionDto {
    return {
      id: data.id,
      text: data.text,
      answers: data.answers.map((answer) => ({
        text: answer.text,
        isCorrect: answer.isCorrect,
      })),
    };
  }
}
