import axios from 'axios';

const service = axios.create({
	baseURL: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`,
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
