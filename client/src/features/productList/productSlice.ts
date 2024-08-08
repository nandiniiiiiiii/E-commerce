import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductsByFilters, fetchProductById } from './productAPI';

const initialState = {
    products: [],
    status: 'idle',
    totalItems: 0,
    selectProduct: null
}

export const fetchAllProductsAsync: any = createAsyncThunk(
    'product/fetchAllProducts',
    async () => {
        const response: any = await fetchAllProducts()
        console.log(response.data)
        return response.data;
    }
);

export const fetchProductByIdAsync: any = createAsyncThunk(
    'product/fetchProductById',
    async (id: number) => {
        const response: any = await fetchProductById(id);
        return response.data;
    }
);

export const fetchProductsByFiltersAsync: any = createAsyncThunk(
    'product/fetchProductsByFilters',
    async ({ filter, sort, pagination }) => {
        const response: any = await fetchProductsByFilters(filter, sort, pagination);
        console.log(response.data + "hello")
        return response.data;
    }
);

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProductsAsync.pending, (state: any) => {
                state.status = 'loading';
            })
            .addCase(fetchAllProductsAsync.fulfilled, (state: any, actions: any) => {
                state.status = 'idle';
                state.products = actions.payload;
            })
            .addCase(fetchProductsByFiltersAsync.pending, (state: any) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsByFiltersAsync.fulfilled, (state: any, actions) => {
                state.status = 'idle';
                // state.products = actions.payload;
                state.products = actions.payload.products;
                state.totalItems = actions.payload.totalItems;
            })
            .addCase(fetchProductByIdAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.selectProduct = action.payload;
            })
    }
});

export const selectAllProducts = (state: any) => state.product.products;
export const selectTotalProducts = (state: any) => state.product.totalItems;
export const selectProductByID = (state: any) => state.product.selectProduct;
export default productSlice.reducer;