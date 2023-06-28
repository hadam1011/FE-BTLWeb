import * as request from '../api/request'

export const getAllComment = async () => {
    try {
        const response = await request.get('comments');
        return response;
    } catch (e) {
        console.log(e);
    }
}

export const createComment = async (data) => {
    try {
        const response = await request.create('comment', data);
        return response;
    } catch (e) {
        console.log(e);
    }
}

export const deleteComment = async (id) => {
    try {
        await request.deleteObject(`comment/${id}`);
    } catch (e) {
        console.log(e);
    }
}