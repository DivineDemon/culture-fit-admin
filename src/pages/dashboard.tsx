import { Building2, Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRowColumns } from "@/components/dashboard/columns";
import CompanySheet from "@/components/dashboard/company-sheet";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetCompaniesQuery } from "@/store/services/company";

const Dashboard = () => {
  const columns = useRowColumns();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const { data, isLoading } = useGetCompaniesQuery({
    refetchOnMountOrArgChange: true,
  });

  return (
    <>
      <div className="flex h-full w-full flex-col items-start justify-start gap-5 md:overflow-hidden">
        <div className="flex w-full items-start justify-start gap-2.5">
          <span className="flex-1 text-left font-bold text-[32px] text-primary leading-[32px]">Companies</span>
          <div className="hidden flex-col gap-2.5 md:flex md:flex-row">
            <Button variant="default" size="sm" type="button" onClick={() => setOpen(true)}>
              Add Company &nbsp;
              <Building2 />
            </Button>
            <Button variant="default" size="sm" type="button">
              Export as Excel &nbsp;
              <Download />
            </Button>
          </div>
          <div className="flex gap-2.5 md:hidden">
            <Button variant="default" size="icon" type="button" onClick={() => setOpen(true)}>
              <Building2 />
            </Button>
            <Button variant="default" size="icon" type="button">
              <Download />
            </Button>
          </div>
        </div>
        <div className="flex h-[calc(100vh-156px)] w-full flex-col gap-3.5 overflow-hidden">
          <Input
            type="text"
            className="w-1/3"
            placeholder="Filter Company by Email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {isLoading ? (
            <p className="mx-auto flex h-full w-full items-center justify-center">
              <Loader2 className="size-8 animate-spin text-primary" />
            </p>
          ) : (
            <DataTable
              columns={columns}
              data={
                search
                  ? (data ?? []).filter((e: { email: string }) => e.email.toLowerCase().includes(search.toLowerCase()))
                  : (data ?? [])
              }
            />
          )}
        </div>
        <CompanySheet open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default Dashboard;
