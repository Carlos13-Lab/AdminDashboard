const localStorage = window.localStorage.getItem('loggedAppUser')
    ? JSON.parse(window.localStorage.getItem('loggedAppUser'))
    : undefined;

const localProducts = window.localStorage.getItem('products')
    ? JSON.parse(window.localStorage.getItem('products'))
    : undefined;

const localProduct = window.localStorage.getItem('product')
    ? JSON.parse(window.localStorage.getItem('product'))
    : undefined;

const localservice = window.localStorage.getItem('services')
    ? JSON.parse(window.localStorage.getItem('services'))
    : undefined;

const localService = window.localStorage.getItem('services')
    ? JSON.parse(window.localStorage.getItem('services'))
    : undefined;

const localSales = window.localStorage.getItem('sales')
    ? JSON.parse(window.localStorage.getItem('sales'))
    : undefined;


const initialState = {
    users: [],
    service: localService ? localService : {},
    user: localStorage ? localStorage : {},
    products: localProducts ? localProducts : {},
    product: localProduct ? localProduct : {},
    profiles: [],
    services: localservice ? localservice : {},
    modal: { name: '', active: false },
    sales: localSales ? localSales : {},
    usersTotal: '',
    productsTotal: ''
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        // USERS
        case 'GET_USERS':
            return {
                ...state,
                users: action.payload,
            };
        case 'GET_USER':
            return {
                ...state,
                user: action.payload,
            };
        case 'GET_USER_TOTAL':
            return {
                ...state,
                usersTotal: action.payload,
            };
        case 'GET_PRODUCTS_TOTAL':
            return {
                ...state,
                productsTotal: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: {},
            };
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
                
            };
        //PRODUCTS
        case 'GET_PRODUCT':
            return {
                ...state,
                product: action.payload,
            };
        case 'GET_PRODUCTS':
            return {
                ...state,
                products: action.payload,
            };
        //SERVICES
        case 'GET_SERVICES':
            return {
                ...state,
                services: action.payload,
            };
        //Sale
        case 'GET_SALES':
            return {
                ...state,
                sales: action.payload,
            };

        // Profile
        case 'GET_PROFILES':
            return {
                ...state,
                profiles: action.payload,
            };

        // Modal
        case 'MODAL_SHOW':
            return {
                ...state,
                modal: action.payload,
            };

        case 'MODAL_HIDE':
            return {
                ...state,
                modal: action.payload,
            };

        default:
            return state;
    }
}

export default rootReducer;