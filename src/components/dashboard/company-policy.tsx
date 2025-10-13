import { CircleAlert, FileText, Loader2, Paperclip, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { truncateString } from "@/lib/utils";
import { useGetPoliciesQuery } from "@/store/services/company";
import DocumentViewer from "../document-viewer";
import { Button } from "../ui/button";

interface Policy {
  id: string;
  file_name: string;
  file_data?: string;
}

const CulturePolicies = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const { data, isLoading, error } = useGetPoliciesQuery(id!, { skip: !id });

  const handleOpenModal = (policy: Policy) => {
    setSelectedPolicy(policy);
    setOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-2xl border lg:h-[618px]">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-2xl border lg:h-[618px]">
        <p className="flex flex-col items-center justify-center gap-2.5 text-muted-foreground">
          <TriangleAlert className="size-8 text-destructive" />
          Something went wrong
        </p>
      </div>
    );
  }

  return (
    <>
      <Card className="h-full w-full shadow-none">
        <CardHeader>
          <CardTitle className="font-semibold text-primary text-xl">Company Documents</CardTitle>
        </CardHeader>
        <CardContent className="h-full space-y-4 overflow-y-scroll lg:h-[618px]">
          <div className="flex flex-col items-start gap-2.5">
            {data && data.length > 0 ? (
              data.map((policy: Policy, idx: number) => (
                <div key={policy.id ?? idx} className="flex w-full items-center justify-center gap-2.5 border-b pb-3">
                  <div className="size-10 rounded-full bg-primary p-2 text-white">
                    <FileText className="size-full" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{truncateString(policy.file_name, 20)}</h3>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => handleOpenModal(policy)}>
                    <Paperclip className="size-4 text-muted-foreground" />
                  </Button>
                </div>
              ))
            ) : (
              <p className="flex h-full w-full flex-col items-center justify-center text-muted-foreground lg:h-[618px]">
                <CircleAlert className="size-8 text-primary" />
                No documents found.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      <DocumentViewer
        open={open}
        document={selectedPolicy?.file_data ?? ""}
        documentName={selectedPolicy?.file_name ?? ""}
        setOpen={setOpen}
      />
    </>
  );
};

export default CulturePolicies;
