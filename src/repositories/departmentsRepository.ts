import prisma from './../config/database.js';

export async function insert(createData: any) {
  return prisma.department.create( { data: createData });
}

export async function findAll() {
  return prisma.department.findMany();  
}

export async function findById(id: number) {
  return prisma.department.findFirst( { where: { id } } );  
}

export async function findByDescription(description: string) {
  return prisma.department.findMany( { where: { description } } );  
}

export async function update(id: number, updateData: any) {
  return prisma.department.update( { where: { id }, data: updateData } );  
}
