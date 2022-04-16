import ReactDOM from 'react-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/themeContext';

interface PortalInterface {
	id?: string
	children: any
}

const Portal = ({ id = 'portal-root', children }: PortalInterface) => {
	const { fullScreenStatus } = useContext(ThemeContext);

	const mount: any = document.getElementById(id);
	if (fullScreenStatus) return children;
	return ReactDOM.createPortal(children, mount);
};

export default Portal;
