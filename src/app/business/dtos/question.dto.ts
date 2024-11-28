import { AnswerDto } from './answer.dto';

export interface QuestionDto {
  id: string;
  text: string;
  answers: AnswerDto[];
}
