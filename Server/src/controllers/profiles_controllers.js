const { serverError, success, error } = require('../helpers/response.js');
const Profiles = require('../models/profiles.js');


const { newProfile, findByIdProfile, findByIdandUpdate } = require('../services/profiles_service.js')


const Newprofile = async (req, res) => {
    const { body } = req;

    const {id} = req.params;

    let saved = {};
    try {
        savedProfile = await newProfile({id,body} );
        saved = savedProfile;
    } catch (err) {
        return serverError({
            res,
            message: err.message,
            status: 500
        });
    }
  
    return success({
        res,
        message: 'profile creation successfully',
        data: saved,
        status: 201
    });
}
const profileGet = async (req, res) => {
    const { limit, from} = req.query
    let data = {}
    try {
        const [total, profiles] = await Promise.all([
            await Profiles.countDocuments(),
            await Profiles.find().skip(Number(from))
                .limit(Number(limit)).populate({ path: 'product', select: 'email' })
                .exec(),
        ]);
        data = {
            profiles,
            total,
        };
        return success({
            res,
            message: "get API - list of profile",
            data,
            status: 201,
        });
    } catch (error) {
        console.error(`Error in profileGet:${error}`);
        return serverError({
            res,
            message: "Error getting list of profile",
            status: 400
        });
    }
};
const profileGetById = async (req, res) => {
    try {
        const { id } = req.params;
        const profiles = await findByIdProfile(id)

        return success({
            res,
            message: "get API - list of Profiles for ID",
            data: profiles,
            status: 201,
        });
    } catch (error) {
        console.error(`Error in profilesGetById:${error}`);
        return serverError({
            res,
            message: 'Error getting profiles',
            status: 500
        });
    }
};

const updateProfiles = async (req, res) => {
    const { id } = req.params;

    const { body } = req;

    let data = {};

    try {
        data = await findByIdandUpdate({ id, body });
    } catch (err) {
        return serverError({
            res,
            message: err.message,
            status: 500
        });
    }

    if (Object.keys(data).length > 0) {
        return success({
            res,
            message: 'Profile updated',
            data,
            status: 201,
        });
    }

    return error({
        res,
        message: 'profiles not found',
        status: 404
    });
};

const ProfilesDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const profile = await Profiles.findByIdAndDelete(id);

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        return res.status(201).json({
            message: "Profile deleted successfully",
            data: profile,
        });
    } catch (error) {
        console.error(`Error in ProfilesDelete: ${error}`);
        return res.status(500).json({ message: "Error deleting a profile" });
    }
};


module.exports = {
    Newprofile,
    profileGet,
    profileGetById,
    updateProfiles,
    ProfilesDelete
}