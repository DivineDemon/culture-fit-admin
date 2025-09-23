import type { Column, Row } from "@tanstack/react-table";
import { ArrowDownAZ, Info } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeDetailSheet from "@/components/company-detail/employee-detail-sheet";
import { Button } from "@/components/ui/button";

export type Employee = {
  id: string;
  name: string;
  email: string;
  password: string;
  website: string;
  designation: string;
  technology: string;
  phone: string;
  department: string;
  role: string;
};

export const useEmployeeColumns = () => {
  const navigate = useNavigate();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

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
        <span className="ml-3 cursor-pointer font-medium" onClick={() => navigate(`/company/${row.original.id}`)}>
          {row.getValue("name")}
        </span>
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
      accessorKey: "designation",
      header: "Designation",
      cell: ({ row }: { row: Row<Employee> }) => (
        <span className="font-semibold text-[#71717A] text-sm">{row.getValue("designation")}</span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: Row<Employee> }) => {
        const isOpen = selectedEmployeeId === row.original.id;
        return (
          <>
            <Button onClick={() => setSelectedEmployeeId(row.original.id)} size="icon" variant="outline">
              <Info />
            </Button>
            <EmployeeDetailSheet
              open={isOpen}
              setOpen={(open) => {
                if (!open) setSelectedEmployeeId(null);
              }}
              id={row.original.id}
              employee={row.original}
            />
          </>
        );
      },
    },
  ];
};
