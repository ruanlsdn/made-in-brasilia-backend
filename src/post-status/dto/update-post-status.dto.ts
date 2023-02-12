import { PartialType } from '@nestjs/swagger';
import { CreatePostStatusDto } from './create-post-status.dto';

export class UpdatePostStatusDto extends PartialType(CreatePostStatusDto) {}
