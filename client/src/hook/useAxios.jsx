import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://personal-finance-visualizer-fywo.onrender.com',   
});


const useAxios = () => {
    return instance;
};

export default useAxios;