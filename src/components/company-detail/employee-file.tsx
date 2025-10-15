import {
  CircleAlert,
  FileIcon,
  FileText,
  Loader2,
  Paperclip,
  TriangleAlert,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { truncateString } from "@/lib/utils";
import { useGetEmployeeFileQuery } from "@/store/services/employees";
import type { RootState } from "@/types/global";
import DocumentViewer from "../document-viewer";
import { Button } from "../ui/button";

interface EmployeeFileProps {
  id: string;
  name: string;
  company_id: string;
}

const EmployeeFile = ({ id, name, company_id }: EmployeeFileProps) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<EmployeeFile | null>(null);
  const [interviewContent, setInterviewContent] = useState<string>("");
  const [isLoadingInterview, setIsLoadingInterview] = useState(false);
  const { mode, selectedCompany } = useSelector(
    (state: RootState) => state.global
  );

  const {
    data: files,
    isLoading,
    error,
  } = useGetEmployeeFileQuery({ id, company_id }, { skip: !id || !company_id });

  // Function to match candidate name with markdown file
  const getInterviewFileName = useCallback(
    (candidateName: string): string | null => {
      // Convert name to match file naming pattern: "FirstName_LastName_Interview.md"
      const nameParts = candidateName.trim().split(" ");
      if (nameParts.length >= 2) {
        const firstName = nameParts[0];
        const lastName = nameParts[nameParts.length - 1];
        return `${firstName}_${lastName}_Interview.md`;
      }
      return null;
    },
    []
  );

  // Function to fetch markdown content
  const fetchInterviewContent = useCallback(async (fileName: string) => {
    setIsLoadingInterview(true);
    try {
      const response = await fetch(`/${fileName}`);
      if (response.ok) {
        const content = await response.text();
        setInterviewContent(content);
      } else {
        setInterviewContent("");
      }
    } catch (_error) {
      setInterviewContent("");
    } finally {
      setIsLoadingInterview(false);
    }
  }, []);

  // Check for interview file when component mounts or name changes
  useEffect(() => {
    if (name && mode === "candidates") {
      const fileName = getInterviewFileName(name);
      if (fileName) {
        fetchInterviewContent(fileName);
      }
    } else {
      setInterviewContent("");
    }
  }, [name, mode, fetchInterviewContent, getInterviewFileName]);

  const handleOpenModal = (file: EmployeeFile) => {
    setSelectedFile(file);
    setOpen(true);
  };

  const handleOpenInterviewModal = () => {
    if (interviewContent) {
      const interviewFile: EmployeeFile = {
        id: `interview-${name.replace(/\s+/g, "-").toLowerCase()}`,
        file_name: `${name} - Interview Transcript`,
        file_data: null,
        file_text: interviewContent,
        ai_summary: null,
        fit_score: null,
        recommendation: null,
        created_at: new Date().toISOString(),
        source: "ExtractedText",
      };
      setSelectedFile(interviewFile);
      setOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-2xl border py-10">
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
          <CardTitle className="font-semibold text-primary text-xl">
            {mode === "employees"
              ? "Employee Documents"
              : "Candidate Documents"}
          </CardTitle>
        </CardHeader>
        <CardContent className="h-full space-y-4 overflow-y-scroll">
          <div className="flex flex-col items-start gap-2.5">
            {/* Interview File for Candidates */}
            {mode === "candidates" && interviewContent && (
              <div className="flex w-full items-center justify-between gap-2.5 border-b pb-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-green-500 p-2 text-white">
                  <FileIcon className="size-full" />
                </div>

                <div className="flex-1">
                  <h3 className="font-medium text-sm">
                    Interview Transcript - {name}
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    Culture-fit interview questions and responses
                  </p>
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleOpenInterviewModal}
                >
                  <Paperclip className="size-4 text-muted-foreground" />
                </Button>
              </div>
            )}

            {/* Loading state for interview */}
            {mode === "candidates" && isLoadingInterview && (
              <div className="flex w-full items-center justify-center gap-2.5 border-b pb-3">
                <Loader2 className="size-4 animate-spin text-primary" />
                <p className="text-muted-foreground text-sm">
                  Loading interview transcript...
                </p>
              </div>
            )}

            {/* Regular Files */}
            {files && files.length > 0 ? (
              files.map((file: EmployeeFile, idx: number) => (
                <div
                  key={idx}
                  className="flex w-full items-center justify-between gap-2.5 border-b pb-3"
                >
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary p-2 text-white">
                    <FileText className="size-full" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium text-sm">
                      {file.source === "CandidateCultureReport"
                        ? `Culture Fit Report - ${name} - ${selectedCompany}`
                        : truncateString(file?.file_name, 28)}
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      Uploaded on&nbsp;
                      {file?.created_at
                        ? new Date(file?.created_at).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleOpenModal(file)}
                  >
                    <Paperclip className="size-4 text-muted-foreground" />
                  </Button>
                </div>
              ))
            ) : !interviewContent && mode === "candidates" ? (
              <p className="flex h-full w-full flex-col items-center justify-center text-muted-foreground">
                <CircleAlert className="size-8 text-primary" />
                No documents found.
              </p>
            ) : mode === "employees" && (!files || files.length === 0) ? (
              <p className="flex h-full w-full flex-col items-center justify-center text-muted-foreground">
                <CircleAlert className="size-8 text-primary" />
                No documents found.
              </p>
            ) : null}
          </div>
        </CardContent>
      </Card>
      <DocumentViewer
        open={open}
        document={selectedFile?.file_data || selectedFile?.file_text || ""}
        documentName={selectedFile?.file_name || ""}
        setOpen={setOpen}
      />
    </>
  );
};

export default EmployeeFile;
