import { FC, forwardRef, ReactNode, useContext, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import Portal from '../../layout/Portal/Portal';
import TagWrapper from '../TagWrapper';
import useEventListener from '../../hooks/useEventListener';
import { ThemeContext } from '../../contexts/themeContext';

interface OffCanvasTitleInterface {
	className?: string,
	id?: string,
	tag?: string,
	children?: any
}

export const OffCanvasTitle: FC<OffCanvasTitleInterface> = forwardRef<any, OffCanvasTitleInterface>(({ tag = 'h5', id, children, className, ...props }, ref) => {
	return (
		<TagWrapper
			tag={tag}
			ref={ref}
			id={id}
			className={classNames('offcanvas-title', className)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</TagWrapper>
	);
});

interface OffCanvasHeaderInterface {
	className?: string,
	setOpen?: any,
	children: ReactNode
}

export const OffCanvasHeader = forwardRef<any, OffCanvasHeaderInterface>(({ children, className, setOpen, ...props }, ref) => {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div ref={ref} className={classNames('offcanvas-header', className)} {...props}>
			{children}
			{setOpen && (
				<button
					type='button'
					className='btn-close text-reset'
					data-bs-dismiss='offcanvas'
					aria-label='Close'
					onClick={() => setOpen(false)}
				/>
			)}
		</div>
	);
});

interface OffCanvasBodyInterface {
	className?: string,
	tag?: string,
	children: ReactNode,
	onSubmit?: any
}

export const OffCanvasBody = forwardRef<any, OffCanvasBodyInterface>(({ tag = 'div', children, className, ...props }, ref) => {
	return (
		<TagWrapper
			tag={tag}
			ref={ref}
			className={classNames('offcanvas-body', className)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</TagWrapper>
	);
});

interface OffCanvasInterface {
	id?: string,
	placement?: string,
	titleId?: string,
	isBodyScroll?: boolean,
	isBackdrop?: boolean,
	isModalStyle?: boolean,
	isRightPanel?: boolean,
	tag?: any,
	children?: any,
	isOpen: boolean,
	setOpen: (value: any) => void
	noValidate?: boolean
	onSubmit?: any
}

const OffCanvas = ({
	id,
	titleId,
	children,
	placement = 'end',
	isBodyScroll = false,
	isBackdrop = true,
	isModalStyle = false,
	isOpen,
	setOpen,
	isRightPanel = false,
	tag: Tag = 'div',
	...props
}: OffCanvasInterface) => {
	const initialProps = {
		isBackdrop: isRightPanel ? false : isBackdrop,
		isBodyScroll: isRightPanel ? true : isBodyScroll,
		placement: isRightPanel ? 'end' : placement,
	};

	const { setRightPanel } = useContext(ThemeContext);

	useLayoutEffect(() => {
		setRightPanel(isRightPanel && isOpen);
	});

	const ref = useRef<any>(null);

	// Disable Body Scroll
	useLayoutEffect(() => {
		if (!initialProps.isBodyScroll && isOpen) {
			document.body.style.overflow = 'hidden';
			document.body.style.paddingRight = '0px';
		}
		return () => {
			document.body.style.overflow = 'auto';
			document.body.style.removeProperty('padding-right');
		};
	});

	// Backdrop close function
	const closeCanvas = (event: any) => {
		if (ref.current && !ref.current.contains(event.target) && !isRightPanel && isBackdrop) {
			setOpen(false);
		}
	};
	useEventListener('mousedown', closeCanvas);
	useEventListener('touchstart', closeCanvas);

	const _placementAnimation = (initialProps.placement === 'start' && { x: '-100%' }) ||
		(initialProps.placement === 'top' && { y: '-100%' }) ||
		(initialProps.placement === 'bottom' && { y: '100%' }) || { x: '100%' };

	const MotionTagWrapper = motion['div'];

	return (
		<Portal>
			<AnimatePresence exitBeforeEnter>
				{isOpen && (
					<>
						<MotionTagWrapper
							ref={ref}
							key='offCanvas'
							initial={{ opacity: 0, ..._placementAnimation }}
							animate={{ opacity: 1, x: '0%', y: '0%' }}
							exit={{ opacity: 0, ..._placementAnimation }}
							transition={{ ease: 'easeInOut', duration: 0.3 }}
							id={id}
							className={classNames(
								'offcanvas',
								`offcanvas-${initialProps.placement}`,
								{
									show: isOpen,
									'offcanvas-modal-style': isModalStyle,
									'offcanvas-right-panel': isRightPanel
								},
							)}
							tabIndex={-1}
							aria-labelledby={titleId}
							data-bs-scroll={initialProps.isBodyScroll}
							data-bs-backdrop={initialProps.isBackdrop}
							style={{ visibility: isOpen && 'visible' }}
							// eslint-disable-next-line react/jsx-props-no-spreading
							{...props}>
							{children}
						</MotionTagWrapper>
						{initialProps.isBackdrop && (
							<div className={classNames('offcanvas-backdrop', 'fade', 'show')} />
						)}
					</>
				)}
			</AnimatePresence>
		</Portal>
	);
};

export default OffCanvas;
