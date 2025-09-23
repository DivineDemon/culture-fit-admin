import type { Dispatch, SetStateAction } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface DetailSheetProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  company?: {
    company_name: string;
    email: string;
    password: string;
    owner_name: string;
    company_type: string;
    website: string;
    contact_number: string;
    company_address: string;
    description: string;
  };
}

const DetailSheet = ({ open, setOpen, company }: DetailSheetProps) => {
  if (!company) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="font-semibold text-lg">Company Details</SheetTitle>
          <SheetDescription>View all information about this company</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-5 p-3">
          <div className="grid grid-cols-3 items-start gap-2 border-b pb-3">
            <p className="text-muted-foreground text-sm">Company Name</p>
            <p className="col-span-2 font-medium text-foreground text-sm">{company.company_name}</p>
          </div>
          <div className="grid grid-cols-3 items-start gap-2 border-b pb-3">
            <p className="text-muted-foreground text-sm">Email</p>
            <p className="col-span-2 font-medium text-foreground text-sm">{company.email}</p>
          </div>
          <div className="grid grid-cols-3 items-start gap-2 border-b pb-3">
            <p className="text-muted-foreground text-sm">Password</p>
            <p className="col-span-2 font-medium text-foreground text-sm">••••••••</p>
          </div>
          <div className="grid grid-cols-3 items-start gap-2 border-b pb-3">
            <p className="text-muted-foreground text-sm">Owner Name</p>
            <p className="col-span-2 font-medium text-foreground text-sm">{company.owner_name}</p>
          </div>
          <div className="grid grid-cols-3 items-start gap-2 border-b pb-3">
            <p className="text-muted-foreground text-sm">Website</p>
            <p className="col-span-2 font-medium text-foreground text-sm">
              <a href={company.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {company.website}
              </a>
            </p>
          </div>
          <div className="grid grid-cols-3 items-start gap-2 border-b pb-3">
            <p className="text-muted-foreground text-sm">Address</p>
            <p className="col-span-2 font-medium text-foreground text-sm">{company.company_address}</p>
          </div>
          <div className="grid grid-cols-3 items-start gap-2">
            <p className="text-muted-foreground text-sm">Description</p>
            <p className="col-span-2 font-medium text-foreground text-sm leading-relaxed">{company.description}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DetailSheet;
