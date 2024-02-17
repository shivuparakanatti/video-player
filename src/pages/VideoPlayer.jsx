import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
const VideoPlayer = () => {
    const navigate = useNavigate()
  const { title } = useParams();
  const videos = useSelector((state) => {
    return state.videoSlice.allVideos;
  });

  const currentVideo = videos.filter((ele) => {
    return ele.title == title;
  });

  return (
    <div className="flex flex-col items-center justify-center gap-10 relative">
      <div className="text-white">VideoPlayer</div>
      <p className="absolute bg-blue-600 text-white top-5 px-4 py-2 left-10 md:left-40 cursor-pointer " onClick={()=>{navigate('/')}}>All Videos</p>
      <ReactPlayer
        url={currentVideo[0].url}
        controls
        playing={true}
        width={'60%'}
        height={"auto"}
      />
      <p className="text-white text-2xl">{currentVideo[0].title}</p>
    </div>
  );
};

export default VideoPlayer;
