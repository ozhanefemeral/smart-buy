"use client";
import { Button } from "@/components/ui/button";
import { PhoneIcon } from "lucide-react";

type Props = {
  phone: string;
  isLogged: boolean;
};

export const PhoneButton: React.FC<Props> = ({ phone, isLogged }) => {
  return (
    <>
      {isLogged ? (
        <Button className="w-full" asChild>
          <a href={`tel:${phone}`}>
            <PhoneIcon className="mr-2 h-4 w-4" />
            Call
          </a>
        </Button>
      ) : (
        <Button disabled className="w-full">
          <PhoneIcon className="mr-2 h-4 w-4" />
          Call
        </Button>
      )}
    </>
  );
};
