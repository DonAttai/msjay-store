import { useEffect } from "react";
import { useUserActions } from "../stores/user-store";
import { useLogin } from "../hooks/useLogin";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { z } from "zod";

import { AxiosError } from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password is required" }),
});
type LoginType = z.infer<typeof loginSchema>;

export const Login = () => {
  const { data, isLoading, mutate, isError, isSuccess, error } = useLogin();
  const { setCredentials } = useUserActions();

  useEffect(() => {
    if (data) {
      setCredentials(data);
      window.location.href = "/";
    }
  }, [setCredentials, data]);

  useEffect(() => {
    if (isError) {
      if (error instanceof AxiosError) {
        const errorMessage: string =
          error.response?.data.message || error.message;
        toast.error(errorMessage);
      }
    }
    if (isSuccess) toast.success("Login successful!");
  }, [isError, isSuccess]);

  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // onsubmit
  const onSubmit = async (values: LoginType) => {
    mutate(values);
  };

  return (
    <div className="min-h-[calc(100vh-128px)] grid place-items-center ">
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between">
                      <p>Password</p>
                      <Link
                        to="/forgot-password"
                        className="font-base text-green-500 hover:text-green-700 duration-300"
                      >
                        Forgot password?
                      </Link>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="At least 8 characters"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="bg-green-500 w-full text-white py-2 text-lg rounded-full font-bold duration-300 disabled:opacity-50 hover:bg-green-700 disabled:cursor-not-allowed"
              >
                {isLoading ? "Wait..." : "Sign in"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Link
            to="/auth/register"
            className="border border-green-400 text-center w-full text-green-400 py-2 text-lg rounded-full font-bold duration-300 hover:border-green-500 hover:text-green-600"
          >
            Create an account
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
