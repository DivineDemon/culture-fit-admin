import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEmployeeColumns } from "@/components/company-detail/employee-column";
import { DataTable } from "@/components/data-table";
import CulturePolicies from "@/components/dummy-policy";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { employees } from "@/lib/constants";
import { useGetCompanyQuery } from "@/store/services/company";

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const columns = useEmployeeColumns();
  const [search, setSearch] = useState<string>("");

  const { data: company, isLoading } = useGetCompanyQuery(id ?? "");

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col gap-5 overflow-auto">
      <div className="flex h-full w-full flex-col items-start justify-start gap-3.5">
        <Label className="flex items-center justify-center font-bold text-[24px] text-primary leading-[24px]">
          {company?.company_name ?? "Company Not Found"}
        </Label>
        <div className="flex w-full items-center justify-center">
          <Card className="w-full rounded-xl shadow-none">
            <CardContent className="grid w-full grid-cols-1 gap-4 md:grid-cols-4">
              <div className="flex flex-col rounded-lg border p-4 shadow">
                <p className="font-semibold text-lg">Company Email</p>
                <p className="text-muted-foreground text-sm">{company?.email || "N/A"}</p>
              </div>

              <div className="flex flex-col rounded-lg border p-4 shadow">
                <p className="font-semibold text-lg">Owner Name</p>
                <p className="text-muted-foreground text-sm">{company?.owner_name || "N/A"}</p>
              </div>

              <div className="flex flex-col rounded-lg border p-4 shadow">
                <p className="font-semibold text-lg">Website</p>
                <a
                  href={company?.domain || "N/A"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground text-sm underline"
                >
                  {company?.domain || "N/A"}
                </a>
              </div>

              <div className="flex flex-col rounded-lg border p-4 shadow">
                <p className="font-semibold text-lg">Company Size</p>
                <p className="text-muted-foreground text-sm">{company?.company_size || "N/A"}</p>
              </div>

              <div className="flex flex-col rounded-lg border p-4 shadow">
                <p className="font-semibold text-lg">Company Type</p>
                <p className="text-muted-foreground text-sm">{company?.company_type || "N/A"}</p>
              </div>

              <div className="flex flex-col rounded-lg border p-4 shadow">
                <p className="font-semibold text-lg">Phone</p>
                <p className="text-muted-foreground text-sm">{company?.phone_number || "N/A"}</p>
              </div>

              <div className="flex flex-col rounded-lg border p-4 shadow">
                <p className="font-semibold text-lg">Address</p>
                <p className="text-muted-foreground text-sm">{company?.company_address || "N/A"}</p>
              </div>

              <div className="col-span-4 flex flex-col rounded-lg border p-4 shadow">
                <p className="font-semibold text-lg">Description</p>
                <p className="w-full text-muted-foreground text-sm">{company?.company_description || "N/A"}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="grid h-full w-full grid-cols-2 items-start justify-start gap-3.5 overflow-auto">
        <CulturePolicies />
        <div className="flex h-fit w-full flex-col items-start justify-center gap-5 rounded-xl border p-5">
          <div className="flex w-full items-start justify-between">
            <span className="w-full text-left font-medium text-[28px] text-primary leading-[36px]">
              Company Employees
            </span>
            <Input
              type="text"
              className="w-1/2"
              placeholder="Filter Users by Email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <DataTable
            columns={columns}
            data={search ? employees.filter((e) => e.email.toLowerCase().includes(search.toLowerCase())) : employees}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
