import React from 'react';
import Image from 'next/image';
import styles from './microphone.module.css'

 interface MicrophoneButtonProps {
    buttonColor: string;
    onClick: () => void
}

const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({buttonColor = '#28a745', onClick}) => {


  return (
    <button 
        type="button"
        className={styles.microphone}
        style={{background: buttonColor}}
        onClick={onClick}
    >
        <i className="fas fa-microphone" style={{ fontSize: '50px' }}> </i>
        {/* add flaticons later */}
        {/* <Image src="@/assets/icons/microphone-icon.svg" alt="Microphone Icon" className="microphone-icon" /> */}
    </button>
  );
};

export default MicrophoneButton;