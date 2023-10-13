import axios from 'axios';

//=============================
//           USER
//=============================
export const getUsers = () => async (dispatch) => {
    const json = await axios.get('/user');
    dispatch({
        type: 'GET_USERS',
        payload: json.data.data.user,
    });
};

export const getUsertotal = () => async (dispatch) => {
    const json = await axios.get('/user');
    dispatch({
        type: 'GET_USER_TOTAL',
        payload: json.data.data.total,
    });
};

export const getUser = (id) => async (dispatch) => {
    const json = await axios.get(`/user/${id}`);
    dispatch({
        type: 'GET_USER',
        payload: json.data,
    });
};

export const PostUserProduct = (id) => async (dispatch) => {
    const json = await axios.post(`/user/${id}`);
    dispatch({
        type: 'GET_USER',
        payload: json.data,
    });
};

export const deleteUser = (id) => async (dispatch) => {
    await axios.delete(`/user/${id}`);
    const json = await axios.get('/user');
    dispatch({
        type: 'GET_USERS',
        payload: json.data.data.user,
    });
};

export const updateUser = (data, id) => async (dispatch) => {
    await axios.put(`/user/${id}`, data);
    const json = await axios.get('/user');
    dispatch({
        type: 'GET_USERS',
        payload: json.data.data.user,
    });
};

export const AddUser = (data) => async (dispatch) => {
    await axios.post('/user/', data);
    const json = await axios.get('/user');
    dispatch({
        type: 'GET_USERS',
        payload: json.data.data.user,
    });
};
//============================
//         PROFILES
//============================

export const getProfiles = () => async (dispatch) => {
    const json = await axios.get(`/profile/`);
    dispatch({
        type: 'GET_PROFILES',
        payload: json.data.data.profiles,
    });
};

export const AddProfile = ( id, data ) => async (dispatch) => {
    await axios.post(`/profile/createprofile/${id}`, data);
    const json = await axios.get(`/profile/`);
    dispatch({
        type: 'GET_PROFILES',
        payload: json.data.data.profiles,
    });
};
export const UpdateProfile = (id, data) => async (dispatch) => {
    await axios.put(`/profile/${id}`, data);
    const json = await axios.get(`/profile/`);
    dispatch({
        type: 'GET_PROFILES',
        payload: json.data.data.profiles,
    });
};

export const deleteProfile = (id) => async (dispatch) => {
    await axios.delete(`/profile/${id}`);
    const json = await axios.get(`/profile/`);
    dispatch({
        type: 'GET_PROFILES',
        payload: json.data.data.profiles,
    });
};



//============================
//         LOGIN
//============================

export const logout = () => async (dispatch) => {
    dispatch({
        type: 'LOGOUT',
        payload: {},
    });
};

export const login = ({ email, password, role }) => async (dispatch) => {
    const data = { email, password };
    const json = await axios.post(`/auth/login`, data);
    const resRole = json.data.data.user.role;
    if (resRole !== role && resRole !== 'admin') {
        throw new Error('Incorrect role');
    }
    dispatch({
        type: 'LOGIN',
        payload: json.data.data,
    });
};

//============================
//         Service
//============================

export const addServices = (data) => async (dispatch) => {
    await axios.post('/service/createservice', data);
    const json = await axios.get("/service");
    dispatch({
        type: 'GET_SERVICES',
        payload: json.data.data.service,
    });
};

export const GetServices = () => async (dispatch) => {
    const json = await axios.get("/service");
    dispatch({
        type: 'GET_SERVICES',
        payload: json.data.data.service,
    });
};

export const deleteServices = (id, data) => async (dispatch) => {
    await axios.delete(`/service/${id}`, data);
    const json = await axios.get(`/service/`);
    dispatch({
        type: 'GET_SERVICES',
        payload: json.data.data.service,
    });
};

export const updateService = (id, data) => async (dispatch) => {
    await axios.put(`/service/${id}`, data);
    const services = await axios.get(`/service`);
    dispatch({
        type: 'GET_SERVICES',
        payload: services.data.data.service,
    });
};

//============================
//         PRODUCTS
//============================

export const getProducttotal = () => async (dispatch) => {
    const json = await axios.get('/product');
    dispatch({
        type: 'GET_PRODUCTS_TOTAL',
        payload: json.data.data.total,
    });
};

export const getProductById = (id) => async (dispatch) => {
    const json = await axios.get(`/user/${id}`);
    window.localStorage.setItem('courses', JSON.stringify(json.data.data.user.courses));
    dispatch({
        type: 'GET_USER_COURSES',
        payload: json.data.data.user.courses,
    });
};

export const getProducts = () => async (dispatch) => {
    const json = await axios.get('/product/');
    window.localStorage.setItem('products', JSON.stringify(json.data.data.product));
    dispatch({
        type: 'GET_PRODUCTS',
        payload: json.data.data.product,
    });
};

export const deleteProduct = (id) => async (dispatch) => {
    await axios.delete(`/product/${id}`);
    const products = await axios.get(`/product`);
    window.localStorage.setItem('products', JSON.stringify(products.data.data.product));
    dispatch({
        type: 'GET_PRODUCTS',
        payload: products.data.data.product,
    });
};

export const updateProduct = (id, data) => async (dispatch) => {
    await axios.put(`/product/${id}`, data);
    const json = await axios.get('/product');
    dispatch({
        type: 'GET_PRODUCTS',
        payload: json.data.data.product,
    });
};

export const AddProduct = (id, data) => async (dispatch) => {
    await axios.post(`/product/createproduct/${id}`, data);
    const products = await axios.get(`/product`);
    window.localStorage.setItem('products', JSON.stringify(products.data.data.product));
    dispatch({
        type: 'GET_PRODUCTS',
        payload: products.data.data.product,
    });
};

//============================
//       Sale
//============================

export const getSales = () => async (dispatch) => {
    const json = await axios.get('/sale');
    dispatch({
        type: 'GET_SALES',
        payload: json.data.data.sale,
    });
};


export const updateSale = (id, data) => async (dispatch) => {
    await axios.put(`/sale/${id}`, data);
    const json = await axios.get('/sale');
    dispatch({
        type: 'GET_PRODUCTS',
        payload: json.data.data.sale,
    });
};
export const addSale = (data) => async (dispatch) => {
    try {
        await axios.post('/sale/createSale', data);
        const response = await axios.get('/sale');
        dispatch({
            type: 'GET_SALES',
            payload: response.data.data.sale,
        });
    } catch (error) {
        console.error('Error adding sale:', error);
    }
};

export const deleteSale = (id) => async (dispatch) => {
    await axios.delete('/sale/delete/' + id);
    const json = await axios.get('/sale');
    dispatch({
        type: 'GET_USERS',
        payload: json.data.data.sale,
    });
};

//============================
//        MODAL
//============================

export const showModal = (modal) => async (dispatch) => {
    const obj = {
        name: modal,
        active: true,
    };
    dispatch({
        type: 'MODAL_SHOW',
        payload: obj,
    });
};

export const hideModal = () => async (dispatch) => {
    const obj = {
        name: '',
        active: false,
    };
    dispatch({
        type: 'MODAL_HIDE',
        payload: obj,
    });
};
