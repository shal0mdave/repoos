import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { GetGithubRepoRequestType, RepoType } from '../../types';
import GithubRepoService from '../../services/githubRepo.service';

export const getGithubRepos = createAsyncThunk(
    'github/getRepos',
    async (params: GetGithubRepoRequestType, { rejectWithValue }) => {
        try {
            const response = await GithubRepoService.getRepos(params);
            return {
                status: response.status,
                repos: response.data.items,
            };
        } catch (error:any) {
            return rejectWithValue(error);
        }
    }
);

type initialStateType = {
    repos: RepoType[];
    status: number;
    message: string;
    loading: boolean;
};

const initialState = {
    repos: [],
    status: 0,
    message: '',
    loading: false,
} as initialStateType;

const githubReposSlice = createSlice({
    name: 'githubRepos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGithubRepos.pending, (state, action) => {
            return {
                ...state,
                status: 0,
                message: '',
                loading: true,
            }
        });
        builder.addCase(getGithubRepos.fulfilled, (state, action) => {
            return {
                ...state,
                repos: action.payload.repos,
                status: action.payload.status,
                loading: false,
            }
        });
        builder.addCase(getGithubRepos.rejected, (state, action:any) => {
            return {
                ...state,
               status: action.payload.status,
               message: action.payload.message,
               loading: false,
            }
        });
    }
});

export const githubReposReducer = githubReposSlice.reducer;
