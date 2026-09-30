import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}
    
  async create(createProductDto: Prisma.ProductCreateInput) {

    console.log("Service run!")
   
  return this.databaseService.product.create({
    data: createProductDto,
    include: {
      description: true,
      tag: true

    }
  });
  }

  async findAll() {
    return this.databaseService.product.findMany({
      include: {
      description: true,
      tag: true
      }
    });
  }

  async findOne(id: number) {
    return this.databaseService.product.findUnique({
      where: {
        id,
      },
      include: {
        description: true,
        tag: true,
        reviews: true
      }
    })
  }

  async update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    return this.databaseService.product.update({
      where: {
        id,
      },
      data: updateProductDto, 
    })
  }

  async remove(id: number) {
    return this.databaseService.product.delete({
      where: {
        id, 
      },
    })
  }
}
