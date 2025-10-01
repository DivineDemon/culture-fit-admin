import {
  CircleAlert,
  Download,
  FileText,
  Loader2,
  TriangleAlert,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetPoliciesQuery,
  useLazyDownloadPolicyQuery,
} from "@/store/services/company";
import { Button } from "../ui/button";
import { truncateString } from "@/lib/utils";

const CulturePolicies = () => {
  const { id } = useParams<{ id: string }>();
  const [triggerDownload] = useLazyDownloadPolicyQuery();
  const { data, isLoading, error } = useGetPoliciesQuery(id!, {
    skip: !id,
  });

  const handleDownload = async (fileId: string, fileName: string) => {
    if (!id) return;
    try {
      const result = await triggerDownload({ id, file_id: fileId });
      const data = result.data;
      if (data !== undefined) {
        const url = window.URL.createObjectURL(data);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName || "document.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }
      toast.success("File Downloaded Successfully!");
    } catch (_e) {
      toast.error("Something went wrong, Please try again!");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[618px] w-full items-center justify-center rounded-2xl border">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[618px] w-full items-center justify-center rounded-2xl border">
        <p className="flex flex-col items-center justify-center gap-2.5 text-muted-foreground">
          <TriangleAlert className="size-8 text-destructive" />
          Something went wrong
        </p>
      </div>
    );
  }

  return (
    <Card className="h-full w-full shadow-none">
      <CardHeader>
        <CardTitle className="font-semibold text-primary text-xl">
          Company Documents
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[618px] space-y-4 overflow-y-scroll">
        <div className="flex flex-col items-start gap-2.5">
          {data && data.length > 0 ? (
            data.map((policy, idx: number) => (
              <div
                key={policy.id ?? idx}
                className="flex w-full items-center justify-center gap-2.5 border-b pb-3"
              >
                <div className="size-10 rounded-full bg-primary p-2 text-white">
                  <FileText className="size-full" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">
                    {truncateString(policy.file_name, 35)}
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    {policy.description || "The policy about the company."}
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDownload(policy.id, policy.file_name)}
                >
                  <Download />
                </Button>
              </div>
            ))
          ) : (
            <p className="flex h-[618px] w-full flex-col items-center justify-center text-muted-foreground">
              <CircleAlert className="size-8 text-pri" />
              No documents found.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CulturePolicies;
