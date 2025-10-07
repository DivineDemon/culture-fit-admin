import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { employeesSchema } from "@/lib/form-schemas";
import { usePostEmployeeMutation, useUpdateEmployeeMutation } from "@/store/services/employees";
import type { RootState } from "@/types/global";
import UploadModal from "../file-uploader";
import { Switch } from "../ui/switch";

interface EmployeeSheetProps {
  id?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  employee?: {
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
  companyId: string;
}

const EmployeeSheet = ({ id, open, setOpen, employee, companyId }: EmployeeSheetProps) => {
  const [postEmployee, { isLoading }] = usePostEmployeeMutation();
  const [updateEmployee, { isLoading: isLoadingUpdate }] = useUpdateEmployeeMutation();
  const mode = useSelector((state: RootState) => state.global.mode);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpload = (files: File[]) => {
    setUploadedFiles(files);
    form.setValue("files", files);
  };

  const form = useForm<z.infer<typeof employeesSchema>>({
    resolver: zodResolver(employeesSchema),
    defaultValues: {
      name: "",
      email: "",
      salary: 0,
      is_candidate: mode === "employees" ? true : false,
      is_role_model: false,
      date_of_birth: "",
      user_phone_number: "",
      user_designation: "",
      department: "",
      password: "",
      files: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof employeesSchema>) => {
    if (id) {
      const response = await updateEmployee({
        id,
        company_id: companyId,
        data: {
          ...data,
          company_id: companyId,
          files: uploadedFiles,
          password: data.password || null,
          date_of_birth: data.date_of_birth || null,
          user_phone_number: data.user_phone_number || null,
          user_designation: data.user_designation || null,
          department: data.department || null,
          is_candidate: data.is_candidate || false,
          is_role_model: data.is_role_model || false,
          salary: Number(data.salary),
        },
      });

      if (response.data) {
        toast.success("Employee Updated Successfully!");
      } else {
        toast.error("Something went wrong, Please try again!");
      }
      setOpen(false);
      return;
    }

    const response = await postEmployee({
      id: companyId,
      data: {
        ...data,
        company_id: companyId,
        files: uploadedFiles,
        password: data.password || null,
        date_of_birth: data.date_of_birth || null,
        user_phone_number: data.user_phone_number || null,
        user_designation: data.user_designation || null,
        department: data.department || null,
        is_candidate: data.is_candidate || false,
        is_role_model: data.is_role_model || false,
        salary: Number(data.salary),
      },
    });

    if (response) {
      toast.success("Employee Created Successfully!");
    } else {
      toast.error("Something went wrong, Please try again!");
    }
    setOpen(false);
  };

  useEffect(() => {
    if (id && employee) {
      form.reset({
        name: employee.name,
        email: employee.email,
        salary: employee.salary,
        password: employee.password || "",
        is_candidate: employee.is_candidate ?? (mode === "employees" ? true : false),
        is_role_model: employee.is_role_model,
        date_of_birth: employee.date_of_birth || "",
        user_phone_number: employee.user_phone_number || "",
        user_designation: employee.user_designation || "",
        department: employee.department || "",
        files: [],
      });
    }
  }, [id, employee, form, mode]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {id ? "Edit" : "Add"}
            {mode === "employees" ? " Candidate" : " Employee"}
          </SheetTitle>
          <SheetDescription>
            {id
              ? `Update ${mode === "employees" ? "candidate" : "employee"} details`
              : `Add a new ${mode === "employees" ? "candidate" : "employee"} to your account`}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 overflow-auto px-4 pb-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Full Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="employee@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="user_phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+92 300 1234567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input placeholder="HR / IT / Marketing" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="user_designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input placeholder="Developer / Team Lead" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Salary <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="50000"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {mode === "employees" && (
              <FormField
                control={form.control}
                name="is_candidate"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <FormLabel>Is Candidate?</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {mode === "candidates" && (
              <FormField
                control={form.control}
                name="is_role_model"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <FormLabel>Is Role Model?</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" className="mt-auto w-full" disabled={isLoading || isLoadingUpdate}>
              {isLoading || isLoadingUpdate ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  {id ? "Edit" : "Add"} {mode === "employees" ? "Candidate" : "Employee"}
                </>
              )}
            </Button>
          </form>
          <UploadModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onUpload={handleUpload}
            companyId={companyId}
            employeeId={id || ""}
          />
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default EmployeeSheet;
