import axios from 'axios'
import interceptors from './interceptors'
import { getUrl } from './helpers'

export const fileProvider: any = ({ apiUrl, tokenName }: IProps) => {
    const client = axios.create({
        baseURL: `${apiUrl}`
    })

    interceptors(client, `${tokenName}`);

    return ({
        get: async (resource: string, params: any) => {
            const url = `${resource}/${getUrl(params)}`;
            const res = await client.get(url, { responseType: 'blob' });

            return res;
        },
        post: async (resource: string, params: any) => {
            const formData = await formDataHandler(params);
            const res = await client.post(resource, formData);
            const { id, attributes  } = res.data;

            return {
                data: {
                    id, ...attributes
                }
            }
        },
        put: async (resource: string, params: any) => {
            const { id, data } = params
            const formData = await formDataHandler(data);
            const res = await client.put(`${resource}/${id}`, formData);

            return {
                data: res.data
            }
        }
    })
}

interface IProps {
    tokenName: string;
    apiUrl: string;
}
