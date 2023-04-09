import fetch from 'utils/fetch';

export function page(query) {
  return fetch({
    url: '/api/admin/user/page',
    method: 'post',
    data: query
  });
}