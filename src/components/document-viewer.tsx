import MDEditor from "@uiw/react-md-editor";
import { Download } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface DocumentViewerProps {
  open: boolean;
  document: string;
  documentName: string;
  setOpen: (open: boolean) => void;
}

const DocumentViewer = ({ open, document, documentName, setOpen }: DocumentViewerProps) => {
  const { theme } = useTheme();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex max-h-[85vh] w-screen-xl flex-col p-0">
        <DialogHeader className="flex flex-row items-center justify-between border-b px-6 py-4">
          <DialogTitle className="font-semibold text-lg">{documentName || "Document"}</DialogTitle>
        </DialogHeader>
        <div
          id="markdown-preview"
          className="flex-1 overflow-y-auto px-6 py-4"
          data-color-mode={theme === "dark" ? "dark" : "light"}
        >
          <div className="markdown-content">
            <MDEditor.Markdown
              source={document}
              style={{
                backgroundColor: "transparent",
                fontSize: 14,
                color: "inherit",
              }}
            />
          </div>
        </div>
        <div className="flex justify-end border-t bg-background px-6 py-4">
          <Button variant="default">
            <Download /> Download PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewer;
