import type { Column, Row } from "@tanstack/react-table";
import { ArrowDownAZ } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { truncateString } from "@/lib/utils";
import { setSelectedCompany } from "@/store/slices/global";

export const useRowColumns = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRowClick = (companyId?: string, companyName?: string) => {
    dispatch(setSelectedCompany(companyName));

    if (companyId) {
      navigate(`/company/${companyId}`);
    }
  };

  return [
    {
      accessorKey: "company_name",
      header: ({ column }: { column: Column<CompanyInfo> }) => (
        <Button
          variant="ghost"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Company Name
          <ArrowDownAZ className="ml-2" />
        </Button>
      ),
      cell: ({ row }: { row: Row<CompanyInfo> }) => (
        <span
          onClick={() => handleRowClick(row.original.id, row.original.company_name)}
          className="ml-3 w-full cursor-pointer font-medium hover:underline"
        >
          {row.getValue("company_name") || "N/A"}
        </span>
      ),
    },
    {
      accessorKey: "company_email",
      header: "Email",
      cell: ({ row }: { row: Row<CompanyInfo> }) => (
        <span
          onClick={() => handleRowClick(row.original.id, row.original.company_name)}
          className="w-full cursor-pointer font-semibold text-[#71717A] text-sm hover:underline"
        >
          {row.getValue("company_email") || "N/A"}
        </span>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }: { row: Row<CompanyInfo> }) => (
        <span
          onClick={() => handleRowClick(row.original.id, row.original.company_name)}
          className="w-full cursor-pointer font-semibold text-[#71717A] text-sm hover:underline"
        >
          {row.getValue("address") || "N/A"}
        </span>
      ),
    },
    {
      accessorKey: "company_description",
      header: "Description",
      cell: ({ row }: { row: Row<CompanyInfo> }) => (
        <span
          onClick={() => handleRowClick(row.original.id, row.original.company_name)}
          className="w-full cursor-pointer font-semibold text-[#71717A] text-sm hover:underline"
        >
          {truncateString(row.getValue("company_description"), 50) || "N/A"}
        </span>
      ),
    },
  ];
};
