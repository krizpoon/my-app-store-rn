import get from 'lodash/get';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm/browser';
import { AppEntry } from './app-entry';

@Entity('appImage')
class AppImage {
    static fromFeedJson(image, extras) {
        return Object.assign(new AppImage(), {
            src: get(image, 'label'),
            height: get(image, 'attributes.height'),
        }, extras);
    }

    @ManyToOne(type => AppEntry, app => app.images) appId;
    @PrimaryColumn('text') src;
    @Column('int') height;
}

export { AppImage };
