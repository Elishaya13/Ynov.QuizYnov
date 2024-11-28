import { CategoryDto } from './category.dto';
import { QuestionDto } from './question.dto';

export interface QuizDto {
  id: string;
  name: string;
  description: string;
  difficulty: number;
  published: string;
  category: CategoryDto;
  questions: QuestionDto[];
}
