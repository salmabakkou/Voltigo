import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default API;

export const getCars = async () => {
  const res = await API.get("/cars");
  return res.data;
};

export const addCar = async (data) => {
  const res = await API.post("/cars", data);
  return res.data;
};

export const deleteCar = async (id) => {
  await API.delete(`/cars/${id}`);
};

export const updateCar = async (id, data) => {
  const res = await API.put(`/cars/${id}`, data)
  return res.data;
};

export const getCarById = async (id) => {
  const res = await API.get(`/cars/${id}`)
  return res.data;
};
