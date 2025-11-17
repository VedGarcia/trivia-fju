import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GameState, Team, Question } from "../../models/types";
import { clearState } from "../../services/persistence";
import type { AppDispatch } from "../../store";

const GAME_KEY = 'game'

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

export const resetGameState = () => (dispatch: AppDispatch) => {
    clearState(GAME_KEY);

    dispatch(gameSlice.actions.resetGame());
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state, action: PayloadAction<Question[]>) => {
            state.status = 'playing';
            state.questions = action.payload;
            state.currentQuestionIndex = 0;
            state.currentQuestion = action.payload[0] || null;
            state.answerOptions = action.payload[0]?.answerOptions || [];
        },
        endGame: (state) => {
            state.status = 'finished';
        },
        nextQuestion: (state) => {
            const nextIndex = state.currentQuestionIndex + 1;
            if (nextIndex < state.questions.length) {
                state.currentQuestionIndex = nextIndex;
                state.currentQuestion = state.questions[nextIndex];
                state.answerOptions = state.questions[nextIndex].answerOptions;
                state.activeAnswerOptionId = null;
            } else {
                state.status = 'finished';
            }
        },
        answerQuestion: (state, action: PayloadAction<string>) => {
            state.activeAnswerOptionId = action.payload;
        },
        selectTeam: (state, action: PayloadAction<string>) => {
            state.activeTeamId = action.payload;
        },
        addTeam: (state, action: PayloadAction<Team>) => {
            state.teams.push(action.payload);
        },
        removeTeam: (state, action: PayloadAction<string>) => {
            state.teams = state.teams.filter(team => team.id !== action.payload);
        },
        updateTeam: (state, action: PayloadAction<{ id: string; name: string }>) => {
            const team = state.teams.find(t => t.id === action.payload.id);
            if (team) {
                team.name = action.payload.name;
            }
        },
        updateScore: (state, action: PayloadAction<{ teamId: string; points: number; isCorrect: boolean }>) => {
            const team = state.teams.find(t => t.id === action.payload.teamId);
            if (team) {
                team.score += action.payload.points;
                team.questionsAnswered += 1;
                team.isCorrect = action.payload.isCorrect;
            }
        },
        resetGame: () => {
            return initialState;
        },
        resetScores: (state) => {
            // Reiniciar solo los scores y estadísticas de los equipos
            state.teams.forEach(team => {
                team.score = 0;
                team.questionsAnswered = 0;
                team.isCorrect = false;
                team.isFinished = false;
                team.isError = false;
            });
            // Reiniciar el juego al estado inicial pero manteniendo los equipos
            state.status = 'idle';
            state.currentQuestionIndex = 0;
            state.currentQuestion = null;
            state.answerOptions = [];
            state.activeTeamId = null;
            state.activeAnswerOptionId = null;
        },
    },
});

export const { startGame, endGame, nextQuestion, answerQuestion, selectTeam, addTeam, removeTeam, updateTeam, updateScore, resetGame, resetScores } = gameSlice.actions;
export default gameSlice.reducer;
