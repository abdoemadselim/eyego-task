'use client'

// Libs
import Link from 'next/link'
import { AlertCircleIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

// Components
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Alert, AlertTitle } from '@/shared/components/ui/alert'
import { InputError } from '@/shared/components/ui/input-error'

// Features
import { NewUserSchema, type NewUserType } from '@/features/auth/schema'

export default function SignUpForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<NewUserType>({
        resolver: zodResolver(NewUserSchema),
    })

    const onSubmit: SubmitHandler<NewUserType> = async (data) => {
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
                        Create Your Free Account
                    </h1>
                </div>

                <div
                    id="root-error"
                    aria-live="polite"
                    aria-atomic="true"
                    className="text-center"
                >
                    {errors?.root && (
                        <Alert variant="destructive" className="my-4">
                            <AlertCircleIcon />
                            <AlertTitle>{errors.root?.message}</AlertTitle>
                        </Alert>
                    )}
                </div>

                <hr className="my-4 border-dashed" />

                <div className="space-y-2">
                    {/* Name */}
                    <div>
                        <Label htmlFor="name" className="block text-md pb-1">
                            Full Name
                        </Label>
                        <Input
                            {...register('name')}
                            type="text"
                            name="name"
                            id="name"
                            className="py-0 my-0"
                            aria-invalid={errors.name ? 'true' : 'false'}
                        />

                        <InputError error={errors.name?.message || ''} />
                    </div>

                    {/* Email */}
                    <div>
                        <Label htmlFor="email" className="block text-md pb-1">
                            Email Address
                        </Label>
                        <Input
                            {...register('email')}
                            type="text"
                            name="email"
                            id="email"
                            aria-invalid={errors.email ? 'true' : 'false'}
                        />

                        <InputError error={errors.email?.message || ''} />
                    </div>

                    {/* Password */}
                    <div>
                        <Label htmlFor="password" className="text-md pb-1">
                            Password
                        </Label>
                        <Input
                            {...register('password')}
                            type="password"
                            name="password"
                            id="password"
                            className="input sz-md variant-mixed py-0 my-0"
                            aria-invalid={errors.password ? 'true' : 'false'}
                        />

                        <InputError error={errors.password?.message || ''} />
                    </div>

                    {/* Password Confirmation */}
                    <div>
                        <Label htmlFor="password_confirmation" className="text-md pb-1">
                            Confirm Password
                        </Label>
                        <Input
                            {...register('password_confirmation')}
                            type="password"
                            name="password_confirmation"
                            id="password_confirmation"
                            className="input sz-md variant-mixed py-0 my-0"
                            disabled={isSubmitting}
                            aria-invalid={errors.password_confirmation ? 'true' : 'false'}
                        />

                        <InputError
                            error={errors.password_confirmation?.message || ''}
                        />
                    </div>

                    <Button
                        className="w-full cursor-pointer mt-2 text-md"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Sign Up Now
                    </Button>
                </div>
            </div>

            <div className="bg-muted rounded-(--radius) border p-3">
                <p className="text-accent-foreground text-center text-base">
                    Already have an account?
                    <Button asChild variant="link" className="px-2 text-base">
                        <Link href="/auth/login">Log in</Link>
                    </Button>
                </p>
            </div>
        </form>
    )
}
