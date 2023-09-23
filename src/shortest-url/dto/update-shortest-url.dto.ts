import { PartialType } from '@nestjs/swagger';
import { CreateShortestUrlDto } from './create-shortest-url.dto';

export class UpdateShortestUrlDto extends PartialType(CreateShortestUrlDto) {}
