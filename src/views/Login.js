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
import {Header, Panel} from '@enact/sandstone/Panels';
import $L from '@enact/i18n/$L';
import Button from '@enact/sandstone/Button';
import Input from '@enact/sandstone/Input';
import css from './Login.module.less';

import css2 from './Signup.module.less';
import TabLayout, {Tab} from '@enact/sandstone/TabLayout';

import { useSignupState } from './SignupState';
import {useLogin} from './LoginState';

//const {username,password,handleSignupUsernameChange,handleSignupPasswordChange,handleSignup} = useSignupState();
const Login = ({onSubmit, onClose}) => {
    console.log("rendering login");
    //const {handleSignupUsernameChange,handleSignupPasswordChange,handleSignup} = useSignupState();

    const {
        newusername, 
        newpassword, 
        handleSignupUsernameChange, 
        handleSignupPasswordChange,
        handleSignup,
    } = useSignupState();

    const {
        isLoginOpen,
		handleLoginOpen,
		handleLoginClose,
		handleLogin,
		handleUsernameChange,
		handlePasswordChange,
		username,
		password,
    } = useLogin();

    return(
        <Panel >
            <Header title={$L('Log In and Sign Up')}/>
            <TabLayout>
                <Tab title = {$L('Log In')}>
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
                        <Button onClick={handleLogin} size="small" className={css.button}>
                            Login
                        </Button>
                        <Button onClick={onClose} size="small" className={css.button}>
                            Cancel
                        </Button>
                    </div>
                </Tab>

                <Tab title = {$L('Sign Up')}>
                    <div className={css2.signupContainer}>
                        <BodyText>{$L('회원가입하여 서비스를 이용하세요.')}</BodyText>
                        <Input
                            type="text"
                            name="username"
                            placeholder={$L('사용자 이름')}
                            value={newusername}
                            onChange={handleSignupUsernameChange}
                            className={css2.inputField}
                        />
                        <Input
                            type="password"
                            name="password"
                            placeholder={$L('비밀번호')}
                            value={newpassword}
                            onChange={handleSignupPasswordChange}
                            className={css2.inputField}
                        />
                        <Button onClick={handleSignup} className={css2.signupButton}>
                            {$L('회원가입')}
                        </Button>
                    </div>

                </Tab>
            </TabLayout>
        </Panel>
    )
}

export default Login;
/*
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
}; */

//export default Login;

