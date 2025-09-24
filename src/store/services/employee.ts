import type { Employee } from "@/types";
import { api } from "./core";

export const employees = api.injectEndpoints({
  endpoints: (build) => ({
    getEmployees: build.query({
      query: () => ({
        url: "/employees",
        method: "GET",
      }),
    }),
    postEmployee: build.mutation({
      query: (data: Employee) => ({
        url: "/employees",
        method: "POST",
        body: data,
      }),
    }),
    updateEmployee: build.mutation({
      query: ({ id, data }: { id: string; data: Employee }) => ({
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
  }),
});

export const { useGetEmployeesQuery, usePostEmployeeMutation, useUpdateEmployeeMutation, useGetEmployeeQuery } =
  employees;
