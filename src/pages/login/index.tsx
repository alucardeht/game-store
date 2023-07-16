import React from 'react';
import Logo from "@/components/Logo";
import FormItem from "@/components/FormItem";
import {useForm} from "react-hook-form";
import Link from "next/link";
import {Button} from "@material-tailwind/react";
import useAuth from "@/hooks/useAuth";

const Login = () => {
    const storeName = process.env.NEXT_PUBLIC_STORE_NAME;
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const {loginUser} = useAuth();

    return (
        <div>
            <section>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="flex items-center mb-6 text-2xl font-semibold text-white z-0">
                        <Logo width={36}/>
                        {storeName}
                    </div>
                    <div
                        className="w-full md:mt-0 sm:max-w-md xl:p-0 z-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <form className="space-y-4 md:space-y-6"
                                  onSubmit={handleSubmit(loginUser)}>
                                <FormItem register={register('email', {required: true})} errors={errors.email}
                                          placeholder="name@company.com" name="email" label="Your email" type="email"/>
                                <FormItem register={register('password', {required: true})} errors={errors.password}
                                          placeholder="••••••••" name="password" label="Password" type="password"/>
                                <div className="flex justify-center flex-col">
                                    <Button type="submit">Login</Button>
                                </div>
                                <div
                                    className="text-sm font-light text-gray-500 dark:text-gray-400 mt-2 flex justify-center items-center">
                                    Not a User yet? <Link href="/register"><Button variant="text" size="sm"
                                                                                   color="blue-gray">Register
                                    here</Button></Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default Login;
