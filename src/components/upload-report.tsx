import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { RootState } from "@/types/global";
import { Input } from "./ui/input";

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => void;
  companyId?: string;
  employeeId?: string;
}

const UploadReport = ({ open, onClose, companyId, employeeId }: UploadModalProps) => {
  const [fileText, setFileText] = useState("");
  const { token } = useSelector((state: RootState) => state.global);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("https://culture-fit-backend.vercel.app/candidate-culture-report/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: employeeId,
        company_id: companyId,
        file_text: fileText,
        ai_summary: fileText,
      }),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-semibold text-lg">Upload Files</DialogTitle>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <Input type="text" onChange={(e) => setFileText(e.target.value)} value={fileText} />
          <Button type="submit">Upload</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadReport;
