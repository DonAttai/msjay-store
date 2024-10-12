import { Navigate, useNavigate } from "react-router-dom";
import { useVerifyEmail } from "../hooks/useVerifyEmail";
import { useUserActions } from "../stores/user-store";
import { useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  code: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export const VerifyEmail = () => {
  const { data, isLoading, mutate: verifyEmail } = useVerifyEmail();
  const { setCredentials } = useUserActions();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: "",
    },
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      setCredentials(data);
      navigate("/");
    }
  }, [setCredentials, data]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    verifyEmail(data);
  }

  if (data && data.isVerified) {
    return <Navigate to="/" />;
  }

  return (
    <section className="min-h-screen grid place-content-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-6">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Verification Code</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the verification code sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            {isLoading ? "Wait..." : "Submit Verification Code"}
          </Button>
        </form>
      </Form>
    </section>
  );
};
