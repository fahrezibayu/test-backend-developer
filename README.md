<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm start

# watch mode
$ npm start:dev

# production mode
$ npm start:prod
```

## Test

```bash
# unit tests
$ npm test

# e2e tests
$ npm test:e2e

# test coverage
$ npm test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## EndPoint
```bash
Register
- http://localhost:3000/api/register
  body type json
  type POST
  {
    "username" : "string",
    "password" : "string",
    "email" : "string"
  }

Login
- http://localhost:3000/api/login
  body type json
  type POST
  {
    "usernameOrEmail" : "username or email",
    "password" : "string"
  }

Logout
- http://localhost:3000/api/logout
  with header auth
  type POST

Read User
- http://localhost:3000/api/getProfile
  header with auth
  type GET
  
Read Detail User
- http://localhost:3000/api/getDetailProfile/:id
  header with auth
  type GET

Create User
- http://localhost:3000/api/createProfile
  header with auth
  body type multipart form
  type POST
  {
    "username" : "string",
    "password" : "string",
    "email" : "string",
    "name" : "string",
    "birthday" : "string",
    "gender" : "string",
    "horoscope" : "string",
    "zodiac" : "string",
    "height" : number,
    "weight" : number,
    "interests" : [],
    "file" : file
  }

Update User
- http://localhost:3000/api/updateProfile/:id
  header with auth
  body type multipart form
  type PUT
  {
    "username" : "string",
    "password" : "string",
    "email" : "string",
    "name" : "string",
    "birthday" : "string",
    "gender" : "string",
    "horoscope" : "string",
    "zodiac" : "string",
    "height" : number,
    "weight" : number,
    "interests" : [],
    "file" : file
  }

Delete User
- http://localhost:3000/api/getDetailProfile/:id
  header with auth
  type DELETE

Send Message With Rabbit
- http://localhost:3000/api/send-message
  header with auth
  body type json
  type POST
  {
    "queue" : "string",
    "message" : "string"
  }

With Message With Rabbit
- http://localhost:3000/api/send-message
  header with auth
  body type json
  type POST
  {
    "queue" : "string"
  }
```
