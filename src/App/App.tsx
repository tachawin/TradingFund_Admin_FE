import React, { useContext, useLayoutEffect, useRef } from 'react'
import { ThemeProvider } from 'react-jss'
import { ReactNotifications } from 'react-notifications-component'
import { useFullscreen } from 'react-use'
import { Route, Routes } from 'react-router-dom'
import { ThemeContext } from '../contexts/themeContext'

import Wrapper from '../layout/Wrapper/Wrapper'
import Portal from '../layout/Portal/Portal'
import { demoPages, layoutMenu, pages } from '../menu'
import COLORS from '../common/data/enumColors'

const App = () => {
	const theme = {
		primary: COLORS.PRIMARY.code,
		secondary: COLORS.SECONDARY.code,
		success: COLORS.SUCCESS.code,
		info: COLORS.INFO.code,
		warning: COLORS.WARNING.code,
		danger: COLORS.DANGER.code,
		dark: COLORS.DARK.code,
		light: COLORS.LIGHT.code,
	}

	/**
	 * Full Screen
	 */
	const { fullScreenStatus, setFullScreenStatus } = useContext(ThemeContext)
	const ref = useRef(null)
	useFullscreen(ref, fullScreenStatus, {
		onClose: () => setFullScreenStatus(false),
	})

	/**
	 * Modern Design
	 */
	useLayoutEffect(() => {
		if (process.env.REACT_APP_MODERN_DESGIN === 'true') {
			document.body.classList.add('modern-design')
		} else {
			document.body.classList.remove('modern-design')
		}
	})

	//	Add paths to the array that you don't want to be "Aside".
	const withOutAsidePages = [pages.login.path, pages.otp.path, demoPages.signUp.path, layoutMenu.blank.path]

	return (
		<ThemeProvider theme={theme}>
			<div
				ref={ref}
				className='app'
				style={{
					backgroundColor: fullScreenStatus ? 'var(--bs-body-bg)' : 'initial',
					zIndex: fullScreenStatus ? 1 : 'auto',
					overflow: fullScreenStatus ? 'scroll' : 'auto',
				}}>
				<Routes>
					{withOutAsidePages.map((path) => (
						<Route key={path} path={path} />
					))}
				</Routes>
				<Wrapper />
			</div>
			<Portal id='portal-notification'>
				<ReactNotifications />
			</Portal>
		</ThemeProvider>
	)
}

export default App
