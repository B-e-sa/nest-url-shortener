import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('throws error on empty field signup', () => {

    let email, username, password;

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, username, password })
      .expect(400)
  })

  it('can sign up', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: "someemail@gmail.com",
        username: "josh",
        password: "password"
      })
      .expect(201)
  })

  it('can sign in', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .expect(200)
  })

});
