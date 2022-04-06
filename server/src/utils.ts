export const wrangleCheckbox = ({ is_day_scholar, ...rest }: any) => ({
    ...rest,
    is_day_scholar: is_day_scholar === "on" ? 1 : 0,
});

export const isNonDefault = ({ is_day_scholar, ...rest }: any) =>
    Object.values(rest).every(Boolean);
