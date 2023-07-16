import React from 'react';
import {useForm} from "react-hook-form";
import FormItem from "@/components/FormItem";
import Logo from "@/components/Logo";
import {Button} from "@material-tailwind/react";
import Link from "next/link";
import useRegisterClient from "@/hooks/useRegisterClient";

const SignIn = () => {
    const storeName = process.env.NEXT_PUBLIC_STORE_NAME;
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            termsAndConditions: false,
            imaDeveloper: false,
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const {registerClient} = useRegisterClient();

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
                            <form className="space-y-4 md:space-y-6 justify-center items-center"
                                  onSubmit={handleSubmit(registerClient)}>
                                <FormItem register={register('name', {required: true})} errors={errors.name}
                                          placeholder="Oppai Man" name="name" label="Nome" type="text"/>
                                <FormItem register={register('email', {required: true})} errors={errors.email}
                                          placeholder="name@company.com" name="email" label="Your email" type="email"/>
                                <FormItem register={register('password', {required: true})} errors={errors.password}
                                          placeholder="••••••••" name="password" label="Password" type="password"/>
                                <FormItem register={register('confirmPassword', {required: true})}
                                          errors={errors.password}
                                          placeholder="••••••••" name="confirm-password" label="Confirm
                                        password" type="password"/>
                                <FormItem register={register('termsAndConditions', {required: true})}
                                          errors={errors.termsAndConditions} name="terms" label="I accept the"
                                          highlightedText={"Terms and Conditions"} highlightedTextLink="#"
                                          type="checkbox"/>

                                <FormItem register={register('imaDeveloper', {required: false})}
                                          errors={errors.imaDeveloper} name="im-a-developer" label="I am a Developer"
                                          type="checkbox"/>
                                <div className="flex justify-center flex-col">
                                    <Button type="submit">Create an account</Button>
                                </div>

                                <div
                                    className="text-sm font-light text-gray-500 dark:text-gray-400 mt-2 flex justify-center items-center">
                                    Already have an account? <Link href="/login"><Button variant="text" size="sm"
                                                                                         color="blue-gray">Login
                                    here</Button></Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SignIn;
