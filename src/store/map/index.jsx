import { createSlice } from "@reduxjs/toolkit";

const map = createSlice({
    name: "map",
    initialState: {
        animations: [],
        currentState: {
            animationsIndex: 0,
            center: [116, 40],
            zoom: 10,
            pitch: 0, // 初始俯视角度为 0
            bearing: 0, // 初始旋转角度
        }
    },
    reducers: {
        setAnimations(state, action) {
            state.animations = action.payload
        },
        setCurrentState(state, action) {
            state.currentState = action.payload
        }
    }
})

const { setAnimations, setCurrentState } = map.actions
export { setAnimations, setCurrentState }
export default map.reducer