import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GameState } from "../../models/types";

export const initialState: GameState = {
    status: 'idle',
    questions: [],
    teams: [],
    currentQuestionIndex: 0,
    currentQuestion: null,
    answerOptions: [],
    activeTeamId: null,
    activeAnswerOptionId: null,
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state) => {
            state.status = 'playing';
        },
        endGame: (state) => {
            state.status = 'finished';
        },
        nextQuestion: (state) => {
            state.currentQuestionIndex++;
        },
        answerQuestion: (state, action: PayloadAction<string>) => {
            state.activeAnswerOptionId = action.payload;
        },
        selectTeam: (state, action: PayloadAction<string>) => {
            state.activeTeamId = action.payload;
        },
    },
});

export const { startGame, endGame, nextQuestion, answerQuestion, selectTeam } = gameSlice.actions;
export default gameSlice.reducer;
