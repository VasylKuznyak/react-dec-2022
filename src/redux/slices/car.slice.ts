import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {ICar} from "../../interfaces";
import {carService} from "../../services";

interface IState {
    cars: ICar[];
}

const initialState: IState = {
    cars: [],
}

const getAllThunk = createAsyncThunk<ICar[], void>(
    'carSlice/getAllThunk',
    async () => {
        const {data} = await carService.getAll();
        return data;
    }
);

const createCarThunk = createAsyncThunk<ICar, { car: ICar }>(
    'carSlice/createCarThunk',
    async ({car}) => {
        const {data} = await carService.postCar(car);
        return data;
    }
);

const deleteByIdThunk = createAsyncThunk<{ id: string }, { id: string }>(
    'carSlice/deleteByIdThunk',
    async ({id}) => {
        await carService.deleteById(id);
        return {id};
    }
);

const carSlice = createSlice({
        name: 'carSlice',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(getAllThunk.fulfilled, (state, action) => {
                    state.cars = action.payload;
                })
                .addCase(createCarThunk.fulfilled, (state, action) => {
                    state.cars.push(action.payload);
                })
                .addCase(deleteByIdThunk.fulfilled, (state, action) => {
                    const index = state.cars.findIndex((car) => car.id === action.payload.id);
                    state.cars.splice(index, 1);
                })
        }
    }
);

const {reducer: carReducer} = carSlice;

const carActions = {getAllThunk, createCarThunk, deleteByIdThunk};

export {
    carReducer,
    carActions
};

