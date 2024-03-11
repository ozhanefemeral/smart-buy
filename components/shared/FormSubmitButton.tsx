"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { LoadingCircle } from "./icons";

interface FormSubmitButtonProps {
  pendingText?: string;
  text?: string;
}

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  pendingText = "Saving...",
  text = "Save",
}) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending && <LoadingCircle className="mr-2" />}
      {pending ? pendingText : text}
    </Button>
  );
};
