// src/views/LoginState.js
import { useState, useCallback } from 'react';
import debugLog from '../libs/log';

export const useLogin = () => {
	const [isLoginOpen, setLoginOpen] = useState(true); // 초기값을 true로 설정
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
		if (e && e.value !== undefined) {
			setUsername(e.value);
			console.log('log in : name submitted');
		} else {
			console.warn('handleUsernameChange: Invalid event object', e);
		}
	}, []);

	const handlePasswordChange = useCallback((e) => {
		if (e && e.value !== undefined) {
			setPassword(e.value);
			console.log('log in : PW submitted');
		} else {
			console.warn('handlePasswordChange: Invalid event object', e);
		}
	}, []);

	const handleLogin = useCallback(async () => {
		debugLog('Attempting login', { username, password });
		try {
			const response = await fetch(`https://connected-backend-yir6.onrender.com/api/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body : JSON.stringify({username, password}),
				credentials: 'include',
			});
			if (!response.ok) {
				throw new Error('Login failed');
			}
			const data = await response.json();
			debugLog('Login successful', data);
			handleLoginClose();
		} catch (error) {
			debugLog('Login failed', error.message);
		}
	}, [username, password, handleLoginClose]);

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
