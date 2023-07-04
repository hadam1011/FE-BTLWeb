import * as request from '../api/request';

export const getUserCart = async (id) => {
    try {
        const response = await request.get(`book-cart/${id}`);
        return response;
    } catch (e) {
        console.log(e);
    }
}

export const createOrder = async (data) => {
    try {
        const response = await request.create('book-cart', data);
        return response;
    } catch (e) {
        console.log(e);
    }
}

export const updateOrder = async (data) => {
    try {
        const response = await request.update(`book-cart/${data.book_cartid}`, data);
        return response;
    } catch (e) {
        console.log(e);
    }
}

export const deleteOrder = async (id) => {
    try {
        await request.deleteObject(`book-cart/${id}`);
    } catch (e) {
        console.log(e);
    }
}