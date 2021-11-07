import * as React from 'react'
import { fileProvider } from './fileProvider'
import fileDownload from 'js-file-download'
import isEmpty from 'is-empty';

const initialState = {
    loaded: false,
    data: {},
    loading: false,
    error: {}
}

const downloableInitialState = {
    status: false,
    name: '',
    ext: ''
}

export const useFileProvider = () => {
    const [state, setState] = React.useState<State>(initialState)
    const [downloable, setDownloable] = React.useState(downloableInitialState)

    const provider = React.useCallback(async ({ type, resource, payload }: ProviderProps) => {
        setState({ ...state, loading: true })

        let res: any = {}

        try {
            switch (type) {
                case 'get':
                    res = await fileProvider.get(resource, payload)

                    if (!isEmpty(res.data)) {
                        setDownloable({ status: true, name: payload.name, ext: 'pdf' })
                    }
                case 'create':
                    res = await fileProvider.post(resource, payload)
                case 'update':
                    res = await fileProvider.put(resource, payload)
            }
        } catch (error) {
            setState({
                ...initialState,
                error: error
            })
        }

        setState({ ...state, data: res.data, loaded: true, loading: false })
    }, [])

    React.useCallback(() => {
        if (downloable.status) {
            return fileDownload(state.data, downloable.name)
        }
    }, [downloable.status])

    return [provider, state] as const;
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