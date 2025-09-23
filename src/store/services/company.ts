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
  }),
});

export const { usePostCompanyMutation, useGetCompaniesQuery, useGetCompanyQuery, useUpdateCompanyMutation } = companies;
