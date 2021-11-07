import { stringify } from 'qs';

export const getUrl = ({ page, perPage, filterValues, ext }: IgetUrl) => {
    const query = {
        page: page,
        perPage: perPage,
        type: ext
    }

    // Add all filter params to query.
    Object.keys(filterValues || {}).forEach((key) => {
        //@ts-ignore
        query[`filter[${key}]`] = filterValues[key];
    });

    return stringify(query);
}

interface IgetUrl {
    page: number | string;
    perPage: number | string;
    filterValues: any;
    ext: string;
}