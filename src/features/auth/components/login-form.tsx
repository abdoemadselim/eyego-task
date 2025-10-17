'use client'

// Libs
import Link from 'next/link'

// Components
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'

export default function LoginForm() {
    return (
        <form className="bg-card m-auto h-fit rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]">
            <div className="p-8 pt-2 pb-6 md:w-[500px] w-[350px] sm:w-[450px]">
                <div>
                    <h1 className="mb-1 mt-4 text-xl text-center text-primary font-semibold">تسجيل الدخول</h1>
                </div>
                <hr className="my-4 border-dashed" />

                <div className="space-y-4">

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
                            className="py-0 my-0"
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

                    <Button className="w-full cursor-pointer text-md mt-4" type="submit">
                        تسجيل الدخول
                    </Button>
                </div>
            </div>

            <div className="bg-muted rounded-(--radius) border p-3">
                <p className="text-accent-foreground text-center text-sm">
                    ليس لديك حساب؟
                    <Button
                        asChild
                        variant="link"
                        className="px-2">
                        <Link href="/auth/signup">أنشئ حسابك المجاني</Link>
                    </Button>
                </p>
            </div>
        </form>
    )
}