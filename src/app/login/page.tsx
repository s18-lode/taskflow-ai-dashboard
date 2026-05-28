"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validations/auth.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    const {
        //register: connects input to react hook form, without this form library cannot track input
        //handleSubmit:  Safely handles form submisstion, collects form values, validates form, prevents page refresh
        register,
        handleSubmit,
        //isSubmitting is automatically managed by RHF
        formState: { errors, isSubmitting },
    } = useForm({
        //validate using this schema
        resolver: zodResolver(loginSchema),
    });

    const googleProvider = new GoogleAuthProvider();

    const onSubmit = async (data: any) => {
        console.log(data);
        try {
            const userCredential =
                await signInWithEmailAndPassword(
                    auth,
                    data.email,
                    data.password
                );
            console.log(userCredential.user);
            router.push("/dashboard");
            
        } catch (error) {
            console.log(error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result =
                await signInWithPopup(
                    auth,
                    googleProvider
                );

            console.log(result.user);
            router.push("/dashboard");

        } catch (error) {
            console.log(error);
        }
    };

    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/dashboard");
        }
    }, [user, router])


    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
            <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8">

                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-white">
                        Login
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Welcome back to TaskFlow AI
                    </p>
                </div>
                {user && (
                    <p className="mb-4 text-green-500">
                        Logged in as: {user.email}
                    </p>
                )}

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4">
                    <div>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">
                                {errors.email.message as string}
                            </p>
                        )}
                    </div>

                    <div>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">
                                {errors.password.message as string}
                            </p>
                        )}
                    </div>

                    <Button className="w-full" isLoading={isSubmitting}>
                        Login
                    </Button>

                    {/* Google login button */}
                    <Button
                        type="button"
                        variant="secondary"
                        className="w-full"
                        onClick={handleGoogleLogin}
                    >
                        Continue With Google
                    </Button>
                </form>
            </div>
        </main>
    );
}