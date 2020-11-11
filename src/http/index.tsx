import axios from 'axios';

const apikey = '785bcd42af9a4f96de167c0d424d59c2e104756586412d21ace30f508b2abd11';

export const cryptoHttp = axios.create({
    baseURL: 'https://min-api.cryptocompare.com/data',
    headers: {
        authorization: `Apikey ${apikey}`
    }
});