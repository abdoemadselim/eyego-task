export type ApiResponse = {
    data: {},
    errors: string[],
    fieldErrors: Record<string, { message: string }>
}