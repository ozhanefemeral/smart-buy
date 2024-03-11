"use client";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { FormSubmitButton } from "@/components/shared/FormSubmitButton";
import { verifyPhoneNumber } from "../actions";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { ReloadIcon } from "@radix-ui/react-icons";

export function VerifyPhoneForm({ user }: { user: User }) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [state, formAction] = useFormState(verifyPhoneNumber, {
    otp: "",
  });

  const handleSendOtp = () => {
    setOtpTimer(60);

    const timer = setInterval(() => {
      setOtpTimer((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
    }, 60000);
  };

  useEffect(() => {
    if (state.phoneVerified) {
      router.refresh();
    }
  }, [router, state.phoneVerified]);

  return (
    <form action={formAction}>
      <input type="hidden" name="email" value={user.email || undefined} />
      <div className="flex flex-col gap-y-4">
        <InputOTP
          name="otp"
          maxLength={8}
          className="justify-between"
          onChange={(value) => setOtp(value)}
          value={otp}
          render={({ slots }) => (
            <>
              <InputOTPGroup>
                {slots.slice(0, 4).map((slot, index) => (
                  <InputOTPSlot key={index} {...slot} />
                ))}{" "}
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                {slots.slice(4).map((slot, index) => (
                  <InputOTPSlot key={index + 3} {...slot} />
                ))}
              </InputOTPGroup>
            </>
          )}
        />
        <div className="flex justify-end gap-x-4">
          <Button
            variant="secondary"
            disabled={otpTimer > 0}
            onClick={handleSendOtp}
            type="button"
            className="group"
          >
            {otpTimer === 0 && (
              <ReloadIcon className="mr-2 h-4 w-4 group-hover:animate-spin" />
            )}
            Send code {otpTimer > 0 && "- " + otpTimer}
          </Button>
          <FormSubmitButton pendingText="Verifying..." text="Verify" />
        </div>
      </div>
    </form>
  );
}
