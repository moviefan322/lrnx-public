// useMicrophoneAccess.js
import { useState, useCallback } from 'react';

const useMicrophoneAccess = () => {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [accessStatus, setAccessStatus] = useState('idle');

  const requestMicrophoneAccess = useCallback(async () => {
    try {
      setAccessStatus('requesting');
      const constraints = { audio: true };
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      setAccessStatus('granted');
    } catch (err) {
      setError(err);
      setAccessStatus('denied');
    }
  }, []);

  const stopMicrophoneAccess = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  return {
    stream,
    error,
    accessStatus,
    requestMicrophoneAccess,
    stopMicrophoneAccess,
  };
};

export default useMicrophoneAccess;