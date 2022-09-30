import express from "express";
import APIController from "../controller/APIController"
import homeController from "../controller/homeController";

let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/users', APIController.getAllUsers);

    router.post('/create-user', APIController.createNewUser);

    router.put('/edit-user', APIController.editUser);

    router.delete('/delete-user/:userId', APIController.deleteUser);

    return app.use('/api/v1/', router);
}

export default initAPIRoute;