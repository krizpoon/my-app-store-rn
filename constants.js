export const MaxTopApps = 100;
export const MaxRecommendedApps = 10;

export const topAppsUrl = n => `https://itunes.apple.com/hk/rss/topfreeapplications/limit=${n}/json`;
export const appDetailsUrl = ids => `https://itunes.apple.com/hk/lookup?id=${ids.join(',')}`;
export const recommendedAppsUrl = n => `https://itunes.apple.com/hk/rss/topgrossingapplications/limit=${n}/json`;

export const RecommendedAppLogoSize = 72;
export const TopAppLogoSize = 64;
