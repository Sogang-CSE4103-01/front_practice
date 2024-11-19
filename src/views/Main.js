import BodyText from '@enact/sandstone/BodyText';
import { Header, Panel } from '@enact/sandstone/Panels';
import { useMainState } from './MainState'; // 비디오 데이터 import
import SelectableVideoPlayer from './VideoPlayer'; // SelectableVideoPlayer 컴포넌트 import
import Scroller from '@enact/sandstone/Scroller'; // Scroller import
import css from './Main.module.less';
import $L from '@enact/i18n/$L';
import { useState } from 'react';

const Main = (props) => {
    const { videoData } = useMainState(); // 비디오 데이터 가져오기
    const [selectedVideo, setSelectedVideo] = useState(null); // 선택된 비디오 상태

    // 비디오 데이터를 임의로 분배하기
    const watchingVideos = videoData.slice(0, 5); // 첫 5개 비디오
    const recommendedVideos = videoData.slice(5, 20); // 나머지 비디오

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
            {selectedVideo && (
                <SelectableVideoPlayer video={selectedVideo} onClose={handleClosePlayer} />
            )}

            <Scroller
                direction="vertical" // 수직 스크롤
                style={{ height: '100vh', overflowY: 'auto' }} // 전체 창 높이 설정 및 오버플로우 설정
            >
                <Header title={$L('YouTube Clone')} />
                <BodyText className={css.description} size="large">
                    {$L('이곳은 유튜브 메인 화면을 모방한 샘플 애플리케이션입니다.')}
                </BodyText>

                <div className={css.section}>
                    <BodyText className={css.sectionTitle} size="large">
                        {$L('시청중인 영상')}
                    </BodyText>
                    <Scroller
                        direction="vertical" // 수직 스크롤
                        style={{ height: '600px' }} // 높이 조정
                    >
                        <div className={css.videoGrid}>
                            {watchingVideos.map(renderVideoCard)}
                        </div>
                    </Scroller>
                </div>

                <div className={css.section}>
                    <BodyText className={css.sectionTitle} size="large">
                        {$L('추천 영상')}
                    </BodyText>
                    <Scroller
                        direction="vertical" // 수직 스크롤
                        style={{ height: '600px' }} // 높이 조정
                    >
                        <div className={css.videoGrid}>
                            {recommendedVideos.map(renderVideoCard)}
                        </div>
                    </Scroller>
                </div>

                {/* 추가 섹션들 */}
                <div className={css.section}>
                    <BodyText className={css.sectionTitle} size="large">
                        {$L('추가 섹션 1')}
                    </BodyText>
                    <BodyText className={css.description}>
                        {Array(20).fill('이곳은 추가 섹션입니다. 더 많은 내용을 추가해 주세요.').map((text, index) => (
                            <div key={index}>{text}</div>
                        ))}
                    </BodyText>
                </div>

                <div className={css.section}>
                    <BodyText className={css.sectionTitle} size="large">
                        {$L('추가 섹션 2')}
                    </BodyText>
                    <BodyText className={css.description}>
                        {Array(20).fill('이곳은 추가 섹션입니다. 더 많은 내용을 추가해 주세요.').map((text, index) => (
                            <div key={index}>{text}</div>
                        ))}
                    </BodyText>
                </div>

                <div className={css.section}>
                    <BodyText className={css.sectionTitle} size="large">
                        {$L('추가 섹션 3')}
                    </BodyText>
                    <BodyText className={css.description}>
                        {Array(20).fill('이곳은 추가 섹션입니다. 더 많은 내용을 추가해 주세요.').map((text, index) => (
                            <div key={index}>{text}</div>
                        ))}
                    </BodyText>
                </div>

            </Scroller>
        </Panel>
    );
};

export default Main;
