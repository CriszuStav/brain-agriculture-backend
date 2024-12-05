import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { ProdutorService } from './produtor.service';
import { CreateProdutorDto } from './dto/create-produtor.dto';
import { UpdateProdutorDto } from './dto/update-produtor.dto';

@Controller('produtor')
export class ProdutorController {
  constructor(private readonly produtorService: ProdutorService) {}

  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createProdutorDto: CreateProdutorDto,
  ) {
    return this.produtorService.create(createProdutorDto);
  }

  @Get('dashboard')
  getTotals() {
    return this.produtorService.getTotals();
  }

  @Get()
  findAll() {
    return this.produtorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtorService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProdutorDto: UpdateProdutorDto,
  ) {
    return this.produtorService.update(id, updateProdutorDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.produtorService.remove(id);
  }
}
