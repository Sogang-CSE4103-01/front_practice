// src/views/SignupState.js
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // useHistory를 useNavigate로 변경
import debugLog from '../libs/log';

export const useSignupState = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 객체

    const handleInputChange = useCallback((event) => {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value); // 사용자 이름 상태 업데이트
        } else if (name === 'password') {
            setPassword(value); // 비밀번호 상태 업데이트
        }
    }, []);

    const handleSignup = useCallback(() => {
        debugLog('회원가입 버튼 클릭'); // 디버그 로그 출력
        navigate('/login'); // 회원가입 후 로그인 화면으로 이동 (필요에 따라 변경 가능)
    }, [navigate]);

    return { username, password, handleInputChange, handleSignup };
};
