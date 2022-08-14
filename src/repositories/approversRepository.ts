import prisma from './../config/database.js'

export async function insert(createData: any) {
  return prisma.approver.create({ data: createData });
}

export async function findAll() {
  return prisma.approver.findMany( { include: { user: true, department: true } } );  
}

export async function findById(id: number) {
  return prisma.approver.findFirst(  { where: { id } , include: { user: true, department: true } } );  
}

export async function findByUserIdName(userId: number) {
  return prisma.approver.findMany( { where: { userId } , include: { user: true, department: true } } );  
}

export async function findByDepartmentId(departmentId: number) {
  return prisma.approver.findMany( { where: { departmentId } , include: { user: true, department : true } } );  
}

export async function update(id: number, updateData: any) {
  return prisma.approver.update( { where: { id }, data: updateData } );  
}