import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './attendance-record.json',
        method: 'get',
        params: query
    });
};
