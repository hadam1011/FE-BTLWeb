import * as request from "../api/request"

export const getAllCategory = async () => {
    try {
        const response = await request.get('/categories');
        return response;
    } catch (err) {
        console.log(err);
    }
}