'use client'

// Libs
import Link from 'next/link'

// Components
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'

export default function SignUpForm() {
    return (
        <form className="bg-card m-auto h-fit rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]">
            <div className="p-8 pt-2 pb-6 md:w-[500px] w-[350px] sm:w-[450px]">
                <div>
                    <h1 className="mb-1 mt-4 text-xl text-center text-primary font-semibold">أنشىء حسابك المجاني</h1>
                </div>
                <hr className="my-4 border-dashed" />

                <div className="space-y-4">
                    {/* Name */}
                    <div className="space-y-4">
                        <Label
                            htmlFor="name"
                            className="block text-md">
                            الإسم الكامل
                        </Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            className="py-0 my-0"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label
                            htmlFor="email"
                            className="block text-md">
                            البريد الإلكتروني
                        </Label>
                        <Input
                            type="text"
                            name="email"
                            id="email"
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-0.5">
                        <div className="flex items-center justify-between">
                            <Label
                                htmlFor="password"
                                className="text-md">
                                كلمة السر
                            </Label>
                        </div>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            className="input sz-md variant-mixed py-0 my-0"
                        />
                    </div>

                    {/* Password Confirmation */}
                    <div className="space-y-0.5">
                        <div className="flex items-center justify-between">
                            <Label
                                htmlFor="password-confirmation"
                                className="text-md">
                                تأكيد كلمة السر
                            </Label>
                        </div>
                        <Input
                            type="password"
                            name="password_confirmation"
                            id="password_confirmation"
                            className="input sz-md variant-mixed py-0 my-0"
                        />
                    </div>

                    <Button className="w-full cursor-pointer text-md mt-4" type="submit">سجل الاَن</Button>
                </div>
            </div>

            <div className="bg-muted rounded-(--radius) border p-3">
                <p className="text-accent-foreground text-center text-sm">
                    لديك حساب بالفعل؟
                    <Button
                        asChild
                        variant="link"
                        className="px-2">
                        <Link href="/auth/login">تسجيل الدخول</Link>
                    </Button>
                </p>
            </div>
        </form>
    )
}