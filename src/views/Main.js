// src/views/Main.js
import BodyText from '@enact/sandstone/BodyText';
import { Header, Panel } from '@enact/sandstone/Panels';
import { useMainState } from './MainState';
import SelectableVideoPlayer from './VideoPlayer'; // SelectableVideoPlayer 컴포넌트 import
import css from './Main.module.less';
import $L from '@enact/i18n/$L';
import { useState } from 'react';

const Main = (props) => {
    const { videoData } = useMainState();
    const [selectedVideo, setSelectedVideo] = useState(null); // 선택된 비디오 상태

    const watchingVideos = videoData.slice(0, 3);
    const recommendedVideos = videoData.slice(3, 9);

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
    };

    const handleClosePlayer = () => {
        setSelectedVideo(null);
    };

    const renderVideoCard = (video) => (
        <div key={video.id} className={css.videoCard} onClick={() => handleVideoClick(video)}>
            <img src={video.thumbnail} alt={video.title} className={css.thumbnail} />
            <BodyText className={css.videoTitle} size="medium">
                {video.title}
            </BodyText>
        </div>
    );

    return (
        <Panel {...props}>
            <Header title={$L('YouTube Clone')} />
            <BodyText className={css.description} size="large">
                {$L('이곳은 유튜브 메인 화면을 모방한 샘플 애플리케이션입니다.')}
            </BodyText>

            {selectedVideo && (
                <SelectableVideoPlayer video={selectedVideo} onClose={handleClosePlayer} />
            )}

            <div className={css.section}>
                <BodyText className={css.sectionTitle} size="large">
                    {$L('시청중인 영상')}
                </BodyText>
                <div className={css.videoGrid}>
                    {watchingVideos.map(renderVideoCard)}
                </div>
            </div>

            <div className={css.section}>
                <BodyText className={css.sectionTitle} size="large">
                    {$L('추천 영상')}
                </BodyText>
                <div className={css.videoGrid}>
                    {recommendedVideos.map(renderVideoCard)}
                </div>
            </div>
        </Panel>
    );
};

export default Main;
