export const ROUTES = {
    PRIVATE: {
        DASHBOARD: '/home',
        NOT_FOUND: '/404',
        ADMIN_ROUTE: {
            CLIENT_LIST: '/client-list',
        },
        USER_ROUTE: {
            USER_PROFILE: '/user-profile',
        }
    },
    PUBLIC: {
        LOGIN: '/login',
        SIGN_UP: '/register',
    }
};

export const DEFAULT_PAGE = ROUTES.PRIVATE.DASHBOARD;