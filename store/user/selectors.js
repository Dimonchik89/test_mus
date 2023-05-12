import { createSelector } from "@reduxjs/toolkit";

const baseState = state => state.user
export const userId = createSelector(baseState, state => state.userId)
export const userEmail = createSelector(baseState, state => state.userEmail)
export const userRole = createSelector(baseState, state => state.userRole)