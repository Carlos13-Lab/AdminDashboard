const Router = require('express');
const ProfileController = require('../controllers/profile.controller');

const controller = new ProfileController()
// const { validateJWT } = require('../middlewares/validateJWT');

const route = Router();

// route.use(validateJWT)
route.post('/createprofile/', controller.create)
     .get('/', controller.getProfile)
     .get('/:id', controller.getById)
     .put('/:id', controller.update)
     .delete('/:id', controller.delete)


module.exports = route;