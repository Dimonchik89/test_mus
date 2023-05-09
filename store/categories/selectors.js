import { createSelector } from "@reduxjs/toolkit";

const baseState = state => state.categories;

export const categories = createSelector(baseState, state => state.categories)