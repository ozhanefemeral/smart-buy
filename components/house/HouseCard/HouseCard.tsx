"use client";
import * as React from "react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { House } from "@/components/house";

export function HouseCard({ house }: { house: House }) {
  const route = useRouter();

  const goToHouse = () => {
    route.push(`/houses/${house.id}`);
  };

  return (
    <Card className="flex w-[350px] flex-col">
      <CardHeader>
        <Image
          src="placeholder.svg"
          alt="House Image"
          width={350}
          height={200}
          className="rounded-md"
        />
        <CardTitle className="pt-2">{house.title}</CardTitle>
        <CardDescription>{house.city + ", " + house.district}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex items-end justify-between space-x-4">
        <p>{house.price}</p>
        <Button onClick={goToHouse}>See Details</Button>
      </CardFooter>
    </Card>
  );
}
