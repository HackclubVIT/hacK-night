export const wrangleDayScholarCheckbox = ({ is_day_scholar, ...rest }: any) => ({
    ...rest,
    is_day_scholar: is_day_scholar === "on" ? 1 : 0,
});

export const wrangleMealPref = ({ is_vegetarian, ...rest }: any) => ({
    ...rest,
    is_vegetarian: is_vegetarian === "on" ? 1 : 0,
});

export const isNonDefault = ({ is_day_scholar, ...rest }: any) =>
    Object.values(rest).every(Boolean);
