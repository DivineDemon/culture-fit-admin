import type { Column, Row } from "@tanstack/react-table";
import { ArrowDownAZ, FilePenLine, FileText, MoreHorizontal } from "lucide-react";
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
import type { CompanyInfo } from "@/types";

// import { useDeleteCompanyMutation } from "@/store/services/company";
// import { toast } from "sonner";
// import WarningModal from "../warning-modal";

const ActionsCell = ({ row }: { row: Row<CompanyInfo> }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  // const [warn, setWarn] = useState<boolean>(false);
  // const [deleteCompany, { isLoading }] = useDeleteCompanyMutation();

  // const handleDelete = async () => {
  //   const response = await deleteCompany({ id: row.original.id });

  //   if ("data" in response) {
  //     toast.success("Company Deleted Successfully!");
  //     setWarn(false);
  //   } else {
  //     toast.error("Failed to Delete Company!");
  //   }
  // };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" type="button">
            <MoreHorizontal className="rotate-90" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <FilePenLine />
            <span className="ml-2 text-sm">Edit Company</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigate(`/company/${row.original.id}`);
            }}
          >
            <FileText />
            <span className="ml-2 text-sm">View Details</span>
          </DropdownMenuItem>
          {/* <DropdownMenuItem
            onClick={() => {
              setWarn(true);
            }}
          >
            <Trash2 className="text-destructive" />
            <span className="ml-2 text-sm">Delete</span>
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <WarningModal
        open={warn}
        title="Are you sure?"
        text={<span>Are you sure you want to Delete this company?</span>}
        setOpen={setWarn}
        isLoading={isLoading}
        cta={handleDelete}
      /> */}
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
        <span className="font-semibold text-[#71717A] text-sm">{row.getValue("company_email") || "N/A"}</span>
      ),
    },
    {
      accessorKey: "company_address",
      header: "Address",
      cell: ({ row }: { row: Row<CompanyInfo> }) => (
        <span className="font-semibold text-[#71717A] text-sm">{row.getValue("company_address") || "N/A"}</span>
      ),
    },
    {
      accessorKey: "company_description",
      header: "Description",
      cell: ({ row }: { row: Row<CompanyInfo> }) => (
        <span className="font-semibold text-[#71717A] text-sm">{row.getValue("company_description") || "N/A"}</span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: Row<CompanyInfo> }) => <ActionsCell row={row} />,
    },
  ];
};
