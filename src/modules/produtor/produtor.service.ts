import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProdutorDto } from './dto/create-produtor.dto';
import { UpdateProdutorDto } from './dto/update-produtor.dto';
import { ProdutorRepository } from './repository/produtor.repository';
import { Validator } from 'src/shared/services/validator.service';

@Injectable()
export class ProdutorService {
  constructor(
    private readonly produtorRepository: ProdutorRepository,
    private readonly validator: Validator,
  ) {}

  create(createProdutorDto: CreateProdutorDto) {
    const isDocumentValid = this.validator.validateCpfCnpj(
      createProdutorDto.document,
    );

    if (!isDocumentValid) {
      throw new BadRequestException('CPF/CNPJ inválido');
    }

    const isTotalAreaValid =
      this.validator.validateAreaTotal(createProdutorDto);

    if (!isTotalAreaValid) {
      throw new BadRequestException(
        'A área total é menor do que a soma da área agricultavel e da area de vegetação.',
      );
    }

    return this.produtorRepository.create(createProdutorDto);
  }

  findAll() {
    return this.produtorRepository.findAll();
  }

  findOne(id: string) {
    return this.produtorRepository.findOne(id);
  }

  update(id: string, updateProdutorDto: UpdateProdutorDto) {
    return this.produtorRepository.update({ id }, updateProdutorDto);
  }

  remove(id: string) {
    return this.produtorRepository.remove({ id });
  }

  async getTotals() {
    const totalFarms = await this.produtorRepository.totalFarms();
    const totalArea = await this.produtorRepository.getTotalArea();
    const landUsage = await this.produtorRepository.getLandUsage();
    const farmsByState = await this.produtorRepository.farmsByState();
    const farmsByCulture = await this.produtorRepository.farmsByCulture();

    return {
      landUsage,
      totalArea,
      totalFarms,
      farmsByState,
      farmsByCulture,
    };
  }
}
