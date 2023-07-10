import axios from 'axios';

const service = axios.create({
	baseURL: 'http://127.0.0.1:7545',
	timeout: 5000
});

service.interceptors.request.use(config => {
  config.headers['Content-Type']= 'application/json'
  return config;
})

service.interceptors.response.use(
	(response) => {
		return response.data.result;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default service;
