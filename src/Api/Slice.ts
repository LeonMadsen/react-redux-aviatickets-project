import { RootState } from '../Api/Store'; // Импортируем тип RootState
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTickets } from './FetchTickets';  // Импорт загрузки билетов

const getParamsFetch = (state: RootState) => state.tickets.paramsFetch;

export const btnViewCheapReducer = createAsyncThunk(
    'tickets/btnViewCheapReducer',
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState; // Указываем тип состояния
        const updatedParams = { ...getParamsFetch(state), sortPrice: 'price', sortDuratuon: '' };
        dispatch(setSortParams(updatedParams));
        dispatch(fetchTickets());
    }
);

export const btnViewFastReducer = createAsyncThunk(
    'tickets/btnViewFastReducer',
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState;
        const updatedParams = { ...getParamsFetch(state), sortPrice: '', sortDuratuon: 'duration' };
        dispatch(setSortParams(updatedParams));
        dispatch(fetchTickets());
    }
);

export const btnViewOptimalReducer = createAsyncThunk(
    'tickets/btnViewOptimalReducer',
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState;
        const updatedParams = { ...getParamsFetch(state), sortPrice: 'price', sortDuratuon: 'duration' };
        dispatch(setSortParams(updatedParams));
        dispatch(fetchTickets());
    }
);

export const ticketsSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        setSortParams: (state, action) => {
            state.paramsFetch = action.payload;
            state.listTickets = []; // Очищаем список перед загрузкой новых билетов
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchTickets.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(fetchTickets.fulfilled, (state, { payload }) => {
            state.listTickets.push(...payload);
            state.status = "idle";
        })
        .addCase(fetchTickets.rejected, (state, { payload }) => {
            if (payload) state.error = payload.message; 
            state.status = "idle";
        });
    },
});

export const { setSortParams } = ticketsSlice.actions;
export const selectListTickets = (state: RootState) => state.tickets.listTickets;