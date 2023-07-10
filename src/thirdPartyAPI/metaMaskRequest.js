import MetaMaskSDK from '@metamask/sdk';
import axios from 'axios';

const MMSDK = new MetaMaskSDK();
const ethereum = MMSDK.getProvider();

const service = axios.create({
	baseURL: ethereum.request,
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
