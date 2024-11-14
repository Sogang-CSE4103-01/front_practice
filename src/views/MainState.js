import {useCallback, useState} from 'react';
import {sam} from '../libs/services';
import debugLog from '../libs/log';

// 로컬 이미지 불러오기 (src/assets에서)
import video1 from '../assets/video1.jpg';
import video2 from '../assets/video2.jpg';
import video3 from '../assets/video3.jpg';
import video4 from '../assets/video4.jpg';
import video5 from '../assets/video5.jpg';
import video6 from '../assets/video6.jpg';


// 비디오 정보를 관리하기 위한 데이터 타입
export const useMainState = () => {
	const [isPopupOpen, openPopup] = useState(false);
	const [videoData, setVideoData] = useState([
		{
			id: 1,
			title: "첫 번째 비디오",
			thumbnail: video1
		},
		{
			id: 2,
			title: "두 번째 비디오",
			thumbnail: video2
		},
		{
			id: 3,
			title: "세 번째 비디오",
			thumbnail: video3
		},
		{
			id: 4,
			title: "네 번째 비디오",
			thumbnail: video4
		},
		{
			id: 5,
			title: "다섯 번째 비디오",
			thumbnail: video5
		},
		{
			id: 6,
			title: "여섯 번째 비디오",
			thumbnail: video6
		},
		{
			id: 7,
			title: "일곱 번째 비디오",
			thumbnail: video6
		},
		{
			id: 8,
			title: "여덟 번째 비디오",
			thumbnail: video6
		},
		{
			id: 9,
			title: "아홉 번째 비디오",
			thumbnail: video6
		}
	]);

	const handleLaunchApp = useCallback(async () => {
		const result = await sam({
			method: 'launch',
			parameters: {id: 'com.webos.app.self-diagnosis'}
		});
		debugLog('SAM', result);
		openPopup(false);
	}, []);

	const handlePopupOpen = useCallback(() => {
		openPopup(true);
	}, []);

	const handlePopupClose = useCallback(() => {
		openPopup(false);
	}, []);

	return {isPopupOpen, handlePopupOpen, handlePopupClose, handleLaunchApp, videoData, setVideoData};
};
