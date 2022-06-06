import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })
            .then(response => {
                if(!response.ok) {
                    throw Error('Could not fetch data for that blog');
                }
                return response.json()
            })
            .then((result) => {
                setData(result);
                setIsPending(false);
                setError(null);
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted')
                }
                else {
                    setError(error.message);
                    setIsPending(false);
                }
            })

        return () => abortCont.abort();
    }, [url]);

    return { data, isPending, error } ;
}

export default useFetch;