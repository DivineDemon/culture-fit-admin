import type { Column, Row } from "@tanstack/react-table";
import { ArrowDownAZ, FilePenLine, FileText, MoreHorizontal, Trash } from "lucide-react";
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
import WarningModal from "../warning-modal";
import DetailSheet from "./detail-sheet";

export type RowData = {
  id: string;
  company_name: string;
  email: string;
  password: string;
  owner_name: string;
  company_type: string;
  website: string;
  technology?: string;
  contact_number: string;
  company_address: string;
  description: string;
};

const ActionsCell = ({ row }: { row: Row<RowData> }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [warn, setWarn] = useState<boolean>(false);
  const [detail, setDetail] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState<RowData | null>(null);

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
          <DropdownMenuItem
            onClick={() => {
              setSelectedCompany(row.original);
              setWarn(true);
            }}
          >
            <Trash />
            <span className="ml-2 text-sm">Deactivate</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <WarningModal
        open={warn}
        title="Are you sure?"
        text={<span>Are you sure you want to Deactivate this company?</span>}
        setOpen={setWarn}
      />
      <CompanySheet id={row.original.id} open={open} setOpen={setOpen} company={row.original} />
      <DetailSheet open={detail} setOpen={setDetail} company={selectedCompany ?? undefined} />
    </>
  );
};

export const useRowColumns = () => {
  return [
    {
      accessorKey: "company_name",
      header: ({ column }: { column: Column<RowData> }) => (
        <Button variant="ghost" type="button" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Company Name
          <ArrowDownAZ className="ml-2" />
        </Button>
      ),
      cell: ({ row }: { row: Row<RowData> }) => (
        <span className="ml-3 cursor-pointer font-medium">{row.getValue("company_name")}</span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }: { row: Row<RowData> }) => (
        <span className="font-semibold text-[#71717A] text-sm">{row.getValue("email")}</span>
      ),
    },
    {
      accessorKey: "company_address",
      header: "Address",
      cell: ({ row }: { row: Row<RowData> }) => (
        <span className="font-semibold text-[#71717A] text-sm">{row.getValue("company_address")}</span>
      ),
    },
    {
      accessorKey: "company_description",
      header: "Description",
      cell: ({ row }: { row: Row<RowData> }) => (
        <span className="font-semibold text-[#71717A] text-sm">{row.getValue("company_description")}</span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: Row<RowData> }) => <ActionsCell row={row} />,
    },
  ];
};
