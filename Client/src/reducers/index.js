import categorySlice from 'container/category.slice';
import authSlice from 'container/auth.slice';

const rootReducer = {
    authState: authSlice,
    categoryState: categorySlice,
}

export default rootReducer;