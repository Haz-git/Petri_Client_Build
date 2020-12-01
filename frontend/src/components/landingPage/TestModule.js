// This is a test module testing client-side authentication via cookies:
import React, { useEffect, useState } from 'react';
import api from '../../api';

const TestModule = () => {
    const [ cookie, setCookie ] = useState('');

    useEffect(()=> {
        async function verifyCookie() {
            const response = await api.get('/read-cookie',);
        }

        verifyCookie();
    },[])
}