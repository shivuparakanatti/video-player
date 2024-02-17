import { Play, Plus } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();

  const handleUpload = () => {
    navigate("/uploadvideo");
  };

  const videos = useSelector((state) => {
    return state.videoSlice.allVideos;
  });
  console.log(videos);

  return (
    <div className="mx-4 sm:mx-12 md:mx-24">
      <div className="flex flex-row items-center justify-between">
        <div className="bg-blue-600 flex flex-row items-center justify-center gap-1 rounded-md hover:scale-105  text-white h-8 w-24 ">
          <Plus color="#fdfcfc" />
          <button onClick={handleUpload}>Upload</button>
        </div>
        <div className="text-blue-400 flex items-center justify-center">
          <h1 className="text-2xl">Video Uploader</h1>
        </div>
      </div>
      <div className="flex flex-col gap-8 items-center justify-center my-12">
        <div className="text-white text-2xl">
          <h1>Watch Recent Videos</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-flow-col-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {videos &&
            videos.map((ele) => {
              return (
                <div
                  className="text-white flex flex-col gap-3 relative"
                  onClick={() => {
                    navigate(`/videos/${ele.title}`);
                  }}
                >
                  <video
                    src={ele.url}
                    className="hover:opacity-75 group cursor-pointer"
                  ></video>
                  <p className="text-xl">{ele.title}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
