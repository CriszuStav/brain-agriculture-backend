import { Injectable } from '@nestjs/common';
import { validator } from 'cpf-cnpj-validator';
import { validateBr } from 'js-brasil';
import { CreateProdutorDto } from 'src/modules/produtor/dto/create-produtor.dto';

@Injectable()
export class Validator {
  public validateCpfCnpj(document: string) {
    switch (document.length) {
      case 11:
        return this.validateCpf(document);
      case 14:
        return this.validateCnpj(document);
    }
  }

  private validateCpf(cpf: string) {
    return validateBr.cpf(cpf)
  }

  private validateCnpj(cnpj: string) {
    return validateBr.cnpj(cnpj)
  }

  public validateAreaTotal(createProdutorDto: CreateProdutorDto) {
    return createProdutorDto.totalArea >= (createProdutorDto.agricultureArea + createProdutorDto.vegetationArea)
  }
}
