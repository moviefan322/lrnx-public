// MicrophoneSelector.js
import React, { useState, useEffect, ChangeEventHandler } from 'react';

interface MicrophoneSelectorProps {
    onSelected: () => void
}

const MicrophoneSelector: React.FC<MicrophoneSelectorProps> = ({ onSelected }) => {
  const [devices, setDevices] = useState<Array<MediaDeviceInfo>>([]);

  useEffect(() => {
    
    const fetchDevices = async ()=> {
      try {
        const mediaDevices = await navigator.mediaDevices.enumerateDevices();
        const audioInputs = mediaDevices.filter(
          (device) => device.kind === 'audioinput'
        );
        setDevices(audioInputs);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchDevices();
  }, []);

  const handleChange: ChangeEventHandler<HTMLSelectElement> = () => {
    if (onSelected) {
      onSelected();
    }
  };

  return (
    <select onChange={handleChange}>
      <option value="">Select Microphone</option>
      {devices.map((device) => (
        <option key={device.deviceId} value={device.deviceId}>
          {device.label || device.deviceId}
        </option>
      ))}
    </select>
  );
};

export default MicrophoneSelector;
