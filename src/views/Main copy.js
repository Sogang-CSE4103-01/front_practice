//import Alert from '@enact/sandstone/Alert';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import { Header, Panel } from '@enact/sandstone/Panels';
import { usePopup } from './MainState';
import { useLogin } from './LoginState';
import Login from './Login';

import css from './Main.module.less';
import $L from '@enact/i18n/$L';
import { useProcStat } from '../hooks/useData';

const Main = props => {
	const procStat = useProcStat();
	const { isPopupOpen, handlePopupOpen, handlePopupClose, handleLaunchApp } = usePopup();
	const {
		isLoginOpen,
		handleLoginOpen,
		handleLoginClose,
		handleLogin,
		handleUsernameChange,
		handlePasswordChange,
		username,
		password
	} = useLogin();

	// Define handler functions for buttons
	const onOpenAlert = handlePopupOpen;
	const onCloseAlert = handlePopupClose;
	const onLaunchApp = handleLaunchApp;

	return (
		<Panel {...props}>
			{isLoginOpen ? (
				// 로그인 창이 열리면 로그인 컴포넌트만 렌더링
				<Login
					isOpen={isLoginOpen}
					onClose={handleLoginClose}
					onSubmit={handleLogin}
					onUsernameChange={handleUsernameChange}
					onPasswordChange={handlePasswordChange}
					username={username}
					password={password}
				/>
			) : (
				// 로그인 창이 닫힌 경우 메인 화면 표시
				<>
					<Header title={$L('Enact Template')} />
					<BodyText>{$L('This is a main page of sample application.')}</BodyText>

					{/* Alert Popup */}
					<Button onClick={onOpenAlert} size="small" className={css.buttonCell}>
						{$L('Open Alert')}
					</Button>
					<BodyText>{`procStat : ${JSON.stringify(procStat)}`}</BodyText>
					

					{/* Login Button */}
					<Button onClick={handleLoginOpen} size="small" className={css.buttonCell}>
						{$L('Login')}
					</Button>
				</>
			)}
		</Panel>
	);
};

export default Main;
