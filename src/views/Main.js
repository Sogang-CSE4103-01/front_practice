import BodyText from '@enact/sandstone/BodyText';
import { Header, Panel } from '@enact/sandstone/Panels';
import TabLayout, { Tab } from '@enact/sandstone/TabLayout'; // TabLayout과 Tab import
import { useMainState } from './MainState'; // 비디오 데이터 import
import SelectableVideoPlayer from './VideoPlayer'; // SelectableVideoPlayer 컴포넌트 import
import Scroller from '@enact/sandstone/Scroller'; // Scroller import
import css from './Main.module.less';
import $L from '@enact/i18n/$L';
import { useState, useEffect } from 'react';

const Main = (props) => {
    const { videoData } = useMainState(); // 비디오 데이터 가져오기
    const [selectedVideo, setSelectedVideo] = useState(null); // 선택된 비디오 상태
    const [activeTab, setActiveTab] = useState('watching'); // 현재 활성화된 탭

    // 비디오 데이터 로드 상태 확인
    useEffect(() => {
        console.log(videoData); // 비디오 데이터 확인
    }, [videoData]);

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
    };

    const handleClosePlayer = () => {
        setSelectedVideo(null);
    };

    const renderVideoCard = (video) => (// eslint-disable-next-line
        <div key={video.id} className={css.videoCard} onClick={() => handleVideoClick(video)}>
            <img src={video.thumbnail} alt={video.title} className={css.thumbnail} />
            <BodyText className={css.videoTitle} size="medium">
                {video.title}
            </BodyText>
        </div>
    );

    const renderActiveSection = () => {
        switch (activeTab) {
            case 'watching':
                return videoData.length > 0 ? videoData.slice(0, 5).map(renderVideoCard) : <BodyText>{'비디오가 없습니다.'}</BodyText>;
            case 'recommended':
                return videoData.length > 5 ? videoData.slice(5, 10).map(renderVideoCard) : <BodyText>{'비디오가 없습니다.'}</BodyText>;
            case 'additional':
                return (
                    <BodyText className={css.description}>
                        {Array(20).fill('이곳은 추가 섹션입니다. 더 많은 내용을 추가해 주세요.').map((text, index) => (
                            <div key={index}>{text}</div>
                        ))}
                    </BodyText>
                ); // "추가 섹션"
            default:
                return null;
        }
    };

    return (
        <Panel {...props}>
            {selectedVideo && (// eslint-disable-next-line
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

                <TabLayout
                    selected={activeTab}// eslint-disable-next-line
                    onSelect={(tabId) => {
                        console.log('Selected Tab:', tabId); // 탭 ID 출력
                        const selectedTabKey = ['watching', 'recommended', 'additional'][tabId.index]; // 인덱스에 맞는 tabKey 설정
                        setActiveTab(selectedTabKey); // 탭 선택 시 activeTab 업데이트
                    }}
                    orientation="horizontal" // 가로 탭으로 설정
                >
                    <Tab title={$L('시청 중인 영상')} tabKey="watching" />
                    <Tab title={$L('추천 영상')} tabKey="recommended" />
                    <Tab title={$L('추가 섹션')} tabKey="additional" />
                </TabLayout>

                <div className={css.section}>
                    <BodyText className={css.sectionTitle} size="large">
                        {activeTab === 'watching' && $L('시청 중인 영상')}
                        {activeTab === 'recommended' && $L('추천 영상')}
                        {activeTab === 'additional' && $L('추가 섹션')}
                    </BodyText>
                    <Scroller
                        direction="vertical" // 수직 스크롤
                        style={{ height: '400px' }} // 높이 조정
                    >
                        <div className={css.videoGrid}>
                            {renderActiveSection()} {/* 현재 활성화된 섹션의 내용 렌더링 */}
                        </div>
                    </Scroller>
                </div>
            </Scroller>
        </Panel>
    );
};

export default Main;
