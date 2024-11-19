import { useCallback, useEffect, useState } from 'react';
import { sam } from '../libs/services';
import debugLog from '../libs/log';

// 비디오 정보를 관리하기 위한 데이터 타입
export const useMainState = () => {
	const [isPopupOpen, openPopup] = useState(false);
	const [videoData, setVideoData] = useState([]);
	const [loading, setLoading] = useState(true); // 로딩 상태 추가

	// 서버에서 비디오 데이터를 가져오는 함수
	const fetchVideoData = async () => {
		try {
			const response = await fetch('https://your-api-endpoint.com/videos'); // API 엔드포인트
			const data = await response.json();
			setVideoData(data); // 받아온 데이터 설정
		} catch (error) {
			console.error('Error fetching video data:', error);
		} finally {
			setLoading(false); // 데이터 로딩 완료
		}
	};

	useEffect(() => {
		fetchVideoData(); // 컴포넌트 마운트 시 데이터 가져오기
	}, []);

	const handleLaunchApp = useCallback(async () => {
		const result = await sam({
			method: 'launch',
			parameters: { id: 'com.webos.app.self-diagnosis' }
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

	return {
		isPopupOpen,
		handlePopupOpen,
		handlePopupClose,
		handleLaunchApp,
		videoData,
		loading, // 로딩 상태 반환
		setVideoData
	};
};
