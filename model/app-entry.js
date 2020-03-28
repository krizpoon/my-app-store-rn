import get from 'lodash/get';
import { Column, Entity, PrimaryColumn } from 'typeorm/browser';
import { getArray, jsonParse, makeEnumerable, makeNonEnumerable } from '../utils/object-utils';

@Entity('appEntry')
class AppEntry {
    static fromFeedJson(json, extras) {
        const id = get(json, 'id.attributes.im:id');
        return Object.assign(new AppEntry(), {
            id,
            name: get(json, 'im:name.label'),
            title: get(json, 'title.label'),
            link: get(json, 'id.label'),
            // images: getArray(json, 'im:image').map(img => AppImage.fromFeedJson(img)),
            logos: getArray(json, 'im:image').map(img => ({
                src: get(img, 'label'),
                height: get(img, 'attributes.height'),
            })),
            author: get(json, 'im:artist.label'),
            summary: get(json, 'summary.label'),
            categoryName: get(json, 'category.attributes.label'),
            rank: get(json, 'rank'),
            grossingRank: get(json, 'grossingRank'),
        }, extras);
    }

    constructor() {
        makeEnumerable(this, 'logos');
        makeNonEnumerable(this, '_logos');
    }

    @PrimaryColumn('text') id;
    @Column('text') name;
    @Column('text') title;
    @Column('text') link;
    @Column('text') author;
    @Column('text') summary;
    @Column('text') categoryName;
    @Column('int', { nullable: true }) rank;
    @Column('int', { nullable: true }) grossingRank;
    @Column('int', { default: 0 }) isTopApp;
    @Column('int', { default: 0 }) isRecommendedApp;
    @Column('int', { default: 0 }) hasDetails;
    @Column('float', { nullable: true }) averageUserRatingForCurrentVersion;
    @Column('int', { nullable: true }) userRatingCountForCurrentVersion;
    // @OneToMany(_ => AppImage, img => img.appId, { onDelete: 'CASCADE' }) images;

    @Column('text', { nullable: true }) logosJson;
    _logos;
    get logos() {
        if (this._logos === undefined) {
            // cache the logos
            this._logos = jsonParse(this.logosJson);
        }
        return this._logos;
    }

    set logos(logos) {
        this.logosJson = logos ? JSON.stringify(logos) : null;
        this._logos = undefined; // invalidate cached logos
    }
}

export { AppEntry };
