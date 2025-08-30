"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";

import { useState } from "react";
import { set } from "zod";

const OtpModal = ({accountId,email}:{accountId: string;
  email: string;
}) => {
  const [open, setOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement> ) => {
    e.preventDefault();
    setIsLoading(true);

    try{



    }catch(error){
      console.log( 'Failed to verify otp',error);

  }
  setIsLoading(false);
};
  const handleResend = async () => {
    // Logic to resend OTP
    console.log("Resend OTP");
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader className="relative flex justify-center">

          <AlertDialogTitle className="h2 text-center">Enter Your OTP<Image src="/assets/icon/close-dark.svg" alt="close" width={20} height={20}
           onClick={() => setOpen(false)}  className="otp-close-button"
           /> 
           </AlertDialogTitle>
          <AlertDialogDescription className="subtitle-2 text-center text-light-100">
            We have sent a 6-digit OTP to your email: <span className="pl-1 text-brand">{email}</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <InputOTP maxLength={6} value = password>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpModal;
    