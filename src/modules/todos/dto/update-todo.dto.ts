import { IsNotEmpty } from 'class-validator';

export class UpdateTodoDto {
  @IsNotEmpty()
  readonly complete: boolean;

  @IsNotEmpty()
  readonly todo: string;
}
