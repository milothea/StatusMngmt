import { configureStore } from '@reduxjs/toolkit';
import employeesSlice from './employeesSlice.ts';

export const store = configureStore({
    reducer: {
        employees: employeesSlice,
    },

});

type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const getEmployeesList = (state: RootState) => {
    return state.employees.employeesList;
};
export const getIsContentLoading = (state: RootState) => {
    return state.employees.isEmployeesListLoading ||
        state.employees.isEmployeesFiltering;
};

export default store;
