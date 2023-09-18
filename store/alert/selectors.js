import { createSelector } from "@reduxjs/toolkit";

const baseState = state => state.alert;

export const openAlert = createSelector(baseState, state => state.openAlert)