import { Controller, Post, Body } from '@nestjs/common';
import { ShortestUrlService } from './shortest-url.service';
import { Auth } from 'src/auth/decorators';

@Auth()
@Controller('encode')
export class ShortestUrlController {
  constructor(private readonly shortestUrlService: ShortestUrlService) {}

  @Post()
  async shortenUrl(@Body() body: { longUrl: string }) {
    const shortUrl = await this.shortestUrlService.shorten(body.longUrl);
    return shortUrl;
  }

  @Post('/decode')
  async redirectToOriginal(@Body() body: { shortUrl: string }) {
    const originalUrl = await this.shortestUrlService.getOriginalUrl(body.shortUrl);
    return { url: originalUrl };
  }
}
