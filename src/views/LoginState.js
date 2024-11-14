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
		} else {
			console.warn('handleUsernameChange: Invalid event object', e);
		}
	}, []);

	const handlePasswordChange = useCallback((e) => {
		if (e && e.value !== undefined) {
			setPassword(e.value);
		} else {
			console.warn('handlePasswordChange: Invalid event object', e);
		}
	}, []);

	const handleLogin = useCallback(async () => {
		debugLog('Attempting login', { username, password });
		try {
			const response = await fetch(`http://localhost:8080/api/login?username=${username}&password=${password}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
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
