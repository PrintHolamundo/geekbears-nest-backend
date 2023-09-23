import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class users extends Document {
  @ApiProperty()
  @Prop()
  email: string;

  @ApiProperty()
  @Prop({ select: false })
  password: string;

  // @ApiProperty()
  // @Prop()
  // fullName: string;

  // @ApiProperty()
  // @Prop({
  //   type: [String],
  //   default: ['user'],
  // })
  // roles: string[];
}

export const UsuariosSchema = SchemaFactory.createForClass(users);
