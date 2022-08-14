import prisma from './../config/database.js';

export async function insert(createData: any) {
  return prisma.expense.create( { data: createData });
}

export async function findAll() {
  return prisma.expense.findMany();  
}

export async function findById(id: number) {
  return prisma.expense.findFirst( { where: { id } } );  
}

export async function findByDescription(description: string) {
  return prisma.expense.findMany( { where: { description } } );  
}

export async function update(id: number, updateData: any) {
  return prisma.expense.update( { where: { id }, data: updateData } );  
}
