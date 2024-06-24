// AudioRecorder.tsx
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setQueryParams } from "@/redux/basic/basicSlice";
import "bootstrap/dist/css/bootstrap.css";
import MicrophoneButton from "./Microphone";
import { fadeIn, bounceIn, fadeInTransition } from "../utils/animation.util";
import { useReactMediaRecorder } from "react-media-recorder";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./AudioRecorder.module.css";
import { voices } from "@/utils/voices";
import { resetState } from "@/redux/basic/basicSlice";

const AudioRecorder = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });

  const [buttonColor, setButtonColor] = useState<string>("#1e77f9");
  const [hasRecorded, setHasRecorded] = useState<boolean>(false);
  const [promptText, setPromptText] = useState<string>(
    "Click below to record your voice sample"
  );
  const [timer, setTimer] = useState<number>(30);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetState());
    if (localStorage.getItem("gradioData")) {
      localStorage.removeItem("gradioData");
    }
    if (localStorage.getItem("base64AudioData")) {
      localStorage.removeItem("base64AudioData");
    }
    voices.forEach((voice) => {
      if (localStorage.getItem(voice.name)) {
        localStorage.removeItem(voice.name);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    if (isRecording) {
      timerInterval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      clearInterval(timerInterval);
    };
  }, [isRecording]);

  useEffect(() => {
    if (timer === 0 && isRecording) {
      stopRecording();
      setButtonColor("#1e77f9");
      setIsRecording(false);
    }
  }, [isRecording, stopRecording, timer]);

  const chooseVoices = useCallback(async () => {
    if (status === "stopped") {
      const queryParams = {
        mediaBlobUrl,
      };
      dispatch(setQueryParams(queryParams as { mediaBlobUrl: string }));
      router.push({
        pathname: "/voice-select",
        query: queryParams,
      });
    }
  }, [dispatch, mediaBlobUrl, router, status]);

  useEffect(() => {
    chooseVoices();
  }, [chooseVoices, status]);

  const hitRecordButton = (e: void) => {
    if (buttonColor === "#1e77f9") {
      setButtonColor("red");
      startRecording();
      setPromptText("Listening");
      setIsRecording(true);
    } else {
      stopRecording();
      setButtonColor("#1e77f9");
      setIsRecording(false);
    }
  };

  return (
    <div className="container">
      <div className="row align-items-center h-100">
        <div className="col">
          <div className="row">
            <div className="col-12 pb-5">
              {/* @todo: load prompt text page based on state/route */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={fadeInTransition}
              >
                <h2 className="fw-semibold text-center"> {promptText} </h2>
              </motion.div>
            </div>
            <div className="col-12 d-flex justify-content-center">
              {!hasRecorded && (
                <motion.div
                  initial="initial"
                  animate="animate"
                  variants={bounceIn}
                >
                  {/* @todo: load main component in here */}
                  <MicrophoneButton
                    data-testid="microphone-button"
                    onClick={hitRecordButton}
                    buttonColor={buttonColor}
                  />
                  {isRecording && (
                    <h3
                      className={styles.timer}
                      style={timer <= 5 ? { color: "red" } : {}}
                    >
                      0:{timer}
                    </h3>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioRecorder;
