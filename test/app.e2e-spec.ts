import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const dummyRegister = {
    email: 'someemail@gmail.com',
    username: "josh",
    password: "password"
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    await app.init();
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
      .send(dummyRegister)
      .expect(201)
  })

  it('throws error on duplicated user register', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(dummyRegister)
      .expect(401)
  })

  it('can sign in', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .expect(200)
  })

});
