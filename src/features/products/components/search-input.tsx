'use client'

// Libs
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useDebouncedCallback } from 'use-debounce';

// Components
import { Input } from "@/shared/components/ui/input"

function SearchInput({ disabled }: { disabled?: boolean }) {
    const { replace } = useRouter()
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Update the url (update the search param to the new search value from the input)
    const handleSearch = useDebouncedCallback((value) => {
        const params = new URLSearchParams();
        if (value) {
            params.set("search", value);
        } else {
            params.delete("search")
        }

        // Reset Page to 0 for new results
        params.set("page", "1");
        replace(`${pathname}?${params.toString()}`)
    }, 150);

    return (
        <div className="py-4 pl-4 sm:px-0 sm:min-w-[400px] w-[100%]">
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    disabled={disabled}
                    placeholder="Bluetooth Headset"
                    maxLength={50}
                    defaultValue={searchParams.get('search')?.toString()} // To set the current search value in URL when refreshing the page
                    onChange={(event) => handleSearch(event.target.value)}
                    className={`pl-10  ${disabled ? "bg-gray-200" : "bg-white"}`}
                />
            </div>
        </div>
    )
}

export default SearchInput