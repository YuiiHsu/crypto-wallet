import axios from 'axios';

const service = axios.create({
	baseURL: `https://min-api.cryptocompare.com/`,
	timeout: 5000
});

service.interceptors.request.use(config => {
  config.headers['Content-Type']= 'application/json';
  config.headers['Authorization']= `Apikey ${process.env.REACT_APP_CRYPTOCOMPARE_API_KEY}`;
  return config;
})

service.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default service;
