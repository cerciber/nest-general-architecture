import { Module } from '@nestjs/common';
import { Controller1Controller } from './controllers/controller1/controller1.controller';
import { Controller2Controller } from './controllers/controller2/controller2.controller';
import { Service1Service } from './services/service1/service1.service';

@Module({
  controllers: [Controller1Controller, Controller2Controller],
  providers: [Service1Service],
})
export class Module1Module {}
