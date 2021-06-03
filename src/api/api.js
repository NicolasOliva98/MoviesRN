import { useState, useEffect } from 'react';
import { API, URL } from './api-list'
import Axios from 'axios';

export default () => {
    const [isLoadPostServices, setLoadPostServices] = useState(false);
    const [_getIsWorking, _setGetIsWorking] = useState(false);

    const post = async (_body, _url, _token) => {
        try {
            setLoadPostServices(true);
            let postData = _body;
            let config = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                }
            };
            if (_token) {
                config.headers.Authorization = `Bearer ${_token}`
                console.log(config);
            }
            let data = await Axios.post(
                _url,
                postData,
                config
            );
            setLoadPostServices(false);
            return data;
        } catch (error) {
            console.log(error.response);
            setLoadPostServices(false);
            throw error;
        }
    }

    const get = async (_path, _params = null, _token) => {
        try {
            let resp;
            let config = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                },
                params: _params
            };
            if (_token) {
                config.headers.Authorization = `Bearer ${_token}`
                console.log(config);
            }

            _setGetIsWorking(true);
            resp = await Axios.get(_path, config);
            _setGetIsWorking(false);
            return resp;
        } catch (error) {
            throw error;
        }
    }
    useEffect(() => {
        return () => {
            setLoadPostServices(false);
            _setGetIsWorking(false);
        }
    }, [isLoadPostServices, _getIsWorking]);
    return {
        get,
        post,
        API,
        URL
    };
};
