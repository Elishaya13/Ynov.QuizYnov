import { Injectable } from '@angular/core';
import { QuizDto } from '../dtos/quiz.dto';
import { Quiz } from '../models/quiz.model';

@Injectable({ providedIn: 'root' })
export class QuizMapper {
  public fromDto(dto: QuizDto): Quiz {
    const { published, ...rest } = dto;

    return {
      ...rest,
      published: new Date(published),
    };
  }
  public toDto(data: Quiz): QuizDto {
    const { published, ...rest } = data;

    return {
      ...rest,
      published: published.toISOString(),
    };
  }
}
