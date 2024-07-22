"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./ui/command";
import { Calendar, LogOut, Plus, User } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { DialogTitle, DialogDescription } from "./ui/dialog";
import { VisuallyHidden } from "./ui/visually-hidden";

const isTyping = () => {
  const activeElement = document.activeElement;
  return (
    activeElement instanceof HTMLInputElement ||
    activeElement instanceof HTMLTextAreaElement ||
    (activeElement instanceof HTMLElement && activeElement.isContentEditable)
  );
};

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const navigateAndCloseDialog = useCallback((path: string) => {
    router.push(path);
    setOpen(false);
  }, [router]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (!isTyping()) {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((open) => !open);
        } else {
          switch (e.key.toLowerCase()) {
            case "n":
              e.preventDefault();
              navigateAndCloseDialog("/new");
              break;
            case "e":
              e.preventDefault();
              navigateAndCloseDialog("/events");
              break;
            case "a":
              e.preventDefault();
              navigateAndCloseDialog("/account");
              break;
            case "o":
              e.preventDefault();
              handleSignOut();
              break;
            default:
              break;
          }
        }
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [router]);

  const handleSignOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const handleSelect = useCallback((value: React.ReactNode) => {
    if (typeof value === 'string') {
      switch (value) {
        case "new":
          navigateAndCloseDialog("/new");
          break;
        case "events":
          navigateAndCloseDialog("/events");
          break;
        case "account":
          navigateAndCloseDialog("/account");
          break;
        case "logout":
          handleSignOut();
          break;
      }
    }
    setOpen(false);
  }, [navigateAndCloseDialog, handleSignOut]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <DialogTitle asChild>
        <VisuallyHidden>Command Menu</VisuallyHidden>
      </DialogTitle>
      <DialogDescription asChild>
        <VisuallyHidden>
          Use this menu to quickly access various features of the application.
        </VisuallyHidden>
      </DialogDescription>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          <CommandItem onSelect={() => handleSelect("new")}>
            <Plus className="mr-2 h-4 w-4" />
            <span>New</span>
            <CommandShortcut>N</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("events")}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Events</span>
            <CommandShortcut>E</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("account")}>
            <User className="mr-2 h-4 w-4" />
            <span>Account</span>
            <CommandShortcut>A</CommandShortcut>
          </CommandItem>
          <CommandSeparator />
          <CommandItem onSelect={() => handleSelect("logout")}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <CommandShortcut>O</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}