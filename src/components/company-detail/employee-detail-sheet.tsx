import type { Dispatch, SetStateAction } from "react";
import type { Employee } from "@/components/company-detail/employee-column";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Label } from "../ui/label";

interface EmployeeDetailSheetProps {
  id?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  employee?: Employee;
}

const EmployeeDetailSheet = ({ open, setOpen, employee }: EmployeeDetailSheetProps) => {
  if (!employee) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="md:w-full lg:min-w-md">
        <SheetHeader>
          <SheetTitle className="font-semibold text-lg">Employee Details</SheetTitle>
          <SheetDescription>View all information about this employee</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-3 p-3">
          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Name:</Label>
            <p className="col-span-2 font-medium text-foreground text-sm capitalize">{employee.name}</p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Email:</Label>
            <p className="col-span-2 font-medium text-foreground text-sm">{employee.email}</p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Designation:</Label>
            <p className="col-span-2 font-medium text-foreground text-sm capitalize">
              {employee.user_designation ?? "N/A"}
            </p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Department:</Label>
            <p className="col-span-2 font-medium text-foreground text-sm capitalize">{employee.department ?? "N/A"}</p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Phone:</Label>
            <p className="col-span-2 font-medium text-foreground text-sm">{employee.user_phone_number ?? "N/A"}</p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Date of Birth:</Label>
            <p className="col-span-2 font-medium text-foreground text-sm">{employee.date_of_birth ?? "N/A"}</p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Salary:</Label>
            <p className="col-span-2 font-medium text-foreground text-sm leading-relaxed">{employee.salary}</p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Candidate:</Label>
            <p className="col-span-2 font-medium text-foreground text-sm">{employee.is_candidate ? "Yes" : "No"}</p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Role Model:</Label>
            <p className="col-span-2 font-medium text-foreground text-sm">{employee.is_role_model ? "Yes" : "No"}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EmployeeDetailSheet;
