import { useState, useEffect } from "react";

import axios, { AxiosRequestConfig } from "axios";

const useFeth2 = (url: string, token?: string) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const fetchData = async () => {
            const config: AxiosRequestConfig = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                    "Content-Type": "application/json",
                    // Añade el token al encabezado si está disponible
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
            };
            try {
                const res = await axios.get(url, config);

                setData(res.data);
            } catch (err) {
                if (err.response && err.response.status === 403) {
                    // Redirigir al usuario al inicio de sesión
                    window.location.href = "/login";
                } else {
                    setError(err.message);
                    console.error('Error:', err);
                }
            }
            finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [url]);

    return { data, loading, error };

};

export default useFeth2;