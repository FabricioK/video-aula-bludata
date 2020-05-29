import React, { useState, useEffect } from 'react';
import Webcam from "react-webcam";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

const WebcamCapture = (props) => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(true);

    const webcamRef = React.useRef(null);

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            var myHeaders = new Headers();
            var myInit = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    imageSrc
                })
              };

            fetch(props.uploadImageUrl, myInit);

        },
        [webcamRef]
    );

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }

        if (seconds > props.tempo) {
            capture();
            setSeconds(0);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    return (
        <>
            <Webcam
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={videoConstraints}
            />
        </>
    );
};

export default WebcamCapture;