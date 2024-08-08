import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteItemFromCart, fetchItemsByUserId, updateCart } from './CartAPI';

const initialState = {
    status: 'idle',
    items: [],
    cartLoaded: false
};

export const addToCartAsync: any = createAsyncThunk(
    'cart/addToCart',
    async (item: any) => {
        const response = await addToCart(item)
        return response.data
    }
);

export const fetchItemsByUserIdAsync: any = createAsyncThunk(
    'cart/fetchItemsByUserId',
    async (userId: number) => {
        const response = await fetchItemsByUserId(userId);
        return response.data;
    }
);

export const updateCartAsync: any = createAsyncThunk(
    'cart/updateCart',
    async (update) => {
        const response = await updateCart(update);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const deleteItemFromCartAsync: any = createAsyncThunk(
    'cart/deleteItemFromCart',
    async (itemId) => {
        const response = await deleteItemFromCart(itemId);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items.push(action.payload);
            })
            .addCase(fetchItemsByUserIdAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = action.payload;
            })
            .addCase(fetchItemsByUserIdAsync.rejected, (state) => {
                state.status = 'idle';
            })
            .addCase(updateCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCartAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.items.findIndex(item => item.id === action.payload.id)
                state.items[index] = action.payload;
            })
            .addCase(deleteItemFromCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.items.findIndex(item => item.id === action.payload.id)
                state.items.splice(index, 1);
            })
    }
})

export const selectItems = (state: any) => state.cart.items;
// export const selectCartStatus = (state) => stat  

export default cartSlice.reducer;