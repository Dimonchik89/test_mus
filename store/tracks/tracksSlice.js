import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tracks: [],
    allTracksQty: 1,
    selectTrack: null,
    trackLoaded: false
}

const tracksSlice = createSlice({
    name: "tracks",
    initialState,
    reducers: {
        setTracks: (state, action) => {
            if(state.selectTrack && state.selectTrack?.play) {
                state.tracks = action.payload.map(item => {
                    if(item.id === state.selectTrack?.id) {
                        return {...item, play: true}
                    } else {
                        return {...item, play: false}
                    }
                })
            } else {
                state.tracks = action.payload?.map(item => ({...item, play: false}))
            }
        },
        setAllTracksQty: (state, action) => {
            state.allTracksQty = action.payload
        },
        setSelectTrack: (state, action) => {
            state.selectTrack = {...action.payload, play: false};
        },
        setChangeSelectTrackPlay: (state, action) => {
            state.selectTrack = {...state.selectTrack, play: !state.selectTrack?.play}
        },
        setChangePlay: (state, action) => {
            state.tracks = state.tracks.map(item => {
                if(item.id === action.payload) {
                    return {...item, play: !item.play}
                } else {
                    return {...item, play: false}
                }
            })
        },
        setTrackLoaded: (state, action) => {
            state.trackLoaded = action.payload
        },
        removeSelectTrack: (state) => {
            state.selectTrack = null
        },
        stopAllTrack: (state) => {
            state.tracks = state.tracks?.map(item => ({...item, play: false}))
        }
    }
})

const {actions, reducer} = tracksSlice
export const {setAllTracksQty, setTracks, setSelectTrack, setChangePlay, setChangeSelectTrackPlay, setTrackLoaded, removeSelectTrack, stopAllTrack} = actions
export default reducer