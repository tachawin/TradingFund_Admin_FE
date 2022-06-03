import { ReactNode, useContext, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { useMeasure, useWindowSize } from 'react-use';
import { ThemeContext } from '../../contexts/themeContext';
import Button from '../../components/bootstrap/Button';
import Portal from '../Portal/Portal';
import useDarkMode from '../../hooks/useDarkMode';
import { FirstPageTwoTone, LastPageTwoTone, MenuOpenTwoTone, MenuTwoTone, MoreHorizTwoTone, MoreVertTwoTone } from '@mui/icons-material';

interface HeaderCommonInterface {
	className?: string | null
	children?: ReactNode
}

export const HeaderLeft = ({ children, className }: HeaderCommonInterface) => {
	return <div className={classNames('header-left', 'col-md', className)}>{children}</div>;
};

export const HeaderRight = ({ children, className }: HeaderCommonInterface) => {
	const [ref, { height }] = useMeasure<any>();

	const root = document.documentElement;
	root.style.setProperty('--header-right-height', `${height}px`);

	return (
		<div ref={ref} className={classNames('header-right', 'col-md-auto', className)}>
			{children}
		</div>
	);
};

interface HeaderInterface {
	hasLeftMobileMenu?: boolean
	hasRightMobileMenu?: boolean
	children?: ReactNode
}

const Header = ({ children, hasLeftMobileMenu = true, hasRightMobileMenu = true }: HeaderInterface) => {
	const { themeStatus } = useDarkMode();

	const windowsWidth = useWindowSize().width;
	const [refMobileHeader, sizeMobileHeader] = useMeasure<any>();
	const [refHeader, sizeHeader] = useMeasure<any>();

	const root = document.documentElement;
	root.style.setProperty('--mobile-header-height', `${sizeMobileHeader.height}px`);
	root.style.setProperty('--header-height', `${sizeHeader.height}px`);

	const {
		asideStatus,
		setAsideStatus,
		leftMenuStatus,
		setLeftMenuStatus,
		rightMenuStatus,
		setRightMenuStatus,
	} = useContext(ThemeContext);

	useLayoutEffect(() => {
		if (
			(asideStatus || leftMenuStatus || rightMenuStatus) &&
			windowsWidth < ((process.env as any).REACT_APP_MOBILE_BREAKPOINT_SIZE as number)
		)
			document.body.classList.add('overflow-hidden');
		return () => {
			document.body.classList.remove('overflow-hidden');
		};
	});

	return (
		<>
			<header ref={refMobileHeader} className='mobile-header'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col'>
							<Button
								aria-label='Toggle Aside'
								className='mobile-header-toggle'
								size='lg'
								color={asideStatus ? 'primary' : themeStatus}
								isLight={asideStatus}
								icon={asideStatus ? FirstPageTwoTone : LastPageTwoTone}
								onClick={() => {
									setAsideStatus(!asideStatus);
									setLeftMenuStatus(false);
									setRightMenuStatus(false);
								}}
							/>
							{hasLeftMobileMenu && (
								<Button
									aria-label='Toggle Left Menu'
									className='mobile-header-toggle'
									size='lg'
									color={leftMenuStatus ? 'primary' : themeStatus}
									isLight={leftMenuStatus}
									icon={leftMenuStatus ? MoreVertTwoTone : MoreHorizTwoTone}
									onClick={() => {
										setAsideStatus(false);
										setLeftMenuStatus(!leftMenuStatus);
										setRightMenuStatus(false);
									}}
								/>
							)}
						</div>
						{hasRightMobileMenu && (
							<div className='col-auto'>
								<Button
									aria-label='Toggle Right Menu'
									className='mobile-header-toggle'
									size='lg'
									color={rightMenuStatus ? 'primary' : themeStatus}
									isLight={rightMenuStatus}
									icon={rightMenuStatus ? MenuTwoTone : MenuOpenTwoTone}
									onClick={() => {
										setAsideStatus(false);
										setLeftMenuStatus(false);
										setRightMenuStatus(!rightMenuStatus);
									}}
								/>
							</div>
						)}
					</div>
				</div>
			</header>
			<header
				ref={refHeader}
				className={classNames('header', {
					'header-left-open': leftMenuStatus,
					'header-right-open': rightMenuStatus,
				})}>
				<div className='container-fluid'>
					<div className='row d-flex align-items-center'>
						{children}
						{(leftMenuStatus || rightMenuStatus) && (
							<Portal>
								<div
									role='presentation'
									className={classNames('header-overlay', {
										'header-overlay-left-menu': leftMenuStatus,
										'header-overlay-right-menu': rightMenuStatus,
									})}
									onClick={() => {
										setAsideStatus(false);
										setLeftMenuStatus(false);
										setRightMenuStatus(false);
									}}
								/>
							</Portal>
						)}
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
