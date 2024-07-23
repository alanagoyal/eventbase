"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import { Database } from "@/types/supabase";
import { CopyIcon, ShareIcon } from "lucide-react";
import { siteConfig } from "@/config/site";

type Event = Database["public"]["Tables"]["events"]["Row"];

export function Share({ event }: { event: Event }) {
  const [isOpen, setIsOpen] = useState(false);
  const url = siteConfig.url + "/" + event.event_url;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast({
          description: "Copied to clipboard",
        });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          description: "Unable to copy to clipboard",
        });
        console.error("Unable to copy text: ", err);
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <span className="text-sm">Share</span>
          <ShareIcon className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-xl md:text-2xl font-semibold tracking-tight text-center sm:text-left">
          Share Event
        </DialogTitle>
        <DialogDescription className="text-center sm:text-left">
          Use the link below to invite guests to this event
        </DialogDescription>
        <div className="flex items-center">
          <Input id="link" defaultValue={url} readOnly className="h-9 flex-grow" />
          <Button type="button" size="sm" onClick={handleCopy} className="px-3 ml-2">
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
