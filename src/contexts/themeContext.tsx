import { createContext, useLayoutEffect, useState, useMemo, ReactNode, SetStateAction, Dispatch } from 'react';

type ThemeContextProps = {
	darkModeStatus: boolean
	setDarkModeStatus: Dispatch<SetStateAction<boolean>>
	fullScreenStatus: boolean
	setFullScreenStatus: Dispatch<SetStateAction<boolean>>
	asideStatus: boolean
	setAsideStatus: Dispatch<SetStateAction<boolean>>
	leftMenuStatus: boolean
	setLeftMenuStatus: Dispatch<SetStateAction<boolean>>
	rightMenuStatus: boolean
	setRightMenuStatus: Dispatch<SetStateAction<boolean>>
	rightPanel: boolean
	setRightPanel: Dispatch<SetStateAction<boolean>>
}

const initialState: ThemeContextProps = {
	darkModeStatus: false,
	setDarkModeStatus: () => {},
	fullScreenStatus: false,
	setFullScreenStatus: () => {},
	asideStatus: false,
	setAsideStatus: () => {},
	leftMenuStatus: false,
	setLeftMenuStatus: () => {},
	rightMenuStatus: false,
	setRightMenuStatus: () => {},
	rightPanel: false,
	setRightPanel: () => {},
  }

type ThemeContextProviderProps = {
	children: ReactNode
}

const ThemeContext = createContext(initialState);

const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {

	const [darkModeStatus, setDarkModeStatus] = useState(
		localStorage.getItem('facit_darkModeStatus')
			? localStorage.getItem('facit_darkModeStatus') === 'true'
			: process.env.REACT_APP_DARK_MODE === 'true',
	);

	useLayoutEffect(() => {
		localStorage.setItem('facit_darkModeStatus', darkModeStatus.toString());
	}, [darkModeStatus]);

	const [fullScreenStatus, setFullScreenStatus] = useState(false);

	const [leftMenuStatus, setLeftMenuStatus] = useState(false);
	const [rightMenuStatus, setRightMenuStatus] = useState(false);
	const [asideStatus, setAsideStatus] = useState(
		localStorage.getItem('facit_asideStatus') === 'true'
	);

	useLayoutEffect(() => {
		localStorage.setItem('facit_asideStatus', asideStatus?.toString());
	}, [asideStatus]);

	const [rightPanel, setRightPanel] = useState(false);

	// useLayoutEffect(() => {
	// 	if (deviceScreen?.width >= process.env.REACT_APP_ASIDE_MINIMIZE_BREAKPOINT_SIZE) {
	// 		if (localStorage.getItem('facit_asideStatus') === 'true') setAsideStatus(true);
	// 		setLeftMenuStatus(false);
	// 		setRightMenuStatus(false);
	// 	}
	// 	return () => {
	// 		setAsideStatus(false);
	// 	};
	// }, [deviceScreen.width]);

	const values = useMemo(
		() => ({
			darkModeStatus,
			setDarkModeStatus,
			fullScreenStatus,
			setFullScreenStatus,
			asideStatus,
			setAsideStatus,
			leftMenuStatus,
			setLeftMenuStatus,
			rightMenuStatus,
			setRightMenuStatus,
			rightPanel,
			setRightPanel,
		}),
		[
			asideStatus,
			darkModeStatus,
			fullScreenStatus,
			leftMenuStatus,
			rightMenuStatus,
			rightPanel,
		],
	);

	return (<ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>)
};
// ThemeContextProvider.propTypes = {
// 	children: PropTypes.node.isRequired,
// };

export { ThemeContextProvider, ThemeContext};
