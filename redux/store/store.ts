import { configureStore } from '@reduxjs/toolkit';

import { githubReposReducer } from '../slices/githubRepo.slice';

const reducer = {
    githubRepos: githubReposReducer
};

export const Store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof Store.getState>;

export type AppDispatch = typeof Store.dispatch;