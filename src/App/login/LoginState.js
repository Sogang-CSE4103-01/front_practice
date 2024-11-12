import { useState, useCallback } from 'react';
import debugLog from '../../libs/log';

export const useLogin = () => {
	const [isLoginOpen, setLoginOpen] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	//const [err, setError] = useState(null);

	const handleLoginOpen = useCallback(() => {
		setLoginOpen(true);
	}, []);

	const handleLoginClose = useCallback(() => {
		setLoginOpen(false);
		setUsername('');
		setPassword('');
		setError(null);
	}, []);

	const handleUsernameChange = useCallback((e) => {
		console.log("!!!!!!!!!");
		if (e && e.value !== undefined) {
			setUsername(e.value);
		} else {
			console.warn('handleUsernameChange: Invalid event object', e);
		}
		//setUsername(e.target.value);
	}, [setUsername]);

	const handlePasswordChange = useCallback((e) => {
		console.log("??????????");
		//setPassword(e.target.value);
		if (e && e.value !== undefined) {
			setPassword(e.value);
		} else {
			console.warn('handlePasswordChange: Invalid event object', e);
		}
	}, [setPassword]);

	const handleLogin = useCallback(async () => {
		debugLog('Attempting login', { username, password });
		// 이 부분에 실제 로그인 API 호출을 추가할 수 있습니다.
		try {
			const response = await fetch('http://localhost:8080/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password })
			});

			const data = await response.text(); // 서버에서 텍스트 응답 받기
			//const data = await response.json();

			if (response.ok && data.includes("로그인 성공")) {
				debugLog('Login successful');
				handleLoginClose(); // 로그인 성공 시 닫기
			} else {
				setError(data || '로그인 실패: 잘못된 사용자명 또는 비밀번호');
				debugLog('Login failed');
			}
		} catch (loginError) {
			setError("로그인 요청 중 오류가 발생했습니다.");
			console.error("Login error:", loginError);
		}

	}, [username, password, handleLoginClose]); // handleLoginClose를 종속성 배열에 추가

	return {
		isLoginOpen,
		handleLoginOpen,
		handleLoginClose,
		handleLogin,
		handleUsernameChange,
		handlePasswordChange,
		username,
		password,
		error
		//err
	};
};
