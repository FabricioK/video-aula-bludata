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
        const pageImage = new Image();
        pageImage.src =  imageSrc;
        pageImage.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = pageImage.naturalWidth;
            canvas.height= pageImage.naturalHeight;        
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(pageImage, 0, 0);
            saveScreenshot(canvas);
        }
        function saveScreenshot(canvas) {
            let fileName = "image"
            const link = document.createElement('a');
            link.download = fileName + '.png';
            canvas.toBlob(function(blob) {
                link.href = URL.createObjectURL(blob);
                link.click();
            });
        };
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

        if(seconds > props.tempo){
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