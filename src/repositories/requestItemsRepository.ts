import prisma from './../config/database.js'

export async function insert(createData: any) {
  return prisma.requestItem.create({ data: createData });
}

export async function findAll() {
  return prisma.requestItem.findMany( { include: { expense : true } } );  
}

export async function findById(id: number) {
  return prisma.requestItem.findFirst(  { where: { id } , include: { expense : true } } );  
}

export async function update(id: number, updateData: any) {
  return prisma.requestItem.update( { where: { id }, data: updateData } );  
}