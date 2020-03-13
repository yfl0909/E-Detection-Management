import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './person-record.json',
        method: 'get',
        params: query
    });
};
