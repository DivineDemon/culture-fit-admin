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
import { Textarea } from "@/components/ui/textarea";
import { companySchema } from "@/lib/form-schemas";
import { usePostCompanyMutation, useUpdateCompanyMutation } from "@/store/services/company";
import type { CompanyFile } from "@/types";

interface CompanySheetProps {
  id?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  company?: {
    company_name: string;
    company_email: string;
    password?: string;
    owner_name?: string;
    owner_email?: string;
    company_type?: string;
    company_website?: string;
    phone_number?: string;
    company_address?: string;
    company_description?: string;
    files?: CompanyFile[];
  };
}

const CompanySheet = ({ id, open, setOpen, company }: CompanySheetProps) => {
  const [postCompany, { isLoading }] = usePostCompanyMutation();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [updateCompany, { isLoading: isLoadingUpdate }] = useUpdateCompanyMutation();

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
  });

  const onSubmit = async (data: z.infer<typeof companySchema>) => {
    if (id) {
      const response = await updateCompany({
        id,
        data: {
          ...data,
          id: id,
          company_name: data.company_name ?? "",
          company_email: data.company_email ?? "",
          password: data.password ?? "",
          owner_name: data.owner_name ?? "",
          owner_email: data.owner_email ?? "",
          company_website: data.company_website ?? "",
          company_type: data.company_type ?? "",
          phone_number: data.phone_number ?? "",
          company_address: data.company_address ?? "",
          company_description: data.company_description ?? "",
          policy_document: uploadedFile ?? undefined, // File for backend
          policy_file_name: data.policy_file_name ?? "", // Always send filename (old or new)
        },
      });
      if (response.data) {
        toast.success("Company Updated Successfully!");
      } else {
        toast.error("Something went wrong, Please try again!");
      }
      setOpen(false);
      return;
    }

    const response = await postCompany({
      ...data,
      company_website: data.company_website ?? "",
      company_email: data.company_email ?? "",
      company_name: data.company_name ?? "",
      company_type: data.company_type ?? "",
      owner_name: data.owner_name ?? "",
      owner_email: data.owner_email ?? "",
      phone_number: data.phone_number ?? "",
      company_address: data.company_address ?? "",
      company_description: data.company_description ?? "",
      password: data.password ?? "",
      policy_document: uploadedFile ?? undefined, // ✅ send actual File
      policy_file_name: uploadedFile?.name ?? undefined, // ✅ send file name
    });

    if (response.data?.id) {
      toast.success("Company Created Successfully!");
    } else {
      toast.error("Something went wrong, Please try again!");
    }

    setOpen(false);
  };

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   onDrop: (acceptedFiles) => {
  //     if (acceptedFiles.length > 0) {
  //       setUploadedFile(acceptedFiles[0]);
  //     }
  //   },
  //   multiple: false,
  //   accept: {
  //     "application/pdf": [],
  //   },
  // });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setUploadedFile(file);
        form.setValue("policy_document", file); // ✅ actual File
        form.setValue("policy_file_name", file.name); // ✅ filename
      }
    },
    multiple: false,
    accept: { "application/pdf": [] },
  });

  // useEffect(() => {
  //   if (company) {
  //     form.setValue("company_name", company.company_name);
  //     form.setValue("company_email", company.company_email);
  //     form.setValue("password", company.password ?? "");
  //     form.setValue("owner_name", company.owner_name ?? "");
  //     form.setValue("owner_email", company.owner_email ?? "");
  //     form.setValue("company_type", company.company_type ?? "");
  //     form.setValue("company_website", company.company_website ?? "");
  //     form.setValue("phone_number", company.phone_number ?? "");
  //     form.setValue("company_address", company.company_address ?? "");
  //     form.setValue("company_description", company.company_description ?? "");

  //     if (uploadedFile) {
  //       form.setValue("policy_document", uploadedFile.name);
  //       form.setValue("policy_file_name", uploadedFile.name);
  //     }
  //   }
  // }, [company, form, uploadedFile]);

  useEffect(() => {
    if (company) {
      form.reset({
        company_name: company.company_name,
        company_email: company.company_email,
        password: company.password ?? "",
        owner_name: company.owner_name ?? "",
        owner_email: company.owner_email ?? "",
        company_type: company.company_type ?? "",
        company_website: company.company_website ?? "",
        phone_number: company.phone_number ?? "",
        company_address: company.company_address ?? "",
        company_description: company.company_description ?? "",
        policy_file_name: company?.files?.[0]?.file_name ?? undefined,
      });
    }
  }, [company, form]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{id ? "Edit" : "Add"} Company</SheetTitle>
          <SheetDescription>{id ? "Update company details" : "Add a new company to your account"}</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full flex-col gap-5 overflow-auto px-4 pb-6">
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Company Name<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="xyz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="example@gmail.com" {...field} />
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
                  <FormLabel>
                    Password<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="xyz@123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="owner_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Owner Name<span className="text-destructive">*</span>
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
              name="owner_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Owner Email<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Company" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="www.xyz.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(123) 456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Company Address<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, New York, NY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter company description" className="h-36 resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="policy_document"
              render={() => (
                <FormItem>
                  <FormLabel>Company Policy Document</FormLabel>
                  <div
                    {...getRootProps()}
                    className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-border border-dashed bg-muted/30 px-5 py-10 text-center transition hover:bg-muted/50"
                  >
                    <input
                      className="hidden" // hide the native input, UI handled via drop area
                      {...getInputProps({
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setUploadedFile(file);
                            form.setValue("policy_document", file); // ✅ File
                            form.setValue("policy_file_name", file.name); // ✅ filename
                          }
                        },
                      })}
                    />

                    {uploadedFile ? (
                      <span className="max-w-[200px] truncate font-medium text-primary text-sm sm:max-w-[300px] sm:text-base">
                        {uploadedFile.name}
                      </span>
                    ) : form.watch("policy_file_name") ? (
                      <span className="max-w-[200px] truncate font-medium text-primary text-sm sm:max-w-[300px] sm:text-base">
                        {form.watch("policy_file_name")}
                      </span>
                    ) : isDragActive ? (
                      <span className="font-medium text-sm sm:text-base">Drop the file here...</span>
                    ) : (
                      <>
                        <span className="font-medium text-sm sm:text-base">Drag & Drop your policy file here</span>
                        <span className="text-muted-foreground text-xs sm:text-sm">Only .pdf files are allowed</span>
                      </>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isLoading || isLoadingUpdate ? (
              <Button type="submit" variant="default" className="flex items-center justify-center">
                <Loader2 className="size-4 animate-spin" />
              </Button>
            ) : (
              <Button type="submit" className="w-full" disabled={isLoading || isLoadingUpdate} variant="default">
                {id ? "Update Company" : "Add Company"}
              </Button>
            )}
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default CompanySheet;
