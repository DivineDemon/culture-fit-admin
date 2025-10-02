import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
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
  const { mode } = useSelector((state: RootState) => state.global);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setUploadedFiles(acceptedFiles);
        form.setValue("files", acceptedFiles);
      }
    },
    multiple: true,
    accept: { "application/pdf": [] },
  });

  const form = useForm<z.infer<typeof employeesSchema>>({
    resolver: zodResolver(employeesSchema),
    defaultValues: {
      name: "",
      email: "",
      salary: 0,
      is_candidate: false,
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
          password: "",
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
        password: "",
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
        is_candidate: employee.is_candidate,
        is_role_model: employee.is_role_model,
        date_of_birth: employee.date_of_birth || "",
        user_phone_number: employee.user_phone_number || "",
        user_designation: employee.user_designation || "",
        department: employee.department || "",
        password: "",
        files: [],
      });
    }
  }, [id, employee, form]);

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
            {/* Full Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="employee@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
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

            {/* Date of Birth */}
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

            {/* Phone Number */}
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

            {/* Department */}
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

            {/* Designation */}
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

            {/* Salary */}
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary *</FormLabel>
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

            {/* Candidate Toggle */}
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

            {/* Role Model Toggle */}
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

            {/* File Upload */}
            <FormField
              control={form.control}
              name="files"
              render={() => (
                <FormItem>
                  <FormLabel>Employee Documents</FormLabel>
                  <div
                    {...getRootProps()}
                    className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-border border-dashed bg-muted/30 px-5 py-10 text-center transition hover:bg-muted/50"
                  >
                    <input {...getInputProps()} />
                    {uploadedFiles.length > 0 ? (
                      uploadedFiles.map((file, i) => (
                        <span key={i} className="font-medium text-primary">
                          {file.name}
                        </span>
                      ))
                    ) : isDragActive ? (
                      <span>Drop files here...</span>
                    ) : (
                      <>
                        <span>Drag & Drop your PDF files here</span>
                        <span className="text-muted-foreground text-sm">Only .pdf files are allowed</span>
                      </>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button type="submit" className="mt-auto w-full" disabled={isLoading || isLoadingUpdate}>
              {isLoading || isLoadingUpdate ? (
                <Loader2 className="size-4 animate-spin" />
              ) : id ? (
                "Update Employee"
              ) : (
                "Add Employee"
              )}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default EmployeeSheet;
