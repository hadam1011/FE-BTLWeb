import axios from 'axios';

const request = axios.create({
    baseURL: 'https://book-store-be-7nps.onrender.com/',
})

export const get = async (path) => {
    const response = await request.get(path);
    return response.data;
}

export const update = async (path, data) => {
    const response = await request.put(path, data);
    return response.data;
}

export const create = async (path, data) => {
    const response = await request.post(path, data);
    return response.data;
}

export const deleteObject = async (path) => {
    await request.delete(path);
}