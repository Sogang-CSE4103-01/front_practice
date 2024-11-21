// App.js
import { useContext, useState } from 'react';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Panels from '@enact/sandstone/Panels';
import Main from '../views/Main';
import { useBackHandler, useCloseHandler, useDocumentEvent } from './AppState';
import { isDevServe } from '../libs/utils';
import DetailPanel from '../views/DetailPanel';
import { PanelContext } from '../views/Context';
import SettingPanel from '../views/SettingPanel';

// 실습 : 동적 panel 이동 기능 구현하기

const mapper = item => {
    const { name, data } = item;
    switch (name) {
        case 'main':
            return <Main key={name} data={data} />;
        case 'detail':
            return <DetailPanel key={name} data={data} />;
        case 'setting':
            return <SettingPanel key={name} data={data} />;
        default:
            return <Main key={name} />;
    }
};

const App = props => {
    const [skinVariants, setSkinVariants] = useState({ highContrast: false });
    const handleBack = useBackHandler();
    const handleClose = useCloseHandler();
    useDocumentEvent(setSkinVariants);
    const { panelData } = useContext(PanelContext);

    return (
        <Panels
            {...props}
            index={panelData.length - 1}
            skinVariants={skinVariants}
            onBack={handleBack} // 뒤로 가기 핸들러 연결
            onClose={handleClose}
        >
            {panelData.map(mapper)}
        </Panels>
    );
};

export default ThemeDecorator(App);
