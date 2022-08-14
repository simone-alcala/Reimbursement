import prisma from './../config/database.js'

export async function insert(createData: any) {
  return prisma.user.create({ data: createData });
}

export async function findAll() {
  return prisma.user.findMany( { include: { department: true } } );  
}

export async function findById(id: number) {
  return prisma.user.findFirst(  { where: { id } , include: { department: true } } );  
}

export async function findByEmail(email: string) {
  return prisma.user.findMany( { where: { email } , include: { department: true } } );  
}

export async function findByName(fullName: string) {
  return prisma.user.findMany( { where: { fullName } , include: { department: true } } );  
}

export async function findByDepartmentId(id: number) {
  return prisma.department.findMany( { where: { id } , include: { users : true } } );  
}

export async function update(id: number, updateData: any) {
  return prisma.user.update( { where: { id }, data: updateData } );  
}
