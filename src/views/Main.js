/*
import Alert from '@enact/sandstone/Alert';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import {Header, Panel} from '@enact/sandstone/Panels';
import {useMainState} from './MainState';
import css from './Main.module.less';
import $L from '@enact/i18n/$L';

const Main = props => {
	const {isPopupOpen, handlePopupClose, handleLaunchApp, videoData} = useMainState();

	return (
		<Panel {...props}>
			<Header title={$L('YouTube Clone')} />
			<BodyText>{$L('이곳은 유튜브 메인 화면을 모방한 샘플 애플리케이션입니다.')}</BodyText>
			<div className={css.videoGrid}>
				{videoData.map(video => (
					<div key={video.id} className={css.videoCard}>
						<img src={video.thumbnail} alt={video.title} className={css.thumbnail} />
						<BodyText className={css.videoTitle}>{video.title}</BodyText>
					</div>
				))}
			</div>
			<Alert type="overlay" open={isPopupOpen} onClose={handlePopupClose} closeButton={false}>
				<span>{$L('This is an alert message.')}</span>
				<buttons>
					<Button size="small" className={css.buttonCell} onClick={handleLaunchApp}>
						Launch
					</Button>
					<Button size="small" className={css.buttonCell} onClick={handlePopupClose}>
						{$L('Close')}
					</Button>
				</buttons>
			</Alert>
		</Panel>
	);
};

export default Main;
*/

import BodyText from '@enact/sandstone/BodyText';
import { Header, Panel } from '@enact/sandstone/Panels';
import { useMainState } from './MainState';
import css from './Main.module.less';
import $L from '@enact/i18n/$L';

const Main = (props) => {
    const { videoData } = useMainState();

    // 시청중인 영상과 추천 영상 데이터 분리
    const watchingVideos = videoData.slice(0, 3); // 첫 3개 비디오
    const recommendedVideos = videoData.slice(3, 9); // 다음 6개 비디오

    return (
        <Panel {...props}>
            <Header title={$L('YouTube Clone')} />
            <BodyText className={css.description} size="large"> {/* 여기에 size 속성 추가 */}
                {$L('이곳은 유튜브 메인 화면을 모방한 샘플 애플리케이션입니다.')}
            </BodyText>

            {/* 시청중인 영상 섹션 */}
            <div className={css.section}>
                <BodyText className={css.sectionTitle} size="large"> {/* 여기에 size 속성 추가 */}
                    { $L('시청중인 영상') }
                </BodyText>
                <div className={css.videoGrid}>
                    {watchingVideos.map(video => (
                        <div key={video.id} className={css.videoCard}>
                            <img src={video.thumbnail} alt={video.title} className={css.thumbnail} />
                            <BodyText className={css.videoTitle} size="medium"> {/* 여기에 size 속성 추가 */}
                                {video.title}
                            </BodyText>
                        </div>
                    ))}
                </div>
            </div>

            {/* 추천 영상 섹션 */}
            <div className={css.section}>
                <BodyText className={css.sectionTitle} size="large"> {/* 여기에 size 속성 추가 */}
                    { $L('추천 영상') }
                </BodyText>
                <div className={css.videoGrid}>
                    {recommendedVideos.map(video => (
                        <div key={video.id} className={css.videoCard}>
                            <img src={video.thumbnail} alt={video.title} className={css.thumbnail} />
                            <BodyText className={css.videoTitle} size="medium"> {/* 여기에 size 속성 추가 */}
                                {video.title}
                            </BodyText>
                        </div>
                    ))}
                </div>
            </div>
        </Panel>
    );
};

export default Main;


