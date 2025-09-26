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
      query: ({ id, data }: { id: string; data: Employees }) => {
        const formData = new FormData();
        formData.append("first_name", data.first_name);
        formData.append("last_name", data.last_name);
        formData.append("email", data.email);
        formData.append("position", data.position);
        formData.append("salary", String(data.salary));
        formData.append("is_candidate", String(data.is_candidate));
        formData.append("company_id", id);

        if (data.files && data.files.length > 0) {
          formData.append("files", data.files[0]);
        }

        return {
          url: `/employees/${id}`,
          method: "POST",
          body: formData,
        };
      },
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
