import * as request from '../api/request';

export const getAllOrder = async (id) => {
    try {
        const response = await request.get(`orders/${id}`);
        return response;
    } catch (e) {
        console.log(e);
    }
}

export const createOrder = async (data) => {
    try {
        const response = await request.create('order', data);
        return response;
    } catch (e) {
        console.log(e);
    }
}

export const deleteOrder = async (id) => {
    try {
        await request.deleteObject(`order/${id}`);
    } catch (e) {
        console.log(e);
    }
}