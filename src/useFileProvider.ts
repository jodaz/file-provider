import * as React from 'react'
import fileDownload from 'js-file-download'
import isEmpty from 'is-empty';

const initialState = {
    loaded: false,
    data: {},
    loading: false,
    error: {}
}

export const useFileProvider = (FileProvider: any) => {
    const [state, setState] = React.useState<State>(initialState)

    const fileProvider = React.useCallback(async ({ type, resource, payload }: ProviderProps) => {
        let res: any = {}
        setState({ ...initialState, loading: true })

        try {
            switch (type) {
                case 'list':
                    var { name, ext } = payload
                    res = await FileProvider.get(resource, payload) 

                    if (!isEmpty(res.data)) {
                        await fileDownload(res.data, `${name}.${ext}`)
                    }
                    break;
                case 'getOne':
                    var { name, ext, record } = payload
		    res = await FileProvider.getOne(resource, record)

                    if (!isEmpty(res.data)) {
                        await fileDownload(res.data, `${name}.${ext}`)
                    }
                    break;
                case 'create':
                    res = await FileProvider.post(resource, payload)
                    break;
                case 'update':
                    res = await FileProvider.put(resource, payload)
                    break;
                default:
                    throw Error("Undefined type")
            }
        } catch (error) {
            setState({
                ...initialState,
                error: error
            })
        }

        setState({ ...state, data: res.data, loading: false })
    }, [setState, FileProvider])

    return [fileProvider, state] as const;
}

interface ProviderProps {
    type: string;
    resource: string;
    payload: any;
}

interface State {
    data: any,
    loading: boolean,
    loaded: boolean,
    error: any
}
