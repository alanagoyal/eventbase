"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Moon, Sun } from "lucide-react";
import { menuItems, MenuItem } from "@/utils/menu";

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
import { useTheme } from "next-themes";

export default function UserNav({ guest }: { guest: any }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

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
          {menuItems.map((item: MenuItem) => (
            item.href ? (
              <Link href={item.href} key={item.label}>
                <DropdownMenuItem className="cursor-pointer justify-between">
                  <div className="flex items-center">
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.shortcut}</p>
                </DropdownMenuItem>
              </Link>
            ) : (
              <DropdownMenuItem
                key={item.label}
                className="cursor-pointer justify-between"
                onClick={item.action === "theme" 
                  ? () => setTheme(theme === "light" ? "dark" : "light")
                  : item.action === "logout" ? handleSignOut : undefined}
              >
                <div className="flex items-center">
                  {item.action === "theme" ? (
                    theme === "light" ? (
                      <Moon className="mr-2 h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Sun className="mr-2 h-4 w-4" aria-hidden="true" />
                    )
                  ) : (
                    <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                  )}
                  <span>{item.label}</span>
                </div>
                <p className="text-xs text-muted-foreground">{item.shortcut}</p>
              </DropdownMenuItem>
            )
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}