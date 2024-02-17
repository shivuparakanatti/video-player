import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
//import { storage, db } from './firebase';
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { v4 } from "uuid";
import { Upload } from "lucide-react";
import { useDispatch } from "react-redux";
import { addNewVideo } from "../features/videoSlice";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../src/App.css";

const UploadForm = () => {
  const [title, setTitle] = useState();
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [perc, setPerc] = useState();



  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uploadToDatabase = (url) => {
    let docData = {
      mostRecentUploadURL: url,
      username: title,
    };
    const userRef = doc(db, "users", docData.username);
    setDoc(userRef, docData, { merge: true })
      .then(() => {
        console.log("successfully updated DB");
      })
      .catch((error) => {
        console.log("errrror");
      });
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    if (!file) {
      console.log("No file selected.");
      return;
    }

    const storageRef = ref(storage, `videos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Track upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setIsLoading(true);
        console.log(`Upload Progress: ${progress}%`);
        setPerc(Math.round(progress));
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      () => {
        // Upload completed successfully
        console.log("Upload successful!");
        setIsLoading(false);

        // Get download URL
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            // Handle the download URL (e.g., save to state or database)
            console.log("Download URL:", downloadURL);
            uploadToDatabase(downloadURL);
            dispatch(addNewVideo({ title: title, url: downloadURL }));
            navigate("/");
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      }
    );
  };

  return (
    <div className="text-white bg-black relative">
      <form
        className={`my-24 ${isLoading ? " blur-md" : ""}  `}
        onSubmit={handleSubmit}
      >
        <div className="  flex flex-col  gap-8 items-center justify-center  ">
          <h1 className="flex text-4xl">Upload video</h1>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="title" className="text-2xl">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="w-48 h-8 flex items-center text-black"
              placeholder="video title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="disc" className="text-2xl">
              Descption
            </label>
            <textarea
              type="text"
              className="w-48  h-16 flex items-start text-black"
              name="disc"
              placeholder="video Discreption"
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2 w-48">
            <label htmlFor="video">Video upload</label>
            <input
              type="file"
              name="video"
              className="flex flex-col items-center justify-center "
              onChange={handleFile}
            />
          </div>
          <button
            className="flex gap-2 bg-blue-700 px-4 py-2"
            onClick={handleClick}
          >
            <Upload />
            Upload
          </button>
        </div>
      </form>
      <div
        className={`absolute top-[10%] right-[35%] bg-opacity-40 px-40 py-40 ${
          isLoading ? " flex" : "hidden"
        }`}
      >
        {isLoading ? (
          <CircularProgressbar
            className=" h-[20vh]"
            value={perc}
            text={`${perc}%`}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UploadForm;
