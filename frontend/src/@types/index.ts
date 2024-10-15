import { StatusType } from '../constants';

export interface EmployeeModel {
    id: number
    status: StatusType | string
    name: string
    img?: string
}

export type NewEmployeeType = Omit<EmployeeModel, 'id'>;

export interface EmployeeStore {
    employeesList: EmployeeModel[]
    employeeData: EmployeeModel
    isEmployeesListLoading: boolean
    isEmployeeStatusUpdating: boolean
    isEmployeesFiltering: boolean
    error: string | null
}

export type EmployeeStatusPayload = Pick<EmployeeModel, 'id'> & {
    status: string
};

export interface FilterStateType {
    searchQuery?: string
    status?: string
}
