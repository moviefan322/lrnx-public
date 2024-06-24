import { getClient } from "../redux/basic/basicActions";
import { useAppDispatch } from "../hooks/reduxHooks";
import { useAppSelector } from "../hooks/reduxHooks";
import { useRouter } from "next/router";
import { b64Sample } from "../utils/b64Sample";
import { dataURItoBlob } from "../utils/dataURItoBlob.util";
import React, { useEffect, useState, useCallback } from "react";

function Test() {
  const { isLoading, isError, isSuccess } = useAppSelector(
    (state) => state.basicReducer
  );
  const [blob, setBlob] = useState<Blob>({ type: "audio/wav" } as Blob);
  const [gradioResponse, setGradioResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [requestSent, setRequestSent] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(
    router.query.mediaBlobUrl as string
  );
  const [responseTimer, setResponseTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    if (isSuccess || isError) {
      setIsTimerRunning(false);
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (!mediaBlobUrl) {
      const base64AudioData = b64Sample;
      if (base64AudioData) {
        const audioBlobFromLocal = dataURItoBlob(base64AudioData);
        setBlob(audioBlobFromLocal);
        setMediaBlobUrl(URL.createObjectURL(audioBlobFromLocal));
      }
    }
  }, [mediaBlobUrl]);

  const convertToBase64 = useCallback(async () => {
    if (mediaBlobUrl) {
      try {
        const response = await fetch(mediaBlobUrl as RequestInfo | URL);
        const blob = await response.blob();
        setBlob(blob);
      } catch (error: any) {
        setError(error);
      }
    }
  }, [mediaBlobUrl]);

  useEffect(() => {
    convertToBase64();
  }, [convertToBase64, mediaBlobUrl]);

  const handleVoiceClick = async () => {
    try {
      setResponseTimer(0);
      setIsTimerRunning(true);
      await convertToBase64();
      const response = await dispatch(
        getClient({ audioFile: blob, selectedVoice: "Female2" })
      );
      setGradioResponse(response);
      setRequestSent(true);
    } catch (error: any) {
      setError(error);
    }
  };

  useEffect(() => {
    if (isTimerRunning) {
      const timer = setInterval(() => {
        setResponseTimer((prevTime) => prevTime + 0.01);
      }, 10);

      return () => clearInterval(timer);
    }
  }, [isTimerRunning]);

  if (isLoading) {
    return (
      <>
        <div>Loading...</div>
        <h2>Elapsed time: {responseTimer.toFixed(2)}</h2>
      </>
    );
  }

  return (
    <div style={{ color: "black" }}>
      <button onClick={() => handleVoiceClick()}>TEST</button>
      <p>Testing Response:</p>
      {/* Display the data from gradioResponse */}

      {requestSent && !isLoading && gradioResponse && (
        <pre>{JSON.stringify(gradioResponse, null, 2)}</pre>
      )}

      {requestSent &&
        !isLoading &&
        gradioResponse &&
        gradioResponse.type === "basic/getClient/fulfilled" && (
          <>
            <h1>✅✅✅✅</h1>
            <br />
            <br />
            <h2>Response Time: {responseTimer.toFixed(2)} seconds</h2>
          </>
        )}

      {requestSent &&
        !isLoading &&
        gradioResponse &&
        gradioResponse.type === "basic/getClient/rejected" && (
          <>
            <h1>❌❌❌❌</h1>
            <br />
            <br />
            <h2>Response Time: {responseTimer.toFixed(2)} seconds</h2>
          </>
        )}

      <h1 className="error">{error as string}</h1>
      {error}
    </div>
  );
}

export default Test;
