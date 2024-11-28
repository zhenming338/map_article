import { createSlice } from "@reduxjs/toolkit";

const map = createSlice({
    name: "map",
    initialState: {
        animations: [
            {
                pageIndex: 1,
                mapState: {
                    center: [121.473701, 31.230416],
                    zoom: 10,
                    pitch: 45, // 初始俯视角度为 0
                    bearing: 0, // 初始旋转角度
                },
                populationBars: [
                    {
                        location: [121.473701, 31.230416], // 上海坐标
                        population: 414500 // 上海人数
                    },
                    {
                        location: [116.394653, 39.909808], // 北京坐标
                        population: 5000000 // 北京人数
                    },
                    {
                        location: [116.384653, 39.899808], // 北京坐标
                        population: 5000000 // 北京人数
                    },
                    {
                        location: [116.374653, 39.889808], // 北京坐标
                        population: 3000000 // 北京人数
                    },
                    {
                        location: [116.364653, 39.879808], // 北京坐标
                        population: 5000000 // 北京人数
                    },
                    {
                        location: [116.354653, 39.869808], // 北京坐标
                        population: 3000000 // 北京人数
                    },
                    {
                        location: [116.344653, 39.859808], // 北京坐标
                        population: 5000000 // 北京人数
                    },
                    {
                        location: [116.324653, 39.849808], // 北京坐标
                        population: 3000000 // 北京人数
                    },
                    {
                        location: [116.314653, 39.839808], // 北京坐标
                        population: 5000000 // 北京人数
                    }
                ],

            },

        ],
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