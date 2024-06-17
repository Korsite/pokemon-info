import {useEffect, useState} from "react";


export const useFetch = (url) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
    })

    useEffect(() => {
        getFetch()
    }, [url]);

    const setLoadingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
        })
    }

    const getFetch = async () => {
        setLoadingState()
        const response = await fetch(url)


        if (!response.ok) {
            setState({
                data: null,
                idLoading: false,
                hasError: true,
                error: {
                    code: response.status,
                    message: response.statusText
                }
            })
        }else{
            await new Promise(resolve => setTimeout(resolve, 2000))
            const data = await response.json()

            setState({
                data: data,
                isLoading: false,
                hasError: false,
                error: null
            })
        }

    }

    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError
    }
}