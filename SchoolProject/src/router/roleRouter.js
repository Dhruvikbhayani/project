import express from 'express';
import controllers from '../controller'
import auth from '../middleware/auth'
import adminAuth from '../middleware/admin';

const router = express.Router()

router.route('/')
    .post(auth, adminAuth, controllers.roleController.createRole)
    .get(auth, adminAuth, controllers.roleController.getAllRole)

router.route('/:id')
    .get(auth, adminAuth, controllers.roleController.getRole)
    .put(auth, adminAuth, controllers.roleController.updateRole)
    .delete(auth, adminAuth, controllers.roleController.removeRole)


export default router