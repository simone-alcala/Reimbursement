import prisma from './../config/database.js'

export async function insert(createData: any) {
  return prisma.request.create({ data: createData });
}

export async function findAll() {
  return prisma.request.findMany( { include: { requester: true , approver : true } } );  
}

export async function findById(id: number) {
  return prisma.request.findFirst(  { where: { id } , include: { requester: true , approver : true } } );  
}

export async function findByRequesterId(requesterId: number) {
  return prisma.request.findMany( { where: { requesterId } , include: { requester: true , approver : true } } );  
}

export async function findByApproverId(approverId: number) {
  return prisma.request.findMany( { where: { approverId } , include: { requester: true , approver : true } } );  
}

export async function findByStatus(status: string) {
  return prisma.request.findMany( { where: { status } , include: { requester: true , approver : true } } );  
}

export async function update(id: number, updateData: any) {
  return prisma.request.update( { where: { id }, data: updateData } );  
}