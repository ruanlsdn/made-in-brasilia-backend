import { PartialType } from '@nestjs/swagger';
import { CreateOpenaiDto } from './create-openai.dto';

export class UpdateOpenaiDto extends PartialType(CreateOpenaiDto) {}
