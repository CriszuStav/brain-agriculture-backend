import { Module } from '@nestjs/common';
import { ProdutorService } from './produtor.service';
import { ProdutorController } from './produtor.controller';
import { PrismaModule } from 'src/shared/modules/prisma.module';
import { SharedModule } from 'src/shared/modules/shared.module';
import { ProdutorRepository } from './repository/produtor.repository';

@Module({
  imports: [PrismaModule, SharedModule],
  controllers: [ProdutorController],
  providers: [ProdutorService, ProdutorRepository]
})

export class ProdutorModule {}
