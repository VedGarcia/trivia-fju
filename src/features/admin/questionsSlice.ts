import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Question } from "../../models/types";

export const initialState: Question[] = [];

export const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        addQuestion: (state, action: PayloadAction<Question>) => {
            state.push(action.payload);
        },
        removeQuestion: (state, action: PayloadAction<string>) => {
            return [...state.filter((question) => question.id !== action.payload)];
        },
        updateQuestion: (state, action: PayloadAction<Question>) => {
            const index = state.findIndex((question) => question.id === action.payload.id);
            if (index !== -1) {
                return [...state.slice(0, index), action.payload, ...state.slice(index + 1)];
            }
            return state;
        },
    },
});