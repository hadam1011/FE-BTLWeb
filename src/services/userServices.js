import * as request from "../api/request";

export const getAllUser = async () => {
    try {
        const response = await request.get('users');
        return response;
    } catch (e) {
        console.log(e);
    }
}

export const updateUser = async (id, data) => {
    try {
        const response = await request.update(`user/${id}`, data);
        return response;
    } catch (e) {
        console.log(e);
    }
}

export const createUser = async (data) => {
    try {
        const response = await request.create(`user`, data);
        return response;
    } catch (e) {
        console.log(e);
    }
}

export const deleteUser = async (id) => {
    try {
        await request.deleteObject(`user/${id}`);
    } catch (e) {
        console.log(e);
    }
}
