import { Module } from '@nestjs/common';
import { ShortestUrlService } from './shortest-url.service';
import { ShortestUrlController } from './shortest-url.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShortestUrl, ShortestUrlSchema } from './entities/shortest-url.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ShortestUrlController],
  providers: [ShortestUrlService],
  imports: [
    MongooseModule.forFeature([
      {
        name: ShortestUrl.name,
        schema: ShortestUrlSchema,
      },
    ]),
    AuthModule,
  ],
  exports: [MongooseModule],
})
export class ShortestUrlModule {}
