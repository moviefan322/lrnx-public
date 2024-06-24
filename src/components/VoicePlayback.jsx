import React, { Suspense, useState, useCallback, useEffect } from "react";

import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { resetState, resetSuccess } from "@/redux/basic/basicSlice";
import { useRouter } from "next/router";
import LoadingSpinner from "@/components/LoadingSpinner";
import Button from "@/components/Button";
import styles from "./Button.module.css";
import { dataURItoBlob,  } from "../utils/dataURItoBlob.util";
import { getMobileOperatingSystem } from "../utils/platformDetect.util"
import { bufferToWave } from "../utils/bufferToWave.util"
  // Example usage:
  // Assuming `sourceBuffer` is an AudioBuffer from somewhere (e.g., from an XMLHttpRequest)


const VoicePlayback = () => {
  //TODO: anti pattern, fix this
  let { data } = useAppSelector((state) => state.basicReducer.gradioResponse);
  const router = useRouter();
  // const platformOS = getMobileOperatingSystem();

  const { queryParams } = useAppSelector((state) => state.basicReducer);
  const [blob, setBlob] = useState({ type: "audio/wav" });

  const [mediaBlobUrl, setMediaBlobUrl] = useState(router.query.mediaBlobUrl);


  const dispatch = useAppDispatch();
  
  const webShareSupported = "canShare" in navigator;
  const shareOrDownloadButtonText = webShareSupported ? "Share" : "Download";
  // const [blob, setBlob ] = useState(null)

  const [shareLink, setShareLink] = useState("")

  if (data === "") {
    data = localStorage.getItem("gradioData");
    console.log(`data: ${data}`);
  }

  console.log(`data: ${data}`);


  // const shareRecording = useCallback(async () => {
  //     console.log("navigator.share is not available");
  //     downloadRecording();
  // }, [downloadRecording]);

  useEffect(() => {
    // dispatch(resetSuccess());
    if (!mediaBlobUrl) {
      const base64AudioData = localStorage.getItem("base64AudioData");
      if (base64AudioData) {
        const audioBlobFromLocal = dataURItoBlob(base64AudioData);
        // const wavBlob = bufferToWave(audioBlobFromLocal, audioBlobFromLocal.size);
        // let url = URL.createObjectURL(wavBlob);
        setBlob(audioBlobFromLocal);
        setMediaBlobUrl(URL.createObjectURL(audioBlobFromLocal));
      }
    }
  }, [mediaBlobUrl]);

  const handleChangeVoice = () => {
    dispatch(resetSuccess());
    router.push({
      pathname: "/voice-select",
      query: queryParams,
    });
  };

  const downloadRecording = useCallback(() => {
    const link = document.getElementById("hiddenDownloadLink");
    link.href = data;
    link.download = "audio_recording.wav"; // or .mp3 depending on the format
        link.style.display = "none";

    link.click();
    setShareLink(link);
  }, [data]);

  const createShareLink = useCallback(() => {
    const link = document.getElementById("hiddenDownloadLink");
    link.download = "audio_recording.wav";
    link.style.display = "none";
    link.href = data;
    link.click();
    setShareLink(link);
    downloadRecording()
  }, [data, downloadRecording]);

  const shareOrDownload = useCallback(
    async (
      fileName = "audio_recording.wav",
      title = "Laronix Recording",
      text = "Listen to this voice recording"
    ) => {
      try {
        // createShareLink();
        if (webShareSupported) {
          
          const audioData =  {
            // files: [
            //   new File([blob], fileName, {
            //     type: blob.type,
            //   }),
            // ],
            title,
            text,
            url: data
          } ;
          if(navigator.canShare(audioData)) {
            (await navigator.share(audioData));
          }
        }
        else {     
          // Fallback implementation.
          // Using the Web Share API.
          createShareLink()

        }
      } catch (error) {
        console.log(`error download file: ${error}`);
        // createShareLink();
      }
    },
    [createShareLink, data, webShareSupported]
  );

  return (
    <div className={styles.container}>
      <Suspense fallback={<LoadingSpinner />}>
        <div>
          <h2>Share your voice sample</h2>
          <audio src={data} controls autoPlay className="mt-4 mb-4" />
        </div>
        <div className={styles.buttonContainer}>
          <Button
            id="changeVoiceButton"
            label="Change Voice"
            faIcon="fa-arrow-left"
            onClick={() => handleChangeVoice()}
          />
          <Button
            id="shareOrDownloadButton"
            label={shareOrDownloadButtonText}
            onClick={() => shareOrDownload()}
            faIcon="fa-share-alt"
          />
        </div>
        <a download id="hiddenDownloadLink" style={{ display: "none" }} />
      </Suspense>
    </div>
  );
};

export default VoicePlayback;