import * as request from '../api/request';

export const getAllStar = async () => {
    try {
        const response = await request.get('stars');
        return response;
    } catch (err) {
        console.log(err);
    }
}

export const getStarsByBookId = async (id) => {
    try {
        const response = await request.get(`stars/${id}`);
        return response;
    } catch (err) {
        console.log(err);
    }
}

export const createStar = async (data) => {
    try {
        const response = await request.create('star', data);
        return response;
    } catch (err) {
        console.log(err);
    }
}

export const updateStar = async (id, data) => {
    try {
        const response = await request.update(`star/${id}`, data);
        return response;
    } catch (err) {
        console.log(err);
    }
}

export const deleteStar = async (id) => {
    try {
        await request.deleteObject(`star/${id}`);
    } catch (err) {
        console.log(err);
    }
}