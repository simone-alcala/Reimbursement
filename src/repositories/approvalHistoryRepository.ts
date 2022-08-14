import prisma from './../config/database.js'

export async function insert(createData: any) {
  return prisma.approvalHistory.create({ data: createData });
}

export async function findAll() {
  return prisma.approvalHistory.findMany( { include: { request: true, user: true } } );  
}

export async function findById(id: number) {
  return prisma.approvalHistory.findFirst(  { where: { id } , include: { request: true, user: true } } );  
}

export async function findByrequestId(requestId: number) {
  return prisma.approvalHistory.findFirst(  { where: { requestId } , include: { request: true, user: true } } );  
}
