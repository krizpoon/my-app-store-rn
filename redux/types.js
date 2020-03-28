export type AppImage = {
    src: string,
    height: number,
};

export type AppCategory = {
    label: string,
};

export type AppEntry = {
    id: string,
    name: string,
    title: string,
    link: string,
    images: AppImage[],
    summary: string,
    category: AppCategory,
    averageUserRatingForCurrentVersion?: number,
    userRatingCountForCurrentVersion?: number,
};
