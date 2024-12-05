import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutorModule } from './modules/produtor/produtor.module';

@Module({
  imports: [ProdutorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
