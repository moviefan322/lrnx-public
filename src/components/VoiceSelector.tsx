import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { getClient } from "../redux/basic/basicActions";
import { setGradioResponse } from "../redux/basic/basicSlice";
import styles from "./VoiceSelector.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { dataURItoBlob } from "../utils/dataURItoBlob.util";
import LoadingSpinner from "./LoadingSpinner";
import { voices } from "@/utils/voices";
import { FaArrowRight } from "react-icons/fa6";

interface VoiceSelectorProps {
  mediaBlobUrl?: Blob;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = () => {
  const { isLoading, isError, isSuccess } = useAppSelector(
    (state) => state.basicReducer
  );
  const [blob, setBlob] = useState<Blob>({ type: "audio/wav" } as Blob);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(
    router.query.mediaBlobUrl as string
  );
  const [isInitial, setIsInitial] = useState<boolean>(false);
  const [isMale, setIsMale] = useState<boolean>(false);
  const [isFemale, setIsFemale] = useState<boolean>(false);
  const [isViewAll, setViewAll] = useState<boolean>(true);
  const femaleVoices = voices.filter((voice) => voice.sex === "Female");
  const maleVoices = voices.filter((voice) => voice.sex === "Male");
  const enabledVoices = voices.filter((voice) => voice.enabled);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);

  useEffect(() => {
    if (!mediaBlobUrl) {
      const base64AudioData = localStorage.getItem("base64AudioData");
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

        const reader = new FileReader();
        reader.onload = () => {
          const base64Audio = reader.result as string;
          localStorage.setItem("base64AudioData", base64Audio);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        if (error) {
          router.push("/");
        }
      }
    }

    // Save the base64 encoded audio to your server or perform other actions
  }, [mediaBlobUrl, router]);

  useEffect(() => {
    convertToBase64();
  }, [convertToBase64, mediaBlobUrl]);

  useEffect(() => {
    if (isSuccess) {
      router.push("/voice-playback");
    }
  }, [isSuccess, router]);

  const handleVoiceClick = (selectedVoiceArg: string) => {
    const selectedVoiceObj = voices.find(
      (voice) => voice.name === selectedVoiceArg
    );
    if (selectedVoiceObj!.enabled) {
      setSelectedVoice(selectedVoiceArg);
      voices.forEach((voice) => {
        voice.isSelected = false;
      });
      selectedVoiceObj!.isSelected = true;
    } else {
      alert("This voice doesn't exist yet");
    }
  };

  const handleVoiceSelect = async (selectedVoiceArg: string) => {
    setSelectedVoice(null);
    voices.forEach((voice) => {
      voice.isSelected = false;
    });
    if (localStorage.getItem(`${selectedVoiceArg}`)) {
      dispatch(
        setGradioResponse(localStorage.getItem(`${selectedVoiceArg}`) as string)
      );
      router.push("/voice-playback");
    } else {
      try {
        await convertToBase64();
        await dispatch(
          getClient({ audioFile: blob, selectedVoice: selectedVoiceArg })
        );
      } catch (error: any) {
        throw new Error("Something went wrong: " + error);
      }
    }
  };

  const handleMaleSelection = () => {
    setIsInitial(false);
    setIsMale(true);
    setIsFemale(false);
  };

  const handleFemaleSelection = () => {
    setIsInitial(false);
    setIsMale(false);
    setIsFemale(true);
  };

  const handleViewAll = () => {
    setIsInitial(false);
    setViewAll(true);
    setIsMale(false);
    setIsFemale(false);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.container}>
      {isInitial && (
        <>
          <h2 className={styles.sexH2}>Choose a voice profile</h2>
          <div className={styles.sexButtons}>
            <button onClick={handleMaleSelection}>
              Male profiles <FaArrowRight />
            </button>
            <button onClick={handleFemaleSelection}>
              Female profiles <FaArrowRight />
            </button>
          </div>
          <button className={styles.viewAll} onClick={handleViewAll}>
            View All
          </button>
        </>
      )}
      {isMale && (
        <>
          <h2>Male Profiles</h2>
          <br />
          <ul className={styles.voicesList}>
            {maleVoices.map((voice, index) => (
              <li key={index} className={styles.voicesListItem}>
                <button
                  style={{
                    border: "none",
                    background: "none",
                    padding: 0,
                    margin: 0,
                    cursor: "pointer",
                    color: "black",
                  }}
                  onClick={() => handleVoiceClick(voice.name)}
                >
                  <span
                    className={`${styles.voiceName} ${
                      voice.isSelected && styles.selectedVoice
                    }`}
                  >{`${voice.description}`}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.nextDiv}>
            <button
              className={`${styles.nextButton}`}
              onClick={() => handleVoiceSelect(selectedVoice as string)}
              disabled={!selectedVoice}
            >
              Next <FaArrowRight />
            </button>
          </div>
        </>
      )}
      {isFemale && (
        <>
          <h2>Female Profiles</h2>
          <br />
          <ul className={styles.voicesList}>
            {femaleVoices.map((voice, index) => (
              <li key={index} className={styles.voicesListItem}>
                <button
                  style={{
                    border: "none",
                    background: "none",
                    padding: 0,
                    margin: 0,
                    cursor: "pointer",
                    color: "black",
                  }}
                  onClick={() => handleVoiceClick(voice.name)}
                >
                  <span
                    className={`${styles.voiceName} ${
                      voice.isSelected && styles.selectedVoice
                    }`}
                  >{`${voice.description}`}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.nextDiv}>
            <button
              className={styles.nextButton}
              onClick={() => handleVoiceSelect(selectedVoice as string)}
              disabled={!selectedVoice}
            >
              Next <FaArrowRight />
            </button>
          </div>
        </>
      )}
      {isViewAll && (
        <>
          <h2>Choose a Voice Profile</h2>
          <br />
          <ul className={styles.voicesList}>
            {enabledVoices.map((voice, index) => (
              <li key={index} className={styles.voicesListItem}>
                <button
                  style={{
                    border: "none",
                    background: "none",
                    padding: 0,
                    margin: 0,
                    cursor: "pointer",
                    color: "black",
                  }}
                  onClick={() => handleVoiceClick(voice.name)}
                >
                  <span
                    className={`${styles.voiceName} ${
                      voice.isSelected && styles.selectedVoice
                    }`}
                  >{`${voice.displayName}`}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.nextDiv}>
            <button
              className={`${styles.nextButton}`}
              onClick={() => handleVoiceSelect(selectedVoice as string)}
              disabled={!selectedVoice}
            >
              Next <FaArrowRight />
            </button>
          </div>
        </>
      )}
      {isError && (
        <>
          <p className={styles.error}>
            {isError}
            <Link href="/">
              {" "}
              <FaArrowRight />
            </Link>
          </p>
        </>
      )}
    </div>
  );
};

export default VoiceSelector;
