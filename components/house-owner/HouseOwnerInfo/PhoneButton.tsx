"use client";
import { Button } from "@/components/ui/button";

type Props = {
  phone: string;
  isLogged: boolean;
};

export const PhoneButton: React.FC<Props> = ({ phone, isLogged }) => {
  return (
    <>
      {isLogged ? (
        <Button className="w-full" asChild>
          <a href={`tel:${phone}`}>Phone</a>
        </Button>
      ) : (
        <Button disabled className="w-full">
          Phone
        </Button>
      )}
    </>
  );
};
