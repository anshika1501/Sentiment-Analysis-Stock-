import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const analyzeStock = async (stockName) => {
  const response = await api.post('analyze-stock', { stock_name: stockName });
  return response.data;
};

export const getAnalysis = async (stockName) => {
  const response = await api.get(`get-analysis/${stockName}`);
  return response.data;
};

export default api;
