import type { Column, Row } from "@tanstack/react-table";
import { ArrowDownAZ, EllipsisVertical, FilePenLine, FileText } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanySheet from "@/components/dashboard/company-sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { truncateString } from "@/lib/utils";

const ActionsCell = ({ row }: { row: Row<CompanyInfo> }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" type="button">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <FilePenLine />
            Edit Company
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigate(`/company/${row.original.id}`);
            }}
          >
            <FileText />
            View Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CompanySheet id={row.original.id} open={open} setOpen={setOpen} company={row.original} />
    </>
  );
};

export const useRowColumns = () => {
  return [
    {
      accessorKey: "company_name",
      header: ({ column }: { column: Column<CompanyInfo> }) => (
        <Button variant="ghost" type="button" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Company Name
          <ArrowDownAZ className="ml-2" />
        </Button>
      ),
      cell: ({ row }: { row: Row<CompanyInfo> }) => (
        <span className="ml-3 cursor-pointer font-medium">{row.getValue("company_name") || "N/A"}</span>
      ),
    },
    {
      accessorKey: "company_email",
      header: "Email",
      cell: ({ row }: { row: Row<CompanyInfo> }) => (
        <span className="font-semibold text-[#71717A] text-sm">
          {truncateString(row.getValue("company_email"), 25) || "N/A"}
        </span>
      ),
    },
    {
      accessorKey: "company_address",
      header: "Address",
      cell: ({ row }: { row: Row<CompanyInfo> }) => (
        <span className="font-semibold text-[#71717A] text-sm">
          {truncateString(row.getValue("company_address"), 30) || "N/A"}
        </span>
      ),
    },
    {
      accessorKey: "company_description",
      header: "Description",
      cell: ({ row }: { row: Row<CompanyInfo> }) => (
        <span className="font-semibold text-[#71717A] text-sm">
          {truncateString(row.getValue("company_description"), 50) || "N/A"}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: Row<CompanyInfo> }) => <ActionsCell row={row} />,
    },
  ];
};
