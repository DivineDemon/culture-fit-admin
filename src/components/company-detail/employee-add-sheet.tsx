import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { employeesSchema } from "@/lib/form-schemas";
import { usePostEmployeeMutation, useUpdateEmployeeMutation } from "@/store/services/employees";

interface EmployeeSheetProps {
  id?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  employee?: {
    first_name: string;
    last_name: string;
    email: string;
    position: string;
    salary: number;
    is_candidate: boolean;
    files?: File[];
  };
  companyId: string;
}

const CompanySheet = ({ id, open, setOpen, employee, companyId }: EmployeeSheetProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [postEmployee, { isLoading }] = usePostEmployeeMutation();
  const [updateEmployee, { isLoading: isLoadingUpdate }] = useUpdateEmployeeMutation();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setUploadedFile(acceptedFiles[0]);
      }
    },
    multiple: false,
    accept: {
      "application/pdf": [],
    },
  });

  const form = useForm<z.infer<typeof employeesSchema>>({
    resolver: zodResolver(employeesSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      position: "",
      salary: 0,
      is_candidate: false,
      files: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof employeesSchema>) => {
    if (id) {
      const response = await updateEmployee({
        id,
        data: {
          ...data,
          files: data.files ?? [],
          is_candidate: data.is_candidate ?? false,
          salary: data.salary ?? 0,
          company_id: companyId,
          first_name: data.first_name ?? "",
          last_name: data.last_name ?? "",
          email: data.email ?? "",
          position: data.position ?? "",
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
        files: data.files ?? [],
        is_candidate: data.is_candidate ?? false,
        salary: data.salary ?? 0,
        company_id: companyId,
        first_name: data.first_name ?? "",
        last_name: data.last_name ?? "",
        email: data.email ?? "",
        position: data.position ?? "",
      },
    });

    if (response.data) {
      toast.success("Employee Created Successfully!");
    } else {
      toast.error("Something went wrong, Please try again!");
    }

    setOpen(false);
  };

  useEffect(() => {
    if (id && employee) {
      form.setValue("first_name", employee.first_name ?? "");
      form.setValue("last_name", employee.last_name ?? "");
      form.setValue("email", employee.email ?? "");
      form.setValue("position", employee.position ?? "");
      form.setValue("salary", employee.salary ?? 0);
      form.setValue("is_candidate", employee.is_candidate ?? false);
      form.setValue("files", employee.files ?? []);
    }
  }, [id, employee, form.setValue]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{id ? "Edit" : "Add"} Employee</SheetTitle>
          <SheetDescription>{id ? "Update employee details" : "Add a new employee to your account"}</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full flex-col gap-5 overflow-auto px-4 pb-6">
            {/* First Name */}
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    First Name<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="DigiMark Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Last Name<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="DigiMark Developer" {...field} />
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
                  <FormLabel>
                    Email<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="digimark@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Position */}
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Position<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Software Engineer" {...field} />
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
                  <FormLabel>
                    Salary<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Candidate Switch */}
            <FormField
              control={form.control}
              name="is_candidate"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Candidate</FormLabel>
                  </div>
                  <FormControl>
                    <div className="flex w-full items-center justify-end gap-2">
                      <span>No</span>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                      <span>Yes</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Files Upload */}
            <FormField
              control={form.control}
              name="files"
              render={() => (
                <FormItem>
                  <FormLabel>Company Policy Document</FormLabel>
                  <div
                    {...getRootProps()}
                    className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-border border-dashed bg-muted/30 px-5 py-10 text-center transition hover:bg-muted/50"
                  >
                    <input
                      {...getInputProps({
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setUploadedFile(file);
                            form.setValue("files", [URL.createObjectURL(file)]);
                          }
                        },
                      })}
                    />

                    {uploadedFile ? (
                      <span className="font-medium text-base text-primary">{uploadedFile.name}</span>
                    ) : isDragActive ? (
                      <span className="font-medium text-base">Drop the file here...</span>
                    ) : (
                      <>
                        <span className="font-medium text-base">Drag & Drop your policy file here</span>
                        <span className="text-muted-foreground text-sm">Only .pdf files are allowed</span>
                      </>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            {isLoading || isLoadingUpdate ? (
              <Button type="submit" variant="default" className="mt-auto flex items-center justify-center">
                <Loader2 className="size-4 animate-spin" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="mt-auto w-full"
                disabled={isLoading || isLoadingUpdate}
                variant="default"
              >
                {id ? "Update Employee" : "Add Employee"}
              </Button>
            )}
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default CompanySheet;
