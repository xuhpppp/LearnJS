import express from "express";
import homeController from "../controller/homeController";
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');
let router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + "/src/public/image/");
    },

    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'only img file';

        return cb(new Error('only img file'), false);
    }

    cb(null, true);
}

let upload = multer({storage: storage, fileFilter: imageFilter});

const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage);

    router.get('/detail/user/:userId', homeController.getDetailPage);

    router.post('/create-new-user', homeController.createNewUser);

    router.post('/delete-user', homeController.deleteUser);

    router.get('/edit-user/:userId', homeController.getEditPage);

    router.post('/postUpdateUser', homeController.postUpdateUser);

    router.get('/upload', homeController.getUploadFilePage);

    router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.handleUploadFile);

    return app.use('/', router);
}

export default initWebRoute;