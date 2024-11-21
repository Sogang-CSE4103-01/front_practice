import BodyText from '@enact/sandstone/BodyText';
import { Header, Panel } from '@enact/sandstone/Panels';
import TabLayout, { Tab } from '@enact/sandstone/TabLayout';
import { useMainState } from './MainState';
import SelectableVideoPlayer from './VideoPlayer';
import Scroller from '@enact/sandstone/Scroller';
import ImageItem from '@enact/sandstone/ImageItem';// eslint-disable-next-line
import { Button, Item, Icon } from '@enact/sandstone';
import css from './Main.module.less';
import $L from '@enact/i18n/$L';
import { scaleToRem } from '@enact/ui/resolution';
import { useState, useEffect } from 'react';

const tabsWithIcons = [
	{ title: 'Home', icon: 'home' },
	{ title: 'Button', icon: 'gear' },
	{ title: 'Item', icon: 'trash' }
];

const Main = (props) => {
    const { videoData } = useMainState();
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [activeTab, setActiveTab] = useState('videoTab');
    const [innerActiveTab, setInnerActiveTab] = useState('watching');

    useEffect(() => {
        console.log(videoData);
    }, [videoData]);

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
    };

    const handleClosePlayer = () => {
        setSelectedVideo(null);
    };

    const renderImageItem = (video) => (
        <ImageItem
            inline
            key={video.id}
            label={video.title} // 비디오 제목을 레이블로 사용
            src={video.thumbnail} // 썸네일 소스
            style={{
                width: scaleToRem(900),
                height: scaleToRem(588)
            }}// eslint-disable-next-line
            onClick={() => handleVideoClick(video)} // 클릭 시 비디오 선택
        >
            {video.title} {/* 비디오 제목을 표시 */}
        </ImageItem>
    );

    return (
        <Panel {...props}>
            {selectedVideo && (// eslint-disable-next-line
                <SelectableVideoPlayer video={selectedVideo} onClose={handleClosePlayer} />
            )}

            <Header title={$L('LG')} />

            <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
                <TabLayout
                    selected={activeTab}// eslint-disable-next-line
                    onSelect={(tabId) => {
                        console.log('Selected Tab:', tabId);
                        const selectedTabKey = ['videoTab', 'recommended', 'additional'][tabId.index];
                        setActiveTab(selectedTabKey);
                        setInnerActiveTab('watching'); // 내부 탭 초기화
                    }}
                    orientation="vertical" // 바깥쪽 탭을 세로로 설정
                    style={{ width: '100%' }} // 바깥쪽 탭 너비 설정
                >
                    <Tab title={tabsWithIcons[0].title} icon={tabsWithIcons[0].icon}>
                        <TabLayout
                            selected={innerActiveTab}// eslint-disable-next-line
                            onSelect={(tabId) => {
                                const selectedInnerTabKey = ['watching', 'recommended', 'additional'][tabId.index];
                                setInnerActiveTab(selectedInnerTabKey);
                            }}
                            orientation="horizontal" // 내부 탭을 가로로 설정
                        >
                            <Tab title={$L('시청 중인 영상')}>
                                <Scroller
                                    direction="vertical"
                                    style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}
                                >
                                    <div className={css.videoGrid}>
                                        {videoData.length > 0 ? videoData.slice(0, 19).map(renderImageItem) : <BodyText>{'비디오가 없습니다.'}</BodyText>}
                                    </div>
                                </Scroller>
                            </Tab>
                            <Tab title={$L('추천 영상')}>
                                <Scroller
                                    direction="vertical"
                                    style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}
                                >
                                    <div className={css.videoGrid}>
                                        {videoData.length > 5 ? videoData.slice(5, 10).map(renderImageItem) : <BodyText>{'비디오가 없습니다.'}</BodyText>}
                                    </div>
                                </Scroller>
                            </Tab>
                            <Tab title={$L('추가 섹션')}>
                                <Scroller
                                    direction="vertical"
                                    style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}
                                >
                                    <BodyText className={css.description}>
                                        {Array(100).fill('이곳은 추가 섹션입니다. 더 많은 내용을 추가해 주세요.').map((text, index) => (
                                            <div key={index}>{text}</div>
                                        ))}
                                    </BodyText>
                                </Scroller>
                            </Tab>
                        </TabLayout>
                    </Tab>
                    <Tab title={tabsWithIcons[1].title} icon={tabsWithIcons[1].icon}>
                        <TabLayout
                            selected={innerActiveTab}// eslint-disable-next-line
                            onSelect={(tabId) => {
                                const selectedInnerTabKey = ['watching', 'recommended', 'additional'][tabId.index];
                                setInnerActiveTab(selectedInnerTabKey);
                            }}
                            orientation="horizontal" // 내부 탭을 가로로 설정
                        >
                            <Tab title={$L('시청 중인 영상')}>
                                <Scroller
                                    direction="vertical"
                                    style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}
                                >
                                    <div className={css.videoGrid}>
                                        {videoData.length > 0 ? videoData.slice(5, 16).map(renderImageItem) : <BodyText>{'비디오가 없습니다.'}</BodyText>}
                                    </div>
                                </Scroller>
                            </Tab>
                            <Tab title={$L('추천 영상')}>
                                <Scroller
                                    direction="vertical"
                                    style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}
                                >
                                    <div className={css.videoGrid}>
                                        {videoData.length > 5 ? videoData.slice(5, 10).map(renderImageItem) : <BodyText>{'비디오가 없습니다.'}</BodyText>}
                                    </div>
                                </Scroller>
                            </Tab>
                            <Tab title={$L('추가 섹션')}>
                                <Scroller
                                    direction="vertical"
                                    style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}
                                >
                                    <BodyText className={css.description}>
                                        {Array(20).fill('이곳은 추가 섹션입니다. 더 많은 내용을 추가해 주세요.').map((text, index) => (
                                            <div key={index}>{text}</div>
                                        ))}
                                    </BodyText>
                                </Scroller>
                            </Tab>
                        </TabLayout>
                    </Tab>
                    <Tab title={tabsWithIcons[2].title} icon={tabsWithIcons[2].icon}>
                        <Item slotBefore={<Icon>playcircle</Icon>}>Single Item</Item>
                    </Tab>
                </TabLayout>

            </div>
        </Panel>
    );
};

export default Main;
