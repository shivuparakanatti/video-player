import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"



const initialState = {

    allVideos : [{title:'Sample Video',url:'https://firebasestorage.googleapis.com/v0/b/video-player-1d374.appspot.com/o/videos%2Fvideo%20(2160p).mp4?alt=media&token=dada6020-7190-4f65-9627-d7611eb56596'}]
}


const videoSlice=createSlice({
    name : 'videos',
    initialState,
    reducers : {
        addNewVideo : (state,action)=>{
          
            const video = {
                
                    title : action.payload.title,
                    url : action.payload.url,
                   
                
            }
            state.allVideos.push(video)

    },
    
}
})
export const {addNewVideo} = videoSlice.actions
export default videoSlice.reducer