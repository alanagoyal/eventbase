import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-16">
    <div className="w-full max-w-md flex flex-col space-y-6 p-4">
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
          Uh oh! An error occurred
        </h1>
        <Link href="/">
          <Button variant="outline">Back Home</Button>
        </Link>
      </div>
    </div>
  </div>
  );
}