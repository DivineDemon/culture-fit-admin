import MDEditor from "@uiw/react-md-editor";
import { jsPDF } from "jspdf";
import { CircleAlert, Download, FileText, Loader2, Paperclip, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { truncateString } from "@/lib/utils";
import { useGetEmployeeFileQuery } from "@/store/services/employees";
import { Button } from "../ui/button";

interface EmployeeFile {
  id: string;
  file_name: string;
  file_url?: string;
  created_at?: string;
  file_data?: string;
}

interface EmployeeFileProps {
  id: string;
  company_id: string;
}

const EmployeeFile = ({ id, company_id }: EmployeeFileProps) => {
  const { data: files, isLoading, error } = useGetEmployeeFileQuery({ id, company_id }, { skip: !id || !company_id });

  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<EmployeeFile | null>(null);

  const handleOpenModal = (file: EmployeeFile) => {
    setSelectedFile(file);
    setOpen(true);
  };

  const handleDownloadPDF = (file: EmployeeFile) => {
    try {
      if (!file.file_data) {
        toast.error("No content available for this file.");
        return;
      }

      const pdf = new jsPDF({
        orientation: "p",
        unit: "pt",
        format: "a4",
      });

      const lines = pdf.splitTextToSize(file.file_data, 500);
      pdf.text(lines, 50, 60);
      pdf.save(`${file.file_name || "document"}.pdf`);

      toast.success("PDF downloaded successfully!");
    } catch (_error) {
      toast.error("Failed to download PDF. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-2xl border">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-2xl border">
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
          <CardTitle className="font-semibold text-primary text-xl">Employee Documents</CardTitle>
        </CardHeader>
        <CardContent className="h-full space-y-4 overflow-y-scroll">
          <div className="flex flex-col items-start gap-2.5">
            {files && files.length > 0 ? (
              files.map((file: EmployeeFile, idx: number) => (
                <div key={file.id ?? idx} className="flex w-full items-center justify-center gap-2.5 border-b pb-3">
                  <div className="size-10 rounded-full bg-primary p-2 text-white">
                    <FileText className="size-full" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{truncateString(file.file_name, 20)}</h3>
                    <p className="text-muted-foreground text-xs">
                      Uploaded on {new Date(file.created_at || "").toLocaleDateString()}
                    </p>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => handleOpenModal(file)}>
                    <Paperclip className="size-4 text-muted-foreground" />
                  </Button>
                </div>
              ))
            ) : (
              <p className="flex h-full w-full flex-col items-center justify-center text-muted-foreground">
                <CircleAlert className="size-8 text-primary" />
                No documents found.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex max-h-[85vh] w-screen-xl flex-col p-0">
          {/* Header */}
          <DialogHeader className="flex flex-row items-center justify-between border-b px-6 py-4">
            <DialogTitle className="font-semibold text-lg">{selectedFile?.file_name || "Document Preview"}</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 py-4" data-color-mode="light">
            {selectedFile?.file_data ? (
              <MDEditor.Markdown
                source={selectedFile.file_data}
                style={{
                  backgroundColor: "transparent",
                  fontSize: 14,
                  color: "var(--muted-foreground)",
                }}
              />
            ) : (
              <div className="flex h-40 items-center justify-center text-muted-foreground">
                <Loader2 className="mr-2 size-5 animate-spin" />
                Loading file content...
              </div>
            )}
          </div>

          <div className="flex justify-end border-t bg-background px-6 py-4">
            <Button variant="default" onClick={() => selectedFile && handleDownloadPDF(selectedFile)}>
              <Download className="mr-2 size-4" /> Download PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmployeeFile;
