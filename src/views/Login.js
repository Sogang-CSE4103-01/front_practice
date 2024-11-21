/*
// src/views/Login.js
import BodyText from '@enact/sandstone/BodyText';
import { Header, Panel } from '@enact/sandstone/Panels';
import { Input } from '@enact/sandstone/Input'; // Enact Input 컴포넌트
import { Button } from '@enact/sandstone/Button'; // Enact Button 컴포넌트
import { useLoginState } from './LoginState';
import css from './Login.module.less';
import $L from '@enact/i18n/$L';

const Login = () => {
    const { username, password, handleInputChange, handleLogin, handleNavigateToSignup } = useLoginState();

    return (
        <Panel>
            <Header title={$L('로그인')} />
            <div className={css.loginContainer}>
                <BodyText>{$L('로그인하여 계속 진행하세요.')}</BodyText>
                <Input
                    type="text"
                    name="username"
                    placeholder={$L('사용자 이름')}
                    value={username} // 상태와 연결
                    onChange={handleInputChange} // 핸들러와 연결
                    className={css.input}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder={$L('비밀번호')}
                    value={password} // 상태와 연결
                    onChange={handleInputChange} // 핸들러와 연결
                    className={css.input}
                />
                <Button onClick={handleLogin} className={css.loginButton}>
                    {$L('로그인')}
                </Button>
                <Button onClick={handleNavigateToSignup} className={css.signupButton}>
                    {$L('회원가입')}
                </Button>
            </div>
        </Panel>
    );
};

export default Login;
*/

// src/views/Login.js
// src/views/Login.js
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import Input from '@enact/sandstone/Input';
import css from './Login.module.less';

const Login = ({ onClose, onSubmit, username, password, handleUsernameChange, handlePasswordChange }) => {
	return (
		<div className={css.loginContainer}>
			<BodyText className={css.title}>Login</BodyText>
			<Input
				placeholder="Username"
				value={username}
				onChange={handleUsernameChange}
				type="text"
				className={css.input}
			/>
			<Input
				placeholder="Password"
				value={password}
				onChange={handlePasswordChange}
				type="password"
				className={css.input}
			/>
			<Button onClick={onSubmit} size="small" className={css.button}>
				Login
			</Button>
			<Button onClick={onClose} size="small" className={css.button}>
				Cancel
			</Button>
		</div>
	);
};

export default Login;
