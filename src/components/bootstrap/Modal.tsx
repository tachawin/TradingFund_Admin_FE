import { forwardRef, MouseEvent, ReactNode, useLayoutEffect, useRef } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import Portal from '../../layout/Portal/Portal';
import TagWrapper from '../TagWrapper';
import useEventListener from '../../hooks/useEventListener';

interface ModalTitleInterface {
	tag?: string
	id?: string | number
	children: ReactNode
	className?: string
}

export const ModalTitle = forwardRef<HTMLDivElement, ModalTitleInterface>(({ tag = 'h5', id, children, className = null, ...props }, ref) => {
	return (
		<TagWrapper
			tag={tag}
			ref={ref}
			id={id}
			className={classNames('modal-title', className)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</TagWrapper>
	);
});

interface ModalHeaderInterface {
	children: ReactNode
	className?: string
	setIsOpen?: any
}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderInterface>(({ children = null, className, setIsOpen = null, ...props }, ref) => {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div ref={ref} className={classNames('modal-header', className)} {...props}>
			{children}
			{setIsOpen && (
				<button
					type='button'
					className='btn-close'
					data-bs-dismiss='modal'
					aria-label='Close'
					onClick={() => setIsOpen(false)}
				/>
			)}
		</div>
	);
})

interface ModalBodyInterface {
	children: ReactNode
	className?: string
}

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyInterface>(({ children, className = null, ...props }, ref) => {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div ref={ref} className={classNames('modal-body', className)} {...props}>
			{children}
		</div>
	);
});

interface ModalFooterInterface {
	children: ReactNode
	className?: string
}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterInterface>(({ children, className = null, ...props }, ref) => {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div ref={ref} className={classNames('modal-footer', className)} {...props}>
			{children}
		</div>
	);
});

interface ModalInterface {
	children?: ReactNode
	isOpen?: boolean
	setIsOpen: any
	id?: string | undefined
	titleId?: string | number
	isStaticBackdrop?: boolean
	isScrollable?: boolean
	isCentered?: boolean
	size?: string | null
	fullScreen?: boolean | string | null
	isAnimation?: boolean
	style?: any
}

const Modal = ({
	children,
	isOpen,
	setIsOpen,
	id,
	titleId,
	isStaticBackdrop = false,
	isScrollable = false,
	isCentered = false,
	size = null,
	fullScreen = false,
	isAnimation = true,
	style,
	...props
}: ModalInterface) => {
	const refModal = useRef<any>(null);
	const ref = useRef<any>(null);

	// <body> modal-open class (presentation)
	useLayoutEffect(() => {
		if (isOpen) {
			document.body.classList.add('modal-open');
		}
		return () => {
			document.body.classList.remove('modal-open');
		};
	});

	// Backdrop close function
	const closeModal = (event: MouseEvent<HTMLElement>) => {
		if (ref.current && !ref.current.contains(event.target) && !isStaticBackdrop) {
			setIsOpen(false);
		}
	};
	useEventListener('mousedown', closeModal);
	useEventListener('touchstart', closeModal); // Touchscreen

	// Backdrop static function
	const modalStatic = (event: MouseEvent<HTMLElement>) => {
		if (ref.current && !ref.current.contains(event.target) && isStaticBackdrop) {
			refModal.current.classList.add('modal-static');
			setTimeout(() => refModal.current.classList.remove('modal-static'), 300);
		}
	};
	useEventListener('mousedown', modalStatic);
	useEventListener('touchstart', modalStatic); // Touchscreen

	// Keypress close function
	const escFunction = (event: any) => {
		if (event.key === 'Escape') {
			setIsOpen(false);
		}
	};
	useEventListener('keydown', escFunction);

	const _animationProps = isAnimation
		? {
				initial: { opacity: 0, y: '-50%' },
				animate: { opacity: 1, x: '0%', y: '0%' },
				exit: { opacity: 0, y: '-50%' },
				transition: { ease: 'easeInOut', duration: 0.3 },
		  }
		: null;

	return (
		<Portal>
			<AnimatePresence exitBeforeEnter>
				{isOpen && (
					<>
						<motion.div
							ref={refModal}
							key='modal'
							className={classNames('modal', { fade: isAnimation }, 'show')}
							role='dialog'
							style={{ display: 'block' }}
							id={id}
							tabIndex={-1}
							aria-labelledby={titleId as string}
							aria-hidden='true'
							data-bs-backdrop={isStaticBackdrop ? 'static' : null}
							data-bs-keyboard={isStaticBackdrop ? 'false' : null}
							// eslint-disable-next-line react/jsx-props-no-spreading
							{..._animationProps}
							// eslint-disable-next-line react/jsx-props-no-spreading
							{...props}>
							<div
								ref={ref}
								style={style}
								className={classNames('modal-dialog', {
									'modal-dialog-scrollable': isScrollable,
									'modal-dialog-centered': isCentered,
									[`modal-${size}`]: size,
									[`modal-fullscreen${
										typeof fullScreen === 'string' ? `-${fullScreen}-down` : ''
									}`]: fullScreen,
								})}>
								<div className='modal-content'>{children}</div>
							</div>
						</motion.div>
						<div
							className={classNames('modal-backdrop', { fade: isAnimation }, 'show')}
						/>
					</>
				)}
			</AnimatePresence>
		</Portal>
	);
};

export default Modal;
