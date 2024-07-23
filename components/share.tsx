"use client";

import { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const url = siteConfig.url + "/" + event.event_url;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast({
          description: "Copied to clipboard",
        });
        setIsOpen(false);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          description: "Unable to copy to clipboard",
        });
        console.error("Unable to copy text: ", err);
      });
  };

  const handleShare = () => {
    if (isMobile && navigator.share) {
      navigator.share({
        title: 'Share Event',
        text: 'Check out this event!',
        url: url,
      }).catch(console.error);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <Button variant="ghost" className="m-1" onClick={handleShare}>
        <span className="hidden sm:inline text-sm mr-2">Share</span>
        <ShareIcon className="h-5 w-5 md:h-4 md:w-4" />
      </Button>

      {!isMobile && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
      )}
    </>
  );
}