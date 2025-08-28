"use client";
import Image from "next/image";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { error } from "console";
import Link from "next/link";

// ✅ Zod schema validation


// ✅ Form type
type FormType = "sign-in" | "sign-up";

const AuthFormSchema = (formType: FormType) => {
  return z.object(  {
    email: z.string().email(),
    fullname: formType === "sign-up" ? z.string().min(2).max(50) : z.string().optional(),

  });
};

const AuthForm = ({ type }: { type: FormType }) => {

  const[isloading, setIsLoading]= useState(false);
  const[errorMessage,setErrorMessage]=useState("");

  const formSchema = AuthFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",email:"",
    },
  });

  // 2. Define submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values
    // ✅ This will be type-safe and validated
    console.log(values);
  }

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
        <h1 className="form-title">
         { type==="sign-in" ? "Sign In" : "Sign Up"}
        </h1>
        {type === "sign-up" && (
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <div className="shad-form-item">
                <FormLabel className="shad-form-label">Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" className="shad-input"{...field} />
                </FormControl>
                
              

              </div>
          
              <FormMessage className="shad-form-message"/>
            </FormItem>
          )}
        /> 
        )} 

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="shad-form-item">
                <FormLabel className="shad-form-label">Email </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" className="shad-input"{...field} />
                </FormControl>
                
              

              </div>
          
              <FormMessage className="shad-form-message"/>
            </FormItem>
          )}
        /> 
        <Button type="submit" className="form-submit-button"
         disabled={isloading} >
          {type==="sign-in" ? "Sign In" : "Create Account"}

          {isloading && (
            <Image src="/assets/icons/loader.svg" alt="loader" width={24}
             height={24} className="ml-2 animate-spin"/>
          )}
        </Button>
        {errorMessage && 
          <p className="error-message">*{errorMessage}  </p>}

          <div className="body-2 flex justify-center">
            <p className="text-light-100">
              {type === "sign-in" ? "Don't have an account?" : "Already have an account?"}

            </p>
            <Link href={
              type=== "sign-in" ? "/sign-up" : "/sign-in"}className="ml-1 font-medium text-brand underline-offset-4 hover:underline">
                {""}
                {type==="sign-in" ? "Sign Up" : "Sign In"}
              </Link>
          </div>
      </form>
    </Form>
        

    </>
  );
};

export default AuthForm;
