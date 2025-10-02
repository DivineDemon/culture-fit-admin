declare type GlobalState = {
  Company: string;
  token: string;
   mode: "employees" | "candidates";
};

declare type PostLogin = {
  email: string;
  password: string;
};

declare type PostLoginResponse = {
  status: string;
  message: string;
  data: {
    access_token: string;
  };
};

declare type CompanyInfo = {
  id: string;
  company_name: string;
  company_email: string;
  password?: string;
  owner_name: string;
  owner_email: string;
  company_website: string;
  company_type: string;
  phone_number: string;
  company_address: string;
  company_description: string;
  policy_document: string;
  policy_file_name: string;
};

export type Policy = {
  id: string;
  company_id: string;
  file_name: string;
  file_size: number;
  description: string | null;
};

declare type EmployeeFile = {
  id: string;
  file_name: string;
};

declare type Employees = {
  company_id: string;
  name: string;
  email: string;
  password: string | null;
  salary: number;
  is_candidate: boolean | null;
  is_role_model: boolean | null;
  date_of_birth: string | null;
  user_phone_number: string | null;
  user_designation: string | null;
  department: string | null;
  files: File[] | null;
};

declare type EmployeeResponse = {
  id: string;
  company_id: string;
  user_id: string | null;
  name: string;
  email: string;
  password: string | null;
  date_of_birth: string | null;
  user_phone_number: string | null;
  user_designation: string | null;
  department: string | null;
  salary: number;
  is_role_model: boolean;
  is_candidate: boolean;
  files: EmployeeFile[];
};