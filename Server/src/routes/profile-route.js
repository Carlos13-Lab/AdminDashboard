const Router = require('express');

const { Newprofile, profileGet, profileGetById, updateProfiles, ProfilesDelete } = require('../controllers/profiles_controllers');
// const { validateJWT } = require('../middlewares/validateJWT');

const route = Router();

// route.use(validateJWT)
route.post('/createprofile/:id', Newprofile)
     .get('/', profileGet)
     .get('/:id', profileGetById)
     .put('/:id', updateProfiles)
     .delete('/:id', ProfilesDelete)


module.exports = route;