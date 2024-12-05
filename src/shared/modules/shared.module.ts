import { Module } from '@nestjs/common';
import { Validator } from '../services/validator.service';


@Module({
  providers: [Validator],
  exports: [Validator],
})
export class SharedModule {}
