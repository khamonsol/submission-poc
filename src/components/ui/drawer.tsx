"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Drawer({ className, children, ...props }: DrawerProps) {
  return (
    <div className={cn("fixed inset-0 z-50", className)} {...props}>
      {children}
    </div>
  );
}

export function DrawerTrigger({ className, children, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn("", className)} {...props}>
      {children}
    </button>
  );
}

export function DrawerContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("bg-background fixed inset-x-0 bottom-0 mt-24 flex h-auto flex-col rounded-t-[10px] border", className)} {...props}>
      {children}
    </div>
  );
}

export function DrawerHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props}>
      {children}
    </div>
  );
}

export function DrawerFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props}>
      {children}
    </div>
  );
}

export function DrawerTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props}>
      {children}
    </h3>
  );
}

export function DrawerDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}