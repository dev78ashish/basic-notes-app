import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useLoginMutation } from '@/services/authApi';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/store/slices/authSlice';
import { loginSchema, type LoginSchema } from '@/schema/formSchema';

interface ErrorResponse {
    status: number;
    data: {
        message: string;
        token?: string | null;
        username?: string;
    };
}


const Login: React.FC = () => {

    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values: LoginSchema) => {
        try {
            const response = await login(values).unwrap();
            console.log('Login successful:', response);
            toast.success(response?.message);
            dispatch(loginSuccess(response.token));
            navigate('/');
        } catch (error) {

            const err = error as ErrorResponse;

            if (err?.data?.message) {
                toast.error(err.data.message);
            } else {
                toast.error('Something went wrong. Please try again.');
            }

            console.error('Login failed:', err);
        }
    };


    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className={cn("flex flex-col gap-6")}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Login to your account</CardTitle>
                            <CardDescription>
                                Enter your username below to login
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-6"
                                >
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your username"
                                                        type="text"
                                                        {...field}
                                                    />
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
                                                <div className="flex items-center justify-between">
                                                    <FormLabel>Password</FormLabel>
                                                    <a
                                                        href="#"
                                                        className="text-sm underline-offset-4 hover:underline"
                                                    >
                                                        Forgot your password?
                                                    </a>
                                                </div>
                                                <FormControl>
                                                    <Input type="password" {...field} placeholder='Enter your password' />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex flex-col gap-3">
                                        <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
                                            {isLoading ? 'Logging in...' : 'Login'}
                                        </Button>
                                        <Button variant="outline" className="w-full" disabled>
                                            Login with Google
                                        </Button>
                                    </div>

                                    <div className="mt-4 text-center text-sm">
                                        Don&apos;t have an account?{" "}
                                        <Link
                                            to="/signup"
                                            className="underline underline-offset-4"
                                        >
                                            Sign up
                                        </Link>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Login;
