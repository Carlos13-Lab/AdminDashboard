import axios from 'axios';


//=============================
//           USER
//=============================
export function getUsers() {
    return async function (dispatch) {
        var json = await axios.get('/user');
        return dispatch({
            type: 'GET_USERS',
            payload: json.data.data.user,     
        });
    };

}
export function getUsertotal() {
    return async function (dispatch) {
        var json = await axios.get('/user');
        return dispatch({
            type: 'GET_USER_TOTAL',
            payload: json.data.data.total,
        });
    };
}
export function getUser(id) {
    return async function (dispatch) {
        var json = await axios.get(`/user/${id}`);

        return dispatch({
            type: 'GET_USER',
            payload: json.data,
        });
    };
}

export function PostUserProduct(id) {
    return async function (dispatch) {
        var json = await axios.post(`/user/${id}`);
        return dispatch({
            type: 'GET_USER',
            payload: json.data,
        });
    };
}

export function deleteUser(id, ) {
    return async function (dispatch) {

        await axios.delete('/user/' + id);
        var json = await axios.get('/user');
        console.log(json.data);
        return dispatch({
            type: 'GET_USERS',
            payload: json.data.data.user,
        });
    };
}

export function updateUser(data, id) {
    return async function (dispatch) {
        await axios.put('/user/' + id, data);
        var json = await axios.get('/user');
        return dispatch({
            type: 'GET_USERS',
            payload: json.data.data.user,
        });
    };
}

export function AddUser(data) {
    return async function (dispatch) {
        await axios.post('/user/', data);
        console.log(data)
        var json = await axios.get('/user');
        return dispatch({
            type: 'GET_USERS',
            payload: json.data.data.user,
        });
    };
}

export function getProfiles() {
    return async function (dispatch) {
        let json = await axios.get(`/profile/`);

        return dispatch({
            type: 'GET_PROFILES',
            payload: json.data.data.profiles
        });
    };
}

//============================
//         LOGIN
//============================

export function logout() {
    return async function (dispatch) {
        return dispatch({
            type: 'LOGOUT',
            payload: {},
        });
    };
}

export function login({ email, password, role }) {
    let data = { email, password };
    return async function (dispatch) {
        var json = await axios.post(`/auth/login`, data);
        const resRole = json.data.data.user.role;
        if (resRole != role) {
            if (resRole != 'admin') {
                throw new Error('Incorrect role');
            }
        }
        return dispatch({
            type: 'LOGIN',
            payload: json.data.data,
        });
    };
}

//============================
//         Service
//============================

export function addServices(data) {
    return async function (dispatch) {
        await axios.post('/service/createservice', data);
        let json = await axios.get("/service");
        return dispatch({
            type: 'GET_SERVICES',
            payload: json.data.data.service
        });
    };
}

export function GetServices() {
    return async function (dispacht) {
        let json = await axios.get("/service");
        return dispacht({
            type: 'GET_SERVICES',
            payload: json.data.data.service,
        });
    };
}

export function deleteServices(id, data) {
    return async function (dispacht) {
        await axios.delete(`/service/${id}`, data);
        let json = await axios.get(`/service/`);
        return dispacht({
            type: 'GET_SERVICES',
            payload: json.data.data.service,
        });
    };
}

export function updateService(id, data) {
    return async function (dispacht) {

        await axios.put(`/service/${id}`, data);
        console.log(data, id)
        let services = await axios.get(`/service`);
        services = services.data.data.service;

        return dispacht({
            type: 'GET_SERVICES',
            payload: services,
        });
    };
}

//============================
//         PRODUCTS
//============================


export function getProducttotal() {
    return async function (dispatch) {
        var json = await axios.get('/product');
        return dispatch({
            type: 'GET_PRODUCTS_TOTAL',
            payload: json.data.data.total,
        });
    };
}


export function getProductById(id) {
    return async function (dispatch) {
        var json = await axios.get(`/user/${id}`);
        window.localStorage.setItem(
            'courses',
            JSON.stringify(json.data.data.user.courses)
        );
        return dispatch({
            type: 'GET_USER_COURSES',
            payload: json.data.data.user.courses,
        });
    };
}
export function getProducts() {
    return async function (dispatch) {
        var json = await axios.get('/product/');
        window.localStorage.setItem(
            'products',
            JSON.stringify(json.data.data.product)
        );
        return dispatch({
            type: 'GET_PRODUCTS',
            payload: json.data.data.product,
        });
    };
}

export function deleteProduct(id) {
    return async function (dispatch) {
        await axios.delete(`/product/${id}`);
        let products = await axios.get(`/product`);
        products = products.data.data.product;
        window.localStorage.setItem('products', JSON.stringify(products));
        return dispatch({
            type: 'GET_PRODUCTS',
            payload: products,
        });
    };
}

export function updateProduct( id, data) {
    return async function (dispatch) {
        await axios.put(`/product/${id}`, data);
        var json = await axios.get('/product');
        return dispatch({
            type: 'GET_PRODUCTS',
            payload: json.data.data.product
        });
    };
}
export function AddProduct(id, data ) {
    return async function (dispatch) {
        await axios.post(`/product/createproduct/${id}`, data);
        let products = await axios.get(`/product`);
        products = products.data.data.product;
        window.localStorage.setItem('products', JSON.stringify(products));
        return dispatch({
            type: 'GET_PRODUCTS',
            payload: products,
        });
    };
}
//============================ 
//       Sale
//============================

export function getSales() {
    return async function (dispatch) {
        var json = await axios.get('/sale');
        return dispatch({
            type: 'GET_SALES',
            payload: json.data.data.sale
        });
    };
}


export const addSale = (data) => async (dispatch) => {
    try {
        console.log(data)
        await axios.post('/sale/createSale', data);
        const response = await axios.get('/sale');
        console.log(response.data.data.sale)
        dispatch({
            type: 'GET_SALES',
            payload: response.data.data.sale,
        });
    } catch (error) {
        console.error('Error adding sale:', error);
    }
};


export function deleteSale(id) {
    return async function (dispatch) {

        await axios.delete('/sale/delete/' + id);
        var json = await axios.get('/sale');
        console.log(json.data.data.sale);
        return dispatch({
            type: 'GET_USERS',
            payload: json.data.data.sale,
        });
    };
}

//============================
//        MODAL
//============================

export function showModal(modal) {
    return async function (dispacht) {
        let obj = {
            name: modal,
            active: true,
        };
        return dispacht({
            type: 'MODAL_SHOW',
            payload: obj,
        });
    };
}

export function hideModal() {
    return async function (dispacht) {
        let obj = {
            name: '',
            active: false,
        };
        return dispacht({
            type: 'MODAL_HIDE',
            payload: obj,
        });
    };
}