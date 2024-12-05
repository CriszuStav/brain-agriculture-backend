import { Injectable } from '@nestjs/common';
import { Prisma, Produtor } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';
import {
  CreateProdutorData,
  UpdateProdutorData,
} from '../interfaces/CreateProdutorData.interface';

@Injectable()
export class ProdutorRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: CreateProdutorData): Promise<Produtor> {
    try {
      const produtor = await this.prisma.produtor.create({
        data: {
          ...data,
          cultures: {
            create: data.cultures?.map((culture) => ({ name: culture.name })),
          },
        },
        include: {
          cultures: true,
        },
      });

      return produtor;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log('prisma error ->', error);
      }

      throw error;
    }
  }

  public async findAll() {
    try {
      const produtor = await this.prisma.produtor.findMany({
        orderBy: { id: 'asc' },
        include: { cultures: { select: { id: true, name: true } } },
      });
      return produtor;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log('prisma error ->', error);
      }

      throw error;
    }
  }

  public async findOne(id: string) {
    try {
      const produtor = await this.prisma.produtor.findFirst({
        where: { id },
        include: { cultures: { select: { id: true, name: true } } },
      });
      return produtor;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log('prisma error ->', error);
      }

      throw error;
    }
  }

  public async update(
    where: Prisma.ProdutorWhereUniqueInput,
    data: UpdateProdutorData,
  ): Promise<Produtor> {
    try {
      return await this.prisma.produtor.update({
        where,
        data: {
          ...data,
          cultures: {
            deleteMany: {},
            create: data.cultures.map((culture) => ({
              name: culture.name,
            })),
          },
        },
        include: { cultures: { select: { id: true, name: true } } },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log('prisma error ->', error);
      }

      throw error;
    }
  }

  public async remove(
    where: Prisma.ProdutorWhereUniqueInput,
  ): Promise<Produtor> {
    try {
      return await this.prisma.produtor.delete({ where });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log('prisma error ->', error);
      }

      throw error;
    }
  }

  public async totalFarms(): Promise<number> {
    return this.prisma.produtor.count({});
  }

  public async getTotalArea(): Promise<number> {
    const result = await this.prisma.produtor.aggregate({
      _sum: {
        totalArea: true,
      },
    });

    return result._sum.totalArea;
  }

  public async farmsByState() {
    const result = await this.prisma.produtor.groupBy({
      by: ['state'],
      _count: {
        state: true,
      },
      orderBy: {
        _count: {
          state: 'desc',
        },
      },
    });

    const farms = result.map((farm) => ({
      state: farm.state,
      count: farm._count.state,
    }));

    return farms;
  }

  public async farmsByCulture() {
    const result = await this.prisma.cultura.groupBy({
      by: ['name'],
      _count: {
        name: true,
      },
      orderBy: {
        _count: {
          name: 'desc',
        },
      },
    });

    const farms = result.map((farm) => ({
      culture: farm.name,
      count: farm._count.name,
    }));

    return farms;
  }

  public async getLandUsage() {
    const result = await this.prisma.produtor.aggregate({
      _sum: {
        agricultureArea: true,
        vegetationArea: true,
      },
    });

    const landUsage = [
      { type: 'área agricultavel', area: result._sum.agricultureArea || 0 },
      { type: 'área de vegetação', area: result._sum.vegetationArea || 0 },
    ];

    return landUsage;
  }
}
