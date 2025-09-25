import type { EmployeeResponse, Employees } from "@/types";
import { api } from "./core";

export const employees = api.injectEndpoints({
  endpoints: (build) => ({
    getEmployees: build.query({
      query: (id) => ({
        url: `/employees/company/${id}`,
        method: "GET",
      }),
    }),
    postEmployee: build.mutation({
      query: ({ id, data }: { id: string; data: Employees }) => ({
        url: `/employees/${id}`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: { data: EmployeeResponse }) => response.data,
    }),
    updateEmployee: build.mutation({
      query: ({ id, data }: { id: string; data: Employees }) => ({
        url: `/employees/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    getEmployee: build.query({
      query: (id: string) => ({
        url: `/employees/${id}`,
        method: "GET",
      }),
    }),
    deleteEmployee: build.mutation({
      query: ({ id, employeeId }: { id: string; employeeId: string }) => ({
        url: `/employees/company/${id}/${employeeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["employees"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useDeleteEmployeeMutation,
  usePostEmployeeMutation,
  useUpdateEmployeeMutation,
  useGetEmployeeQuery,
} = employees;
