// Libs
import Link from "next/link";

// Shared
import { Button } from "@/shared/components/ui/button";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="text-center space-y-6 max-w-md">
                {/* 404 Number */}
                <div className="space-y-2">
                    <h1 className="text-8xl font-bold text-primary">404</h1>
                    <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
                </div>

                {/* Message */}
                <div className="space-y-3">
                    <h2 className="text-3xl font-semibold text-foreground">
                        Page Not Found
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Sorry, we couldn't find the page you're looking for.
                        It might have been moved or deleted.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <Button asChild size="lg">
                        <Link href="/dashboard/products">
                            Go to Dashboard
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/">
                            Go to Home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

