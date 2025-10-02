import type { CompanyInfo, Policy } from "@/types";
import { api } from "./core";

export const companies = api.injectEndpoints({
  endpoints: (build) => ({
    postCompany: build.mutation({
      query: (data) => {
        const formData = new FormData();

        formData.append("company_name", data.company_name || "");
        formData.append("company_email", data.company_email || "");
        if (data.password) formData.append("password", data.password);
        formData.append("owner_name", data.owner_name || "");
        formData.append("owner_email", data.owner_email || "");
        formData.append("company_website", data.company_website || "");
        formData.append("company_type", data.company_type || "");
        formData.append("phone_number", data.phone_number || "");
        formData.append("company_address", data.company_address || "");
        formData.append("company_description", data.company_description || "");

        if (data.policy_document) {
          formData.append("policy_document", data.policy_document as File);
        }

        if (data.policy_file_name) {
          formData.append("policy_file_name", data.policy_file_name);
        }

        return {
          url: "/companies/",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["companies"],
      transformResponse: (response: { data: CompanyInfo }) => response.data,
    }),
    getCompanies: build.query<CompanyInfo, void>({
      query: () => ({
        url: "/companies/",
        method: "GET",
      }),
      providesTags: ["companies"],
      transformResponse: (response: { status_code: number; message: string; data: CompanyInfo }) => response.data,
    }),
    getCompany: build.query({
      query: (id: string) => ({
        url: `/companies/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { status: string; message: string; data: CompanyInfo }) => response.data,
    }),
    updateCompany: build.mutation({
      query: ({ id, data }: { id: string; data: CompanyInfo }) => {
        const formData = new FormData();

        formData.append("company_name", data.company_name || "");
        formData.append("company_email", data.company_email || "");
        if (data.password) formData.append("password", data.password);
        formData.append("owner_name", data.owner_name || "");
        formData.append("company_website", data.company_website || "");
        formData.append("company_type", data.company_type || "");
        formData.append("phone_number", data.phone_number || "");
        formData.append("company_address", data.company_address || "");
        formData.append("company_description", data.company_description || "");

        if (data.policy_document) {
          formData.append("policy_document", data.policy_document);
        }

        if (data.policy_file_name) {
          formData.append("policy_file_name", data.policy_file_name);
        }

        return {
          url: `/companies/${id}/`,
          method: "PUT",
          body: formData,
        };
      },
      transformResponse: (response: { status: string; message: string; data: CompanyInfo }) => response.data,
      invalidatesTags: ["companies"],
    }),
    postPolicy: build.mutation({
      query: ({ id, formData }: { id: string; formData: FormData }) => ({
        url: `/companies/${id}/files`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["policies"],
    }),
    getPolicies: build.query({
      query: (id: string) => ({
        url: `/companies/${id}/files`,
        method: "GET",
      }),
      providesTags: ["policies"],
      transformResponse: (response: { status: string; message: string; data: Policy[] }) => response.data,
    }),
    downloadPolicy: build.query<Blob, { id: string; file_id: string }>({
      query: ({ id, file_id }) => ({
        url: `/companies/${id}/files/${file_id}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
      }),
    }),
    deleteCompany: build.mutation({
      query: ({ id }: { id: string }) => ({
        url: `/companies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["companies"],
    }),
  }),
});

export const {
  usePostCompanyMutation,
  useGetCompaniesQuery,
  useGetCompanyQuery,
  useUpdateCompanyMutation,
  useGetPoliciesQuery,
  usePostPolicyMutation,
  useLazyDownloadPolicyQuery,
  useDeleteCompanyMutation,
} = companies;
