class HttpError extends Error {
    constructor(message: string, public status: number) {
        super(message);
        this.name = "HttpError";
    }
}

export class BadRequestError extends HttpError {
    constructor(message: string) {
        super(message, 403);
        this.name = "BadRequestError";
    }
}

export const wrangleCheckbox = ({ is_day_scholar, ...rest }: any) => ({
    ...rest,
    is_day_scholar: is_day_scholar === "on" ? 1 : 0,
});

export const isNonDefault = ({ is_day_scholar, ...rest }: any) =>
    Object.values(rest).every(Boolean);
