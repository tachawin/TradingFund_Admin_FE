import { Children, cloneElement } from 'react';
import Icon from '../icon/Icon';

interface ToastHeaderInterface {
	icon?: string,
	iconColor?: string,
	title: any,
	time?: string,
	isDismiss?: boolean,
	onDismiss?: any
}

const ToastHeader = ({ icon, iconColor, title, time, isDismiss = false, ...props }: ToastHeaderInterface) => {
	
	const { onDismiss } = props;
	return (
		<div className='toast-header'>
			{icon && <Icon icon={icon} size='lg' color={iconColor} className='me-2' />}
			{title && <strong className='me-auto'>{title}</strong>}
			{time && <small>{time}</small>}
			{isDismiss && onDismiss}
		</div>
	);
};

interface ToastBodyInterface {
	children: any
}

const ToastBody = ({ children }: ToastBodyInterface) => {
	return <div className='toast-body'>{children}</div>;
};


export const Toast = ({ children, onDismiss }: any) => {
	return (
		<div className='toast show' role='alert' aria-live='assertive' aria-atomic='true'>
			{Children.map(children, (child, index) =>
				cloneElement(child, {
					// eslint-disable-next-line react/no-array-index-key
					key: index,
					onDismiss: (
						<button
							type='button'
							className='btn-close'
							aria-label='Close'
							onClick={onDismiss}
						/>
					),
				}),
			)}
		</div>
	);
};

interface ToastContainerInterface {
	children: any
}

export const ToastContainer = ({ children }: ToastContainerInterface) => {
	return (
		<div className='position-fixed top-0 end-0 p-3' style={{ zIndex: 9999 }}>
			<div className='toast-container'>{children}</div>
		</div>
	);
};

interface ToastInterface {
	title: any,
	children: any,
	icon?: string,
	iconColor?: string,
	time?: string,
	isDismiss?: boolean,
	onDismiss?: any
}

const Toasts = ({ icon, iconColor, title, time, isDismiss = true, children, ...props }: ToastInterface) => {
	
	const { onDismiss } = props;
	return (
		<>
			<ToastHeader
				icon={icon}
				iconColor={iconColor}
				title={title}
				time={time}
				isDismiss={isDismiss}
				onDismiss={onDismiss}
			/>
			<ToastBody>{children}</ToastBody>
		</>
	);
};

export default Toasts;
