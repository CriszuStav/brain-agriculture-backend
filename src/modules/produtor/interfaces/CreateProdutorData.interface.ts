import { Prisma } from '@prisma/client';

export interface CreateProdutorData extends Omit<Prisma.ProdutorCreateInput, 'cultures'> {
  cultures: { name: string }[];
}

export interface UpdateProdutorData extends Omit<Prisma.ProdutorUpdateInput, 'cultures'> {
  cultures?: { name: string }[];
}