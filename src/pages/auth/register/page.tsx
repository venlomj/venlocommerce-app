import { FunctionComponent } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
// From handling utilities
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormSchema } from "@/lib/schemas";
import { useNavigate } from "react-router-dom";

const RegisterPage: FunctionComponent = () => {
    const navigate = useNavigate()
    const form = useForm({
      resolver: zodResolver(RegisterFormSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
      },
    });


    const onSubmit = async (values: z.infer<typeof RegisterFormSchema>) => {
        console.log(values) 
        navigate("/login") // Redirect after registration
      }
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full max-w-md p-8 shadow-md bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="firstName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl><Input {...field} placeholder="John" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="lastName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl><Input {...field} placeholder="Doe" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl><Input {...field} placeholder="+32 123 456 789" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
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
                <Button type="submit" className="w-full">Register</Button>
              </form>
            </Form>
          </div>
        </div>
      )
}

export default RegisterPage