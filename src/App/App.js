// src/App.js
import { useState } from 'react';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Panels from '@enact/sandstone/Panels';
import Main from '../views/Main';
import { useBackHandler, useCloseHandler, useDocumentEvent } from './AppState';
import { isDevServe } from '../libs/utils';
import Login from '../views/Login';
import { useLogin } from '../views/LoginState';

/* istanbul ignore next*/
if (isDevServe()) {
	window.webOSSystem = {
		highContrast: 'off',
		close: () => {},
		platformBack: () => {},
		PmLogString: () => {},
		screenOrientation: 'landscape',
		setWindowOrientation: () => {}
	};
}

const App = (props) => {
	const [skinVariants, setSkinVariants] = useState({ highContrast: false });
	const handleBack = useBackHandler();
	const handleClose = useCloseHandler();
	const { isLoginOpen, handleLoginClose } = useLogin();
	useDocumentEvent(setSkinVariants);

	return (
		<Panels
			{...props}
			skinVariants={skinVariants}
			onBack={handleBack}
			onClose={handleClose}
		>
			{isLoginOpen ? (
				<Login onClose={handleLoginClose} />
			) : (
				<Main />
			)}
		</Panels>
	);
};

export default ThemeDecorator(App);
