import * as request from '../api/request';

export const getAllBook = async () => {
    try {
        const response = await request.getAll('books');
        return response;
    } catch (e) {
        console.log(e);
    }
}

export const updateBook = async (id, data) => {
    try {
        const response = await request.update(`book/${id}`, data);
        return response;
    } catch (e) {
        console.log(e);
    }
}

export const createBook = async (data) => {
    try {
        const response = await request.create('book', data);
        return response;
    } catch (e) {
        console.log(e);
    }
}

export const deleteBook = async (id) => {
    try {
        await request.deleteObject(`book/${id}`);
    } catch (e) {
        console.log(e);
    }
}