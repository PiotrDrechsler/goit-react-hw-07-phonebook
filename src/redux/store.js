import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { contactsSlice, filterSlice } from './reducer';

export const store = configureStore({
  reducer: combineReducers({
    contacts: contactsSlice.reducer,
    filter: filterSlice.reducer,
  }),
});
