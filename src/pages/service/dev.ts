import axios from 'axios';
export async function getList() {
  return axios.get('/api/users');
}
