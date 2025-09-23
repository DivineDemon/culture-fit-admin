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
      <SheetContent className="w-full">
        <SheetHeader>
          <SheetTitle className="font-semibold text-lg">Employee Details</SheetTitle>
          <SheetDescription>View all information about this employee</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-3 p-3">
          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Name:</Label>
            <p className="col-span-2 font-medium text-foreground text-sm">{employee.name}</p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Email:</Label>
            <p className="col-span-2 font-medium text-foreground text-sm">{employee.email}</p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Role:</Label>
            <p className="col-span-2 font-medium text-foreground text-sm">{employee.role}</p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Website:</Label>
            <p className="col-span-2 font-medium text-foreground text-sm">{employee.website}</p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Phone:</Label>
            <p className="col-span-2 font-medium text-foreground text-sm">{employee.phone}</p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Department:</Label>
            <p className="col-span-2 font-medium text-foreground text-sm leading-relaxed">{employee.department}</p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2">
            <Label className="text-muted-foreground text-sm">Designation:</Label>
            <p className="col-span-2 font-medium text-foreground text-sm">{employee.designation}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EmployeeDetailSheet;
