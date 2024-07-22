"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Calendar, LogOut, Plus, User } from "lucide-react";

import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function UserNav({ guest }: { guest: any }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "u") {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-pink-300">
              {guest.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {guest.full_name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {guest.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/new">
            <DropdownMenuItem className="cursor-pointer justify-between">
              <div className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                <span>New</span>
              </div>
              <p className="text-xs text-muted-foreground">N</p>
            </DropdownMenuItem>
          </Link>
          <Link href="/events">
            <DropdownMenuItem className="cursor-pointer justify-between">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Events</span>
              </div>
              <p className="text-xs text-muted-foreground">E</p>
            </DropdownMenuItem>
          </Link>
          <Link href="/account">
            <DropdownMenuItem className="cursor-pointer justify-between">
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Account</span>
              </div>
              <p className="text-xs text-muted-foreground">A</p>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer justify-between"
          onClick={handleSignOut}
        >
          <div className="flex items-center">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </div>
          <p className="text-xs text-muted-foreground">O</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}