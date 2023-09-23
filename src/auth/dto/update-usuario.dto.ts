import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsObject()
  profile: {
    seccion_id: string;
  };
}
