const localStorage = window.localStorage.getItem('loggedAppUser')
    ? JSON.parse(window.localStorage.getItem('loggedAppUser'))
    : undefined;

const localProducts = window.localStorage.getItem('products')
    ? JSON.parse(window.localStorage.getItem('products'))
    : undefined;

const localProduct = window.localStorage.getItem('product')
    ? JSON.parse(window.localStorage.getItem('product'))
    : undefined;

const localservice = window.localStorage.getItem('service')
    ? JSON.parse(window.localStorage.getItem('service'))
    : undefined;


const initialState = {
    users: [],
    user: localStorage ? localStorage : {},
    products: localProducts ? localProducts : {},
    product: localProduct ? localProduct : {},
    profiles: [],
    services: localservice ? localservice : {},
    modal: { name: '', active: false },
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
        case 'DELETE_EVENT':
            return {
                ...state,
                events: state.events.filter(
                    (event) => event.id !== action.payload.id
                ),
            };
        case 'UPDATE_EVENT':
            return {
                ...state,
                events: state.events.map((event) =>
                    event.id === action.payload.id ? action.payload : event
                ),
            };
        case 'POST_EVENT':
            return {
                ...state,
                events: [...state.events, action.payload],
            };
        //SERVICES
        case 'GET_SERVICES':
            return {
                ...state,
                services: action.payload,
            };
        case 'GET_GRADE':
            return {
                ...state,
                grades: action.payload,
            };
        case 'DELETE_GRADE':
            return {
                ...state,
                grades: state.grades.filter(
                    (grade) => grade.id !== action.payload.id
                ),
            };
        case 'UPDATE_GRADE':
            return {
                ...state,
                grades: state.grades.map((grade) =>
                    grade.id === action.payload.id ? action.payload : grade
                ),
            };
        case 'POST_GRADE':
            return {
                ...state,
                grades: [...state.grades, action.payload],
            };
        //Courses
        case 'GET_USER_COURSES':
            return {
                ...state,
                courses: action.payload,
            };

        case 'GET_COURSE_ID':
            return {
                ...state,
                course: action.payload,
            };
        case 'GET_COURSE':
            return {
                ...state,
                course: action.payload,
            };

        case 'GET_COURSES_ALL':
            return {
                ...state,
                courses: action.payload,
            };

        //Notifications
        case 'GET_NOTIFICATIONS':
            return {
                ...state,
                notifications: action.payload,
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