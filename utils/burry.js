import { request, getSessionKey } from './request.js';

const URL = 'https://common.whouapp.com/api/api/buriedPoint/add.htm';

export function burry() {
  request({
    url: URL,
  });
}
