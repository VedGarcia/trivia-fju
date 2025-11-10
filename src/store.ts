import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "./services/persistence";

import { questionsSlice } from "./features/admin/questionsSlice";
import { gameSlice, initialState as gameInitialState } from "./features/game/gameSlice";

const QUESTIONS_KEY = 'questions';
const GAME_KEY = 'game';

const persistedQuestions = loadState(QUESTIONS_KEY);
const persistedGame = loadState(GAME_KEY);

export const store = configureStore({
    reducer: {
        questions: questionsSlice.reducer,
        game: gameSlice.reducer,
    },
    preloadedState: {
        questions: persistedQuestions || [],
        game: persistedGame || gameInitialState,
    },
});

store.subscribe(() => {
    saveState(QUESTIONS_KEY, store.getState().questions);
    saveState(GAME_KEY, store.getState().game);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

