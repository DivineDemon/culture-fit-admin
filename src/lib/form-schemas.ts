import * as z from "zod";

export const companySchema = z.object({
  company_name: z.string().min(2, "Company name must be at least 2 characters"),

  email: z.string().email("Invalid company email address"),

  password: z.string().min(6, "Password must be at least 6 characters").optional(),

  owner_name: z.string().min(2, "Owner name must be at least 2 characters").optional(),

  company_size: z.string().optional(),

  company_type: z.string().min(2, "Company type must be at least 2 characters").optional(),

  domain: z.string().url("Invalid domain URL").optional(),

  phone_number: z.string().min(10, "Phone number must be at least 10 characters").optional(),

  company_address: z.string().min(5, "Company address must be at least 5 characters").optional(),

  company_description: z.string().min(10, "Description must be at least 10 characters").optional(),
});
