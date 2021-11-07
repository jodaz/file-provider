import { stringify } from 'qs';

export const getUrl = (props: any) => {
    const { basePath, page, perPage, filterValues } = props;
    const query = {
        page: page,
        perPage: perPage,
        type: 'pdf'
    }

    // Add all filter params to query.
    Object.keys(filterValues || {}).forEach((key) => {
        //@ts-ignore
        query[`filter[${key}]`] = filterValues[key];
    });

    return `${basePath.substring(1)}?${stringify(query)}`;
}
