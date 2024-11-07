import { useState, useCallback } from 'react';
import debugLog from '../../libs/log';

export const useLogin = () => {
	const [isLoginOpen, setLoginOpen] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLoginOpen = useCallback(() => {
		setLoginOpen(true);
	}, []);

	const handleLoginClose = useCallback(() => {
		setLoginOpen(false);
		setUsername('');
		setPassword('');
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
		if (username === 'user' && password === 'password') {
			debugLog('Login successful');
			handleLoginClose();
		} else {
			debugLog('Login failed');
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
		password
	};
};
