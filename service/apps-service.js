import { Brackets } from 'typeorm';
import { withConnection } from '../model';
import { AppEntry } from '../model/app-entry';

export const resetAppsRanking = async () => {
    await withConnection(async cn => {
        await cn.createQueryBuilder()
            .update(AppEntry)
            .set({ rank: null, isTopApp: 0 })
            .execute();
    });
};

export const insertAppEntries = async (apps, extras) => {
    if (!apps || !apps.length) {
        return;
    }
    await withConnection(async cn => {
        // const entries = apps.map(app => AppEntry.fromFeedJson(app, extras));
        // const images = flatten(entries.map(entry => entry.images));
        // await cn.getRepository(AppImage).save(images);
        // await cn.getRepository(AppEntry).save(entries);

        const repo = cn.getRepository(AppEntry);
        await Promise.all(apps.map(async app => {
            const existing = await repo.findOne(app.id);
            if (existing) {
                await repo.save(Object.assign(existing, app, extras));
            } else {
                await repo.save(app, extras);
            }
        }));

    });
};


function cleanQuery(query) {
    query = (query || '').trim();
    return query;
}

export const selectTopAppEntries = async (query, offset, limit) => {
    return await withConnection(async cn => {
        const repo = await cn.getRepository(AppEntry);
        const select = repo.createQueryBuilder('appEntry')
            .where('appEntry.isTopApp = :isTopApp', { isTopApp: 1 })
            .andWhere('appEntry.rank IS NOT NULL')
            .orderBy('appEntry.rank', 'ASC')
            .offset(offset)
            .limit(limit);

        const q = cleanQuery(query);
        if (q) {
            select.andWhere(new Brackets(qb => {
                qb.where('appEntry.title LIKE :q', { q: `%${query}%` })
                    .orWhere('appEntry.categoryName LIKE :q', { q: `%${query}%` })
                    .orWhere('appEntry.author LIKE :q', { q: `%${query}%` })
                    .orWhere('appEntry.summary LIKE :q', { q: `%${query}%` });
            }));
        }

        return select.getManyAndCount();
    });
};

export const selectRecommendedAppEntries = async (query, offset, limit) => {
    return await withConnection(async cn => {
        const repo = await cn.getRepository(AppEntry);
        const select = repo.createQueryBuilder('appEntry')
            .where('appEntry.isRecommendedApp = :isRecommendedApp', { isRecommendedApp: 1 })
            .andWhere('appEntry.grossingRank IS NOT NULL')
            .orderBy('appEntry.grossingRank', 'ASC')
            .offset(offset)
            .limit(limit);

        const q = cleanQuery(query);
        if (q) {
            select.andWhere('appEntry.title LIKE :q', { q: `%${query}%` });
        }

        return select.getManyAndCount();
    });
};

export const updateAppEntries = async (apps) => {
    if (!apps || !apps.length) {
        return;
    }
    await withConnection(async cn => {
        await Promise.all(apps.map(async app => {
            const { id, ...props } = app;
            return await cn.createQueryBuilder()
                .update(AppEntry)
                .set(props)
                .where('id = :id', { id })
                .execute();
        }));
    });
};
