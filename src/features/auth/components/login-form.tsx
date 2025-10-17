'use client'

// Libs
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from "react-hook-form"
import { AlertCircleIcon } from 'lucide-react';

// Shared
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Alert, AlertTitle } from '@/shared/components/ui/alert';
import { InputError } from '@/shared/components/ui/input-error';

// Features
import { LoginSchema, type LoginType } from '@/features/auth/schema'

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useForm<LoginType>({
        resolver: zodResolver(LoginSchema)
    })

    const onSubmit: SubmitHandler<LoginType> = async (data) => {
        console.log(data)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-card m-auto h-fit rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
        >
            <div className="p-8 pt-2 pb-6 md:w-[500px] w-[350px] sm:w-[450px]">
                <div>
                    <h1 className="mb-1 mt-4 text-xl text-center text-primary font-semibold">
                        Sign In
                    </h1>
                </div>

                <div id="root-error" aria-live="polite" aria-atomic="true" className='text-center'>
                    {errors?.root &&
                        <Alert variant="destructive" className="my-4">
                            <AlertCircleIcon />
                            <AlertTitle>{errors.root?.message}</AlertTitle>
                        </Alert>
                    }
                </div>

                <hr className="my-4 border-dashed" />

                <div className="space-y-2">
                    {/* Email */}
                    <div>
                        <Label htmlFor="email" className="block text-md pb-1">
                            Email Address
                        </Label>
                        <Input
                            {...register("email")}
                            type="text"
                            name="email"
                            id="email"
                            className="py-0 my-0"
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                        <InputError error={errors.email?.message || ''} />
                    </div>

                    {/* Password */}
                    <div className="space-y-0.5">
                        <Label htmlFor="password" className="text-md pb-1">
                            Password
                        </Label>
                        <Input
                            {...register("password")}
                            type="password"
                            name="password"
                            id="password"
                            className="input sz-md variant-mixed py-0 my-0"
                            aria-invalid={errors.password ? "true" : "false"}
                        />
                        <InputError error={errors.password?.message || ''} />
                    </div>

                    <Button className="w-full cursor-pointer text-md mt-2" type="submit" disabled={isSubmitting}>
                        Sign In
                    </Button>
                </div>
            </div>

            <div className="bg-muted rounded-(--radius) border p-3 text-base">
                <p className="text-accent-foreground text-center">
                    Don’t have an account?
                    <Button asChild variant="link" className="px-2 text-base">
                        <Link href="/auth/signup">Create your free account</Link>
                    </Button>
                </p>
            </div>
        </form>
    )
}
