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
import { Calendar, LogOut, Moon, Plus, Sun, User } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { DialogTitle, DialogDescription } from "./ui/dialog";
import { VisuallyHidden } from "./ui/visually-hidden";
import { useTheme } from "next-themes";

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
  const { theme, setTheme } = useTheme();

  const navigateAndCloseDialog = useCallback(
    (path: string) => {
      router.push(path);
      setOpen(false);
    },
    [router]
  );

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
            case "d":
              e.preventDefault();
              setTheme(theme === "light" ? "dark" : "light");
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
  }, [router, theme, setTheme]); 

  const handleSignOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
    router.push("/login");
    router.refresh();
  };

  const handleSelect = useCallback((value: string) => {
    switch (value) {
      case 'new':
        navigateAndCloseDialog('/new');
        break;
      case 'events':
        navigateAndCloseDialog('/events');
        break;
      case 'account':
        navigateAndCloseDialog('/account');
        break;
      case 'theme':
        setTheme(theme === 'light' ? 'dark' : 'light');
        setOpen(false);
        break;
      case 'logout':
        handleSignOut();
        break;
    }
  }, [navigateAndCloseDialog, setTheme, theme, handleSignOut]);

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
          <CommandItem onSelect={() => handleSelect('new')}>
            <Plus className="mr-2 h-4 w-4" />
            <span>New</span>
            <CommandShortcut>N</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect('events')}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Events</span>
            <CommandShortcut>E</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect('account')}>
            <User className="mr-2 h-4 w-4" />
            <span>Account</span>
            <CommandShortcut>A</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect('theme')}>
            {theme === "dark" ? (
              <Sun className="mr-2 h-4 w-4" />
            ) : (
              <Moon className="mr-2 h-4 w-4" />
            )}
            <span>Theme</span>
            <CommandShortcut>D</CommandShortcut>
          </CommandItem>
          <CommandSeparator />
          <CommandItem onSelect={() => handleSelect('logout')}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <CommandShortcut>O</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}