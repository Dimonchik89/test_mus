import { createSelector } from "@reduxjs/toolkit";

const baseState = state => state.tracks

export const tracks = createSelector(baseState, state => state.tracks)
export const allTracksQty = createSelector(baseState, state => state.allTracksQty)
export const selectTrack = createSelector(baseState, state => state.selectTrack)
export const trackLoaded = createSelector(baseState, state => state.trackLoaded)