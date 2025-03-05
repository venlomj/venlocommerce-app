import { FunctionComponent } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginFormSchema } from "@/lib/schemas";

const LoginPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
const onSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
    try {
        const response = await axios.post("http://localhost:5052/api/auth/login", values);
    
        if (response.status === 200) {
          const { token, user } = response.data;  // Assuming user data is returned along with token
          console.log("JWT Token:", token);
          console.log("User Info:", user);
    
          // Save token and user info to localStorage
          localStorage.setItem("jwt", token);
          localStorage.setItem("userName", user.firstName);  // Or use the appropriate property (e.g., user.firstName)
    
          navigate("/orders");  // Redirect to a dashboard or home page
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error("Login mislukt:", error.response?.data || error.message);
          alert(error.response?.data?.message || "Login failed. Please try again.");
        } else {
          console.error("An unexpected error occurred:", error);
          alert("An unexpected error occurred. Please try again.");
        }
      
  }
  
};


  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 shadow-md bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input {...field} type="email" placeholder="john.doe@example.com" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl><Input {...field} type="password" placeholder="******" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
