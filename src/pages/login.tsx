import { useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { AxiosError } from "axios";
import {
  Card,
  CardContent,
  CardDescription,
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
import { PasswordInput } from "@/components/password-input";
import { ArrowLeft } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password is required" }),
});
type LoginType = z.infer<typeof loginSchema>;

export const Login = () => {
  const { isLoading, mutate, isError, error } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      if (error instanceof AxiosError) {
        const errorMessage: string =
          error.response?.data.message || error.message;
        toast.error(errorMessage);
      }
    }
  }, [isError, error]);

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
    <div className="flex flex-col items-center mt-20">
      <Button
        variant="outline"
        onClick={() => navigate("/store")}
        className="text-green-500 hover:text-green-700 mb-10"
      >
        <ArrowLeft className="h-4 w-4 mx-2" aria-hidden="true" />
        Back To Store
      </Button>
      <Card className="w-[350px] sm:max-w-[400px]">
        <CardHeader>
          <CardTitle className="inline-flex justify-between">
            Sign in to Ms Jay Store
          </CardTitle>
          <CardDescription>
            Welcome back! Please sign in to continue
          </CardDescription>
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
                      <PasswordInput
                        id="Password"
                        placeholder="Password"
                        autoComplete="current-password"
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
