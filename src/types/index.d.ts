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