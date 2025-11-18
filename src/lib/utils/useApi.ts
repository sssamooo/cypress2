import { useState, useEffect } from "react";
import { api } from "@/lib/api";

interface HookResult<T> {
    data: T | undefined;
    isLoading: boolean;
    error?: Error;
}

export function useApi<T>(url: string): HookResult<T> {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<Error>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.get(url)
            .then(({ data }) => setData(data))
            .catch(setError)
            .finally(() => setIsLoading(false));
    }, [url]);

    return { data, isLoading, error };
}
