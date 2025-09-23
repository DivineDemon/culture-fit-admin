import { Download, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";

const policies = [
  {
    title: "Innovation First",
    description: "We encourage creativity and innovative thinking in all aspects of work.",
  },
  {
    title: "Collaboration",
    description: "Teamwork and open communication are key to building a strong culture.",
  },
  {
    title: "Integrity",
    description: "We act with honesty, fairness, and transparency in all situations.",
  },
  {
    title: "Continuous Learning",
    description: "We support professional growth and learning for all team members.",
  },
  {
    title: "Work-Life Balance",
    description: "We value mental health and ensure balance between work and personal life.",
  },
];

const CulturePolicies = () => {
  return (
    <Card className="h-fit w-full shadow-none">
      <CardHeader>
        <CardTitle className="font-semibold text-primary text-xl">Company Documents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-start gap-2.5">
          {policies.map((policy, index) => (
            <div className="flex w-full items-center justify-center gap-2.5 border-b pb-3">
              <div className="size-10 rounded-full bg-primary p-2 text-white">
                <FileText className="size-full" />
              </div>
              <div key={index} className="flex-1">
                <h3 className="font-medium text-base">{policy.title}</h3>
                <p className="text-muted-foreground text-sm">{policy.description}</p>
              </div>
              <Button size="icon" variant="ghost">
                <Download />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CulturePolicies;
