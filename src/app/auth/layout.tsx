// Libs
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-zinc-50 px-4 py-16">
            <Link href="/">
                <Image
                    src="/images/logo.webp"
                    alt="EyeGo EyeGo AIoT Platform"
                    width="180"
                    height="180"
                    className="mx-auto"
                    fetchPriority="high"
                />
            </Link>
            <section className="flex justify-center pt-4 px-0">
                {children}
            </section>
        </div>
    );
}
