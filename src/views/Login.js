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
				//onChange={onUsernameChange}
				onChange={handleUsernameChange}
				type="text"
				className={css.input}
			/>
			<Input
				placeholder="Password"
				value={password}
				//onChange={onPasswordChange}
				onchange={handlePasswordChange}
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
