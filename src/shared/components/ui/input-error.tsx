export function InputError({ error }: { error: string }) {
    return (
        <p className="my-2 text-sm text-red-500 min-h-[20px]" role="alert">
            {error}
        </p>
    )
}
