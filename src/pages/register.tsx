import { useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import { useRegister } from "../hooks/useRegister";

import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { z } from "zod";
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

const signUpSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Must contain at least 3 characters" }),
  lastName: z.string().min(3, { message: "Last Name is required" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "password must contain at leat 8 characters" }),
});
type RegisterUserType = z.infer<typeof signUpSchema>;

export const Register = () => {
  const { data, isLoading, mutate, isError, error, isSuccess } = useRegister();

  const [isPasswordShown, toggleVisibility] = useReducer(
    (prevState) => !prevState,
    false
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (data) navigate("/");
  });
  const form = useForm<RegisterUserType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isError) {
      if (error instanceof AxiosError) {
        const erroMessage: string =
          error.response?.data.message || error.message;
        toast.error(erroMessage);
      }
    }
    if (isSuccess) {
      toast.success(data.message);
      navigate("/auth/login");
    }
  });

  // onsubmit
  const onSubmit = async (values: RegisterUserType) => {
    mutate(values);
  };
  return (
    <div className="min-h-[calc(100vh-128px)] grid place-items-center w-full">
      <Card className="sm:max-w-[425px]">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <div className="flex flex-col relative mb-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="At least 8 characters"
                          type={isPasswordShown ? "text" : "password"}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isPasswordShown ? (
                  <FaRegEye
                    onClick={toggleVisibility}
                    className="absolute right-10 bottom-2 text-gray-500 cursor-pointer text-2xl"
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={toggleVisibility}
                    className="absolute right-10 bottom-2 text-gray-500 cursor-pointer text-2xl"
                  />
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="bg-green-500 w-full text-white py-2 text-lg rounded-full font-bold duration-300 disabled:opacity-50 hover:bg-green-700 disabled:cursor-not-allowed"
              >
                {isLoading ? "Wait..." : "Create Account"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Link to="/auth/login" className="justify-self-start">
            Already have an account?
            <span className="text-green-500 underline"> Sign In</span>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
