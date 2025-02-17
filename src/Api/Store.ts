import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ticketsSlice } from './Slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        tickets: ticketsSlice.reducer, // Вместо множества редьюсеров оставляем один
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;