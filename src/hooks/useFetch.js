import { useState, useEffect } from 'react';
import Axios from 'axios';

Axios.defaults.baseURL = 'https://161.35.140.236:9005/api/'; //http://161.35.140.236:9005/api/

const useFetch = (axiosParams) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
    
    const fetchData = async (params) => {
        try {
            const result = await Axios.request(params);
            setResponse(result.data);
        } catch (error) {
            setError(error);
            console.log(error.message);
        } finally {
            setloading(false);
        }
    };

    useEffect(() => {
        fetchData(axiosParams);
        return () => {
            setResponse(null)
            setError('')
            setloading(false)
        }
    }, []);

    return { response, error, loading };
};

export default useFetch

