import type { Column, Row } from "@tanstack/react-table";
import { ArrowDownAZ, FilePenLine, FileText, MoreHorizontal, Upload } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import EmployeeSheet from "@/components/company-detail/employee-add-sheet";
import EmployeeDetailSheet from "@/components/company-detail/employee-detail-sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RootState } from "@/types/global";
import UploadModal from "../file-uploader";
import { Badge } from "../ui/badge";

export type Employee = {
  id: string;
  company_id: string;
  user_id: string;
  name: string;
  email: string;
  password: string | null;
  date_of_birth: string;
  user_phone_number: string;
  user_designation: string;
  department: string;
  salary: number;
  is_role_model: boolean;
  is_candidate: boolean;
  files: string[];
};

const ActionsCell = ({ row }: { row: Row<Employee> }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [uploadOpen, setUploadOpen] = useState<boolean>(false);
  const { mode } = useSelector((state: RootState) => state.global);
  // const [warn, setWarn] = useState<boolean>(false);
  // const [deleteEmployee, { isLoading }] = useDeleteEmployeeMutation();

  // const handleDelete = async () => {
  //   const response = await deleteEmployee({
  //     id: row.original.company_id,
  //     employeeId: row.original.id,
  //   });

  //   if ("data" in response) {
  //     toast.success("Employee Deactivated Successfully!");
  //     setWarn(false);
  //   } else {
  //     toast.error("Failed to Deactivate Employee!");
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
            <span className="ml-2 text-sm">Edit {mode === "employees" ? "Candidate" : "Employee"}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDetailOpen(true)}>
            <FileText />
            <span className="ml-2 text-sm">View Details</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setUploadOpen(true)}>
            <Upload />
            <span className="ml-2 text-sm">Upload File</span>
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
        text={<span>Are you sure you want to Delete this Employee?</span>}
        setOpen={setWarn}
        isLoading={isLoading}
        cta={handleDelete}
      /> */}

      <EmployeeSheet
        open={open}
        setOpen={setOpen}
        id={row.original.id}
        companyId={row.original.company_id}
        employee={
          row.original as {
            id: string;
            company_id: string;
            user_id: string;
            name: string;
            email: string;
            password: string | null;
            date_of_birth: string;
            user_phone_number: string;
            user_designation: string;
            department: string;
            salary: number;
            is_role_model: boolean;
            is_candidate: boolean;
            files: string[];
          }
        }
      />
      <EmployeeDetailSheet id={row.original.id} open={detailOpen} setOpen={setDetailOpen} employee={row.original} />

      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUpload={() => setUploadOpen(false)}
        employeeId={row.original.id}
      />
    </>
  );
};

export const useEmployeeColumns = () => {
  return [
    {
      accessorKey: "name",
      header: ({ column }: { column: Column<Employee> }) => (
        <Button variant="ghost" type="button" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowDownAZ className="ml-2" />
        </Button>
      ),
      cell: ({ row }: { row: Row<Employee> }) => (
        <span className="ml-3 font-medium capitalize">{row.getValue("name")}</span>
      ),
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }: { row: Row<Employee> }) => (
        <span className="font-semibold text-[#71717A] text-sm">{row.getValue("id")}</span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }: { row: Row<Employee> }) => (
        <span className="font-semibold text-[#71717A] text-sm">{row.getValue("email")}</span>
      ),
    },
    {
      accessorKey: "user_designation",
      header: "Status",
      cell: ({ row }: { row: Row<Employee> }) => (
        <span className="font-semibold text-[#71717A] text-sm capitalize">
          {row.original.is_candidate ? "Candidate" : "Employee"}
        </span>
      ),
    },
    {
      accessorKey: "is_role_model",
      header: "Role Model",
      cell: ({ row }: { row: Row<Employee> }) => {
        const isRoleModel = row.getValue("is_role_model");
        return (
          <Badge variant="outline" className="w-1/2 px-3">
            {isRoleModel ? "Yes" : "- -"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: Row<Employee> }) => <ActionsCell row={row} />,
    },
  ];
};
