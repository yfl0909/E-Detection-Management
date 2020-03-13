import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './identify-record.json',
        method: 'get',
        params: query
    });
};
