import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:8080/',
})

export const getAll = async (path) => {
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