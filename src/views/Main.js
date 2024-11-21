import BodyText from '@enact/sandstone/BodyText';
import { Header, Panel } from '@enact/sandstone/Panels';
import TabLayout, { Tab } from '@enact/sandstone/TabLayout';
import { useMainState } from './MainState';
import SelectableVideoPlayer from './VideoPlayer';
import Scroller from '@enact/sandstone/Scroller';
import css from './Main.module.less';
import $L from '@enact/i18n/$L';
import { useState, useEffect } from 'react';

const Main = (props) => {
    const { videoData } = useMainState();
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [activeTab, setActiveTab] = useState('watching');

    useEffect(() => {
        console.log(videoData);
    }, [videoData]);

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
                direction="vertical"
                style={{ height: '100vh', overflowY: 'auto' }}
            >
                <Header title={$L('YouTube Clone')} />
                <BodyText className={css.description} size="large">
                    {$L('이곳은 유튜브 메인 화면을 모방한 샘플 애플리케이션입니다.')}
                </BodyText>

                <TabLayout
                    selected={activeTab}
                    onSelect={(tabId) => {
                        console.log('Selected Tab:', tabId);
                        const selectedTabKey = ['watching', 'recommended', 'additional'][tabId.index];
                        setActiveTab(selectedTabKey);
                    }}
                    orientation="horizontal"
                >
                    <Tab title={$L('시청 중인 영상')}>
                        <Scroller
                            direction="vertical"
                            style={{ height: '400px', overflowY: 'auto' }} // 각 탭의 스크롤 설정
                        >
                            <div className={css.videoGrid}>
                                {videoData.length > 0 ? videoData.slice(0, 5).map(renderVideoCard) : <BodyText>{'비디오가 없습니다.'}</BodyText>}
                            </div>
                        </Scroller>
                    </Tab>
                    <Tab title={$L('추천 영상')}>
                        <Scroller
                            direction="vertical"
                            style={{ height: '400px', overflowY: 'auto' }} // 각 탭의 스크롤 설정
                        >
                            <div className={css.videoGrid}>
                                {videoData.length > 5 ? videoData.slice(5, 10).map(renderVideoCard) : <BodyText>{'비디오가 없습니다.'}</BodyText>}
                            </div>
                        </Scroller>
                    </Tab>
                    <Tab title={$L('추가 섹션')}>
                        <Scroller
                            direction="vertical"
                            style={{ height: '400px', overflowY: 'auto' }} // 각 탭의 스크롤 설정
                        >
                            <BodyText className={css.description}>
                                {Array(20).fill('이곳은 추가 섹션입니다. 더 많은 내용을 추가해 주세요.').map((text, index) => (
                                    <div key={index}>{text}</div>
                                ))}
                            </BodyText>
                        </Scroller>
                    </Tab>
                </TabLayout>
            </Scroller>
        </Panel>
    );
};

export default Main;
