import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { EmployeeModel, EmployeeStore, EmployeeStatusPayload, FilterStateType, NewEmployeeType } from '../@types';
import { BASE_API } from '../constants';

const initialState: EmployeeStore = {
    employeesList: [],
    employeeData: {} as EmployeeModel,
    isEmployeesListLoading: false,
    isEmployeeStatusUpdating: false,
    isEmployeesFiltering: false,
    error: null,
};

export const fetchEmployeeData = createAsyncThunk(
    'fetchEmployees',
    async (_, { rejectWithValue }) => {
        try {
            const { data, status } = await axios.get(`${BASE_API}/users`);
            if (status == 200) {
                return data;
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to fetch employees';
            return rejectWithValue(message);
        }
    }
);

export const updateEmployeeStatus = createAsyncThunk(
    'updateEmployeeStatus',
    async (payload: EmployeeStatusPayload, { rejectWithValue }) => {
        try {
            const { id, status } = payload;
            const { data, status: reqStatus } = await axios.post(`${BASE_API}/users/${id}`, { status } );
            if (reqStatus == 200) {
                return data;
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : `Failed to update status of employee with ID ${payload.id}`;
            rejectWithValue(message);
        }
    }
);

export const filterEmployees = createAsyncThunk(
    'filterEmployees',
    async (payload: FilterStateType, { rejectWithValue }) => {
        try {
            const { data, status } = await axios.post(`${BASE_API}/users`, payload);
            if (status == 200) {
                return data;
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : `Failed to filter employees`;
            rejectWithValue(message);
        }
    }
);

export const saveNewEmployee = createAsyncThunk(
    'saveEmployee',
    async (payload: NewEmployeeType, { rejectWithValue}) => {
        try {
            const { data, status } = await axios.post(`${BASE_API}/save-user`, payload);
            if (status === 200) {
                return data;
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : `Failed to save new employee`;
            rejectWithValue(message);
        }
    }
);

export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchEmployeeData.pending,
                (state) => {
                    state.isEmployeesListLoading = true;
                })
            .addCase(
                fetchEmployeeData.fulfilled,
                (state, action: PayloadAction<EmployeeModel[]>) => {
                    state.employeesList = action.payload;
                    state.isEmployeesListLoading = false;
                })
            .addCase(
                fetchEmployeeData.rejected,
                (state, action) => {
                    state.isEmployeesListLoading = false;
                    state.error = (action.payload || 'Failed to fetch employees') as string;
                })
            .addCase(
                updateEmployeeStatus.pending,
                (state) => {
                    state.isEmployeeStatusUpdating = true;
                })
            .addCase(
                updateEmployeeStatus.fulfilled,
                (state, action: PayloadAction<EmployeeModel[]>) => {
                    state.employeesList = action.payload;
                    state.isEmployeesListLoading = false;
                })
            .addCase(
                updateEmployeeStatus.rejected,
                (state, action) => {
                    state.isEmployeeStatusUpdating = false;
                    state.error =  (action.payload || 'Failed to update status') as string;
                })
            .addCase(
                filterEmployees.pending,
                (state) => {
                    state.isEmployeesFiltering = true;
                })
            .addCase(
                filterEmployees.fulfilled,
                (state, action: PayloadAction<EmployeeModel[]>) => {
                    state.employeesList = action.payload;
                    state.isEmployeesFiltering = false;
                })
            .addCase(
                filterEmployees.rejected,
                (state, action) => {
                    state.error =  (action.payload || 'Failed to filter employees') as string;
                    state.isEmployeesFiltering = false;
                })
            .addCase(
                saveNewEmployee.fulfilled,
                (state, action: PayloadAction<EmployeeModel[]>) => {
                    state.employeesList = action.payload;
                })
            .addCase(
                saveNewEmployee.rejected,
                (state, action) => {
                    state.error =  (action.payload || 'Failed to save employees') as string;
                });
    }
});

export default employeesSlice.reducer;
