declare type GlobalState = {
  Company: string;
  token: string;
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
  company_name: string,
  email: string,
  password?: string,
  owner_name: string,
  domain: string,
  company_type: string,
  company_size: string,
  phone_number: string,
  company_address: string,
  company_description: string,
};

declare type RowData = {
  id: string;
  company_name: string;
  email: string;
  password: string;
  owner_name: string;
  owner_email: string;
  company_type: string;
  website: string;
  technology?: string;
  contact_number: string;
  company_address: string;
  description: string;
};

export type Policy = {
  id: string;
  company_id: string;
  file_name: string;
  file_size: number;
  description: string | null;
};