"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

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
      {pending ? pendingText : text}
    </Button>
  );
};
