const host = 'http://localhost:3333';
import axios from 'axios';

export function getBlogList() {
  return axios.get(`${host}/blog`);
}

export function getBlogById(id) {
  return axios.get(`${host}/blog/${id}`);
}