import * as z from "zod";

export const companySchema = z.object({
  company_name: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .regex(/^[A-Za-z\s]+$/, "Company name must contain only alphabets"),

  email: z.string().email("Invalid company email address"),

  password: z.string().min(8, "Password must be at least 8 characters").optional(),

  owner_name: z
    .string()
    .min(2, "Owner name must be at least 2 characters")
    .regex(/^[A-Za-z\s]+$/, "Owner name must contain only alphabets")
    .optional(),

  company_size: z.string().optional(),

  company_type: z
    .string()
    .min(2, "Company type must be at least 2 characters")
    .regex(/^[A-Za-z\s]+$/, "Company type must contain only alphabets")
    .optional(),

  domain: z.string().url("Invalid domain URL").optional(),

  phone_number: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only numbers")
    .optional(),

  company_address: z.string().min(5, "Company address must be at least 5 characters").optional(),

  company_description: z.string().min(10, "Description must be at least 10 characters").optional(),

  policy_document: z.string().optional(),
  policy_file_name: z.string().optional(),
});

export const employeesSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  position: z.string().min(2, "Position is required"),
  salary: z.number().min(0, "Salary must be a positive number"),
  is_candidate: z.boolean().optional(),
  files: z.array(z.any()).optional(),
});
