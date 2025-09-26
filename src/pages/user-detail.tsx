import { Loader2, Upload, UserPlus } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import EmployeeSheet from "@/components/company-detail/employee-add-sheet";
import { useEmployeeColumns } from "@/components/company-detail/employee-column";
import CulturePolicies from "@/components/dashboard/company-policy";
import { DataTable } from "@/components/data-table";
import UploadModal from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetCompanyQuery, usePostPolicyMutation } from "@/store/services/company";
import { useGetEmployeesQuery } from "@/store/services/employees";

const UserDetail = () => {
  const columns = useEmployeeColumns();
  const [open, setOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const companyId = id ?? "";
  const [search, setSearch] = useState<string>("");
  const [uploadOpen, setUploadOpen] = useState(false);

  const { data: employee, isLoading: isLoadingEmployee } = useGetEmployeesQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const { data: company, isLoading } = useGetCompanyQuery(id ?? "");
  const [postPolicy, { isLoading: isUploading }] = usePostPolicyMutation();

  const handleUpload = async (files: File[]) => {
    if (!companyId) return;
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });
    try {
      const response = await postPolicy({ id: companyId, formData });
      if (response) {
        toast.success("Files uploaded successfully");
      }
      setUploadOpen(false);
    } catch (_err) {
      toast.error("Failed to upload files");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col gap-5 overflow-auto">
      <div className="flex items-center justify-between">
        <Label className="font-bold text-primary text-xl sm:text-2xl md:text-3xl">
          {company?.company_name ?? "Company Not Found"}
        </Label>
        <div className="hidden flex-col gap-2.5 md:flex md:flex-row">
          <Button variant="default" size="sm" type="button" onClick={() => setOpen(true)}>
            Add Employee <UserPlus className="ml-1 size-4" />
          </Button>
          <Button variant="default" size="sm" type="button" onClick={() => setUploadOpen(true)}>
            Upload Policy <Upload className="ml-1 size-4" />
          </Button>
        </div>
        <div className="flex gap-2.5 md:hidden">
          <Button variant="default" size="sm" type="button" onClick={() => setOpen(true)}>
            <UserPlus className="ml-1 size-4" />
          </Button>
          <Button variant="default" size="sm" type="button" onClick={() => setUploadOpen(true)}>
            <Upload className="ml-1 size-4" />
          </Button>
        </div>
      </div>

      <Card className="w-full rounded-xl shadow-none">
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col rounded-lg border p-4 shadow">
            <p className="font-semibold text-base sm:text-lg">Company Email</p>
            <p className="text-muted-foreground text-sm">{company?.email || "N/A"}</p>
          </div>

          <div className="flex flex-col rounded-lg border p-4 shadow">
            <p className="font-semibold text-base sm:text-lg">Owner Name</p>
            <p className="text-muted-foreground text-sm">{company?.owner_name || "N/A"}</p>
          </div>

          <div className="flex flex-col rounded-lg border p-4 shadow">
            <p className="font-semibold text-base sm:text-lg">Website</p>
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
            <p className="font-semibold text-base sm:text-lg">Company Size</p>
            <p className="text-muted-foreground text-sm">{company?.company_size || "N/A"}</p>
          </div>

          <div className="flex flex-col rounded-lg border p-4 shadow">
            <p className="font-semibold text-base sm:text-lg">Company Type</p>
            <p className="text-muted-foreground text-sm">{company?.company_type || "N/A"}</p>
          </div>

          <div className="flex flex-col rounded-lg border p-4 shadow">
            <p className="font-semibold text-base sm:text-lg">Phone</p>
            <p className="text-muted-foreground text-sm">{company?.phone_number || "N/A"}</p>
          </div>

          <div className="flex flex-col rounded-lg border p-4 shadow">
            <p className="font-semibold text-base sm:text-lg">Address</p>
            <p className="text-muted-foreground text-sm">{company?.company_address || "N/A"}</p>
          </div>

          <div className="col-span-1 flex flex-col rounded-lg border p-4 shadow sm:col-span-2 lg:col-span-4">
            <p className="font-semibold text-base sm:text-lg">Description</p>
            <p className="w-full text-muted-foreground text-sm">{company?.company_description || "N/A"}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex h-full flex-col gap-5 lg:grid lg:grid-cols-3">
        <div className="order-2 lg:order-1">
          <CulturePolicies />
        </div>

        <div className="order-1 flex h-full flex-col gap-5 rounded-xl border p-4 sm:p-6 md:h-full lg:order-2 lg:col-span-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-medium text-primary text-xl sm:text-2xl md:text-[28px]">Company Employees</span>
            <Input
              type="text"
              className="w-full sm:w-1/2 lg:w-1/3"
              placeholder="Filter Users by Email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {isLoadingEmployee ? (
            <div className="flex w-full items-center justify-center py-10">
              <Loader2 className="size-8 animate-spin text-primary" />
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={
                search
                  ? (employee ?? []).filter((e: { email: string }) =>
                      e.email.toLowerCase().includes(search.toLowerCase()),
                    )
                  : (employee ?? [])
              }
            />
          )}
        </div>
      </div>

      <EmployeeSheet open={open} setOpen={setOpen} companyId={companyId} />
      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUpload={handleUpload}
        isLoading={isUploading}
      />
    </div>
  );
};

export default UserDetail;
