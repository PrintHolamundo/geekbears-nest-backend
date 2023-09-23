import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ShortestUrl } from './entities/shortest-url.entity';
import { Model } from 'mongoose';

@Injectable()
export class ShortestUrlService {
  constructor(
    @InjectModel(ShortestUrl.name)
    private readonly shortestModel: Model<ShortestUrl>,
  ) {}
  async shorten(longUrl: string) {
    const urlParts = longUrl.split('/');
    const [protocol, , domain, ...pathParts] = urlParts;

    const middlePart = pathParts.map((part) => part[0]).join('');
    const randomPart = generateRandomString(8);

    function generateRandomString(length) {
      const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let randomString = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
      }
      return randomString;
    }

    const shortUrl = `${protocol}//${domain}/${middlePart}/${randomPart}`;

    const urlEntity = await this.shortestModel.create({
      originalUrl: longUrl,
      encodedUrl: shortUrl,
    });

    return urlEntity;
  }

  async getOriginalUrl(encodedUrl: string) {
    const urlEntity = await this.shortestModel.findOne({ encodedUrl });
    return urlEntity ? urlEntity.originalUrl : null;
  }
}
