import { Employee } from '@/shared/types/employee.type';
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { persist } from 'zustand/middleware';
type EmployeeStoreType = {
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  deleteEmployee: (employeeId: string) => void;
  updateEmployee: (employee: Employee) => void;
};

export const useEmployeeStore = create<EmployeeStoreType>()(
  persist(
    (set) => ({
      employees: [],
      addEmployee: (employee) => {
        set((state) => ({
          employees: [...state.employees, { ...employee, id: uuidv4() }],
        }));
      },

      deleteEmployee: (employeeId) => {
        set((state) => ({
          employees: state.employees.filter(
            (employee) => employee.id !== employeeId
          ),
        }));
      },

      updateEmployee: (employee) => {
        console.log(employee);
      },
    }),
    {
      name: 'employee-storage',
      partialize: (state) => ({ employees: state.employees }),
    }
  )
);
