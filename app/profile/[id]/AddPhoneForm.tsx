"use client";

import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { savePhoneNumber } from "./actions";
import { FormSubmitButton } from "@/components/shared/FormSubmitButton";

export const AddPhoneForm = ({ user }: { user: User }) => {
  const router = useRouter();

  // savePhoneNumber returns a User object if successful, or an object with errors if not
  const [state, formAction] = useFormState(savePhoneNumber, {
    phone: "",
  });
  const hasErrors = !!state.errors;

  useEffect(() => {
    if (state.phone) {
      router.refresh();
    }
  }, [router, state.phone]);

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="email" value={user.email || undefined} />
        <div className="ml-auto flex flex-col items-end justify-between gap-y-2">
          {hasErrors && (
            <ul className="mr-auto text-red-500">
              {Object.entries(state.errors).map(([key, value]) => (
                <li key={key}>
                  <strong className="capitalize">{key}</strong>: {String(value)}
                </li>
              ))}
            </ul>
          )}
          <Input placeholder="Phone number" name="phone" />
          <FormSubmitButton />
        </div>
      </form>
    </>
  );
};
