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
    postEmployee: build.mutation<EmployeeResponse, { id: string; data: Employees }>({
      query: ({ id, data }) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password ?? "");
        formData.append("salary", String(data.salary));
        formData.append("is_candidate", String(data.is_candidate ?? false));
        formData.append("is_role_model", String(data.is_role_model ?? false));
        formData.append("company_id", id);

        if (data.date_of_birth) formData.append("date_of_birth", data.date_of_birth);
        if (data.user_phone_number) formData.append("user_phone_number", data.user_phone_number);
        if (data.user_designation) formData.append("user_designation", data.user_designation);
        if (data.department) formData.append("department", data.department);

        if (data.files && data.files.length > 0) {
          data.files.forEach((file: File) => {
            formData.append("files", file);
          });
        }

        return {
          url: `/employees/company/${id}`,
          method: "POST",
          body: formData,
        };
      },
      transformResponse: (response: EmployeeResponse) => response,
    }),
    updateEmployee: build.mutation<EmployeeResponse, { id: string; data: Employees; company_id: string }>({
      query: ({ id, data, company_id }) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password ?? "null");
        formData.append("salary", String(data.salary));
        formData.append("is_candidate", String(data.is_candidate ?? false));
        formData.append("is_role_model", String(data.is_role_model ?? false));
        formData.append("company_id", data.company_id);

        if (data.date_of_birth) formData.append("date_of_birth", data.date_of_birth);
        if (data.user_phone_number) formData.append("user_phone_number", data.user_phone_number);
        if (data.user_designation) formData.append("user_designation", data.user_designation);
        if (data.department) formData.append("department", data.department);
        // if (data.password) formData.append("password", data.password);
        if (data.files && data.files.length > 0) {
          data.files.forEach((file) => {
            formData.append("files", file);
          });
        }

        return {
          url: `/employees/company/${company_id}/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      transformResponse: (response: EmployeeResponse) => response,
    }),
    getEmployeebyId: build.query({
      query: ({ id, company_id }: { id: string; company_id: string }) => ({
        url: `/employees/company/${company_id}/${id}`,
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
  useGetEmployeebyIdQuery,
} = employees;
