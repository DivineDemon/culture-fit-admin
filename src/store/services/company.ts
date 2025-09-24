import type { CompanyInfo, Policy } from "@/types";
import { api } from "./core";

export const companies = api.injectEndpoints({
  endpoints: (build) => ({
    postCompany: build.mutation({
      query: (data: CompanyInfo) => ({
        url: "/companies/",
        method: "POST",
        body: data,
      }),
    }),
    getCompanies: build.query({
      query: () => ({
        url: "/companies/",
        method: "GET",
      }),
    }),
    getCompany: build.query({
      query: (id: string) => ({
        url: `/companies/${id}`,
        method: "GET",
      }),
    }),
    updateCompany: build.mutation({
      query: ({ id, data }: { id: string; data: CompanyInfo }) => ({
        url: `/companies/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    getPolicies: build.query({
      query: (id: string) => ({
        url: `/companies/${id}/all_files`,
        method: "GET",
      }),
      providesTags: ["policies"],
      transformResponse: (response: Policy[]) => response,
    }),
    downloadPolicy: build.query<Blob, { id: string; file_id: string }>({
      query: ({ id, file_id }) => ({
        url: `/companies/${id}/files/${file_id}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  usePostCompanyMutation,
  useGetCompaniesQuery,
  useGetCompanyQuery,
  useUpdateCompanyMutation,
  useGetPoliciesQuery,
  useLazyDownloadPolicyQuery,
} = companies;
