import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { LocationModule } from '../src/location.module';

describe('LocationController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [LocationModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/v1/locations (GET)', () => {
    it('fetches location when datetime format is correct', () => {
      return request(app.getHttpServer())
        .get('/v1/locations?datetime=2023-04-18T19:43:00')
        .then((result: any) => {
          expect(result.statusCode).toEqual(200);
          expect(result._body.length).toBeGreaterThan(1);
        });
    });

    it('returns 500 when datetime format is incorrect', () => {
      return request(app.getHttpServer())
        .get('/v1/locations?datetime=2')
        .then((result: any) => {
          expect(result.statusCode).toEqual(500);
        });
    });
  });
  

  afterAll(async () => {
    await app.close();
  });
});
