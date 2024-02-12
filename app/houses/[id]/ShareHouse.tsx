"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ShareHouseCard() {
  const pathname = usePathname();
  const { toast } = useToast();

  const copyUrl = () => {
    const url = `${window.location.origin}${pathname}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied to clipboard",
      description: "You can now share this link with friends",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share with friends</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="outline" onClick={copyUrl} className="w-full">
          Copy URL
        </Button>
        <Toaster />
      </CardContent>
    </Card>
  );
}
