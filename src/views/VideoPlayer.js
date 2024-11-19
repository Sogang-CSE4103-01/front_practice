// src/views/VideoPlayer.js
import kind from '@enact/core/kind';
import Button from '@enact/sandstone/Button';
import { MediaControls } from '@enact/sandstone/MediaPlayer';
import VideoPlayer from '@enact/sandstone/VideoPlayer';
import { useCallback, useRef, useState } from 'react';
import './VideoPlayer.css'; // CSS 파일 추가

const SelectableVideoPlayer = ({ video, onClose }) => {
    const videoRef = useRef(null);
    const [selection, setSelection] = useState([]);

    const handleToggleSelection = useCallback(() => {
        const { currentTime } = videoRef.current.getMediaState();

        if (selection.length !== 1) {
            setSelection([currentTime]);
        } else {
            setSelection([selection[0], currentTime].sort((a, b) => a - b));
        }
    }, [selection]);

    const handleTimeUpdate = useCallback(() => {
        if (selection.length === 2) {
            const [selectionStart, selectionEnd] = selection;
            const { currentTime } = videoRef.current.getMediaState();

            if (currentTime > selectionEnd || currentTime < selectionStart) {
                videoRef.current.seek(selectionStart);
            }
        }
    }, [selection]);

    const handleSeekOutsideSelection = useCallback((ev) => {
        ev.preventDefault();

        if (selection.length === 2) {
            const [selectionStart, selectionEnd] = selection;
            const { time: currentTime } = ev;

            if (currentTime < selectionStart) {
                videoRef.current.seek(selectionStart);
            } else if (currentTime > selectionEnd) {
                videoRef.current.seek(selectionEnd);
            }
        }
    }, [selection]);

    const setVideo = (video) => {
        videoRef.current = video;
    };

    const selecting = selection.length === 1;

    return (
        <div className="video-modal"> {/* 모달 스타일 적용 */}
            <VideoPlayer
                loop
                onSeekOutsideSelection={handleSeekOutsideSelection}
                onTimeUpdate={handleTimeUpdate}
                selection={selection}
                ref={setVideo}
            >
                <MediaControls>
                    <Button onClick={handleToggleSelection} selected={selecting}>
                        {selecting ? 'Play Loop' : 'Set End Time'}
                    </Button>
                    <Button onClick={onClose}>닫기</Button>
                </MediaControls>
                <source src={video.src} />
            </VideoPlayer>
        </div>
    );
};

export default SelectableVideoPlayer;
