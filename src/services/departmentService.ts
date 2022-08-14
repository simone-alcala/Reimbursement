import { Department } from '@prisma/client';
import * as repository from './../repositories/departmentsRepository.js';
import * as throwError from './../utils/errorUtils.js';

export type DataDepartmentUpdate = Partial<Department>;
export type DataDepartmentCreate = Omit<Department, 'id'>;


export async function checkIfDepartmentExistsById(departmentId: number) {
  const department = await repository.findById(departmentId);
  if (!department) {
    throw throwError.notFoundError('Department not found');
  }
}
