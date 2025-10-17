import { AuthResponse } from "@/features/auth/types/index";

export const transformErrorResponse = (response: { status: number; data: AuthResponse }) => {
    if (response.data.fieldErrors) {
        return response.data.fieldErrors;
    }

    if (response.data.errors && response.data.errors.length > 0) {
        return { root: { message: response.data.errors[0] } };
    }

    return {
        root: {
            message:
                "An unexpected error occurred. Please check your internet connection and try again.",
        },
    };
};
