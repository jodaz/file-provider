import axios from 'axios'
import interceptors from './interceptors'
import { formDataHandler } from './formDataHandler'
import { getUrl } from './helpers'

export const fileProvider: any = ({ apiUrl, tokenName }: IProps) => {
    const client = axios.create({
        baseURL: `${apiUrl}`
    })

    interceptors(client, `${tokenName}`);

    return ({
        get: async (resource: string, params: any) => {
            const url = `${resource}?${getUrl(params)}`;
            const res = await client.get(url, { responseType: 'blob' });

            return res;
        },
        getOne: async (resource: string, params: any) => {
            const url = `${resource}/${params}`;
            const res = await client.get(url, { responseType: 'blob' });

            return res;
        },
        post: async (resource: string, params: any) => {
            const formData = await formDataHandler(params);
            const res = await client.post(resource, formData);

            return res 
        },
        put: async (resource: string, params: any) => {
            const { id, data } = params
            const formData = await formDataHandler(data);
            const res = await client.put(`${resource}/${id}`, formData);

            return res 
        }
    })
}

interface IProps {
    tokenName: string;
    apiUrl: string;
}
