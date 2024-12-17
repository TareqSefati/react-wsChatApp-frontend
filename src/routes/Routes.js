export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    PRODUCTS: "/products",
    BOOKS: "/books",
    DASHBOARD: "/dashboard",
    ABOUT: "/about",
    FAQ: "/faq",
    USER_LOGGEDIN: {
        STATIC: "/user/:id",
        DYNAMIC: (id) => `/user/${id}`,
    },
    SINGLE_PRODUCT: {
        STATIC: "/products/:id",
        DYNAMIC: (id) => `/products/${id}`,
    },
    SINGLE_BOOK: {
        STATIC: "/books/:id",
        DYNAMIC: (id) => `/books/${id}`,
    },
    SINGLE_CATEGORY: {
        STATIC: "/categories/:name",
        DYNAMIC: (name) => `/categories/${name}`,
    },
  };