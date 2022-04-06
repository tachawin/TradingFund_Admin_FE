import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Avatar from './Avatar';
import useDarkMode from '../hooks/useDarkMode';

interface ChatListItemInterface {
	src?: string
	srcSet?: string,
	className?: string,
	isOnline?: boolean,
	color?: string,
	size?: number,
	latestMessage?: string,
	unreadMessage?: number,
	isActive?: boolean,
	lastSeenTime?: string,
	name?: string,
	surname?: string
	onClick?: any
}

export const ChatListItem = ({
	src,
	srcSet,
	className,
	isOnline = false,
	color = 'primary',
	size = 64,
	name,
	surname,
	latestMessage,
	unreadMessage,
	isActive = false,
	lastSeenTime,
	...props
}: ChatListItemInterface) => {
	const { darkModeStatus } = useDarkMode();

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div className={classNames('col-12 cursor-pointer', className)} {...props}>
			<div
				className={classNames(
					'd-flex align-items-center',
					'p-3 rounded-2',
					'transition-base',
					{
						'bg-l25-info-hover': !darkModeStatus,
						'bg-lo50-info-hover': darkModeStatus,
						'bg-l10-info': !darkModeStatus && isActive,
						'bg-lo25-info': darkModeStatus && isActive,
					},
				)}>
				<ChatAvatar
					src={src}
					srcSet={srcSet}
					isOnline={isOnline}
					unreadMessage={unreadMessage}
					color={color}
					size={size}
					className='me-3'
				/>
				<div className='d-grid'>
					<div className='d-flex flex-wrap d-xxl-block'>
						<span className='fw-bold fs-5 me-3'>{`${name} ${surname}`}</span>
						{lastSeenTime && (
							<small
								className={classNames(
									'text-info fw-bold px-3 py-1 rounded-pill align-top text-nowrap',
									{
										'bg-l10-info': !darkModeStatus,
										'bg-lo25-info': darkModeStatus,
									},
								)}>
								{lastSeenTime}
							</small>
						)}
					</div>
					<div className='text-muted text-truncate'>{latestMessage}</div>
				</div>
			</div>
		</div>
	);
};

interface ChatHeaderInterface {
	to: string | null
}

export const ChatHeader = ({ to }: ChatHeaderInterface) => {
	return (
		<>
			<strong className='me-2'>To:</strong>
			{to}
		</>
	);
};

interface ChatMessagesInterface {
	messages?: any[]
	isReply?: any
}

export const ChatMessages = ({ messages, isReply = false, ...props }: ChatMessagesInterface) => {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div className='chat-messages' {...props}>
			{messages?.map((i) => (
				<div
					key={i.id}
					className={classNames('chat-message', { 'chat-message-reply': isReply })}>
					{i.message}
				</div>
			))}
		</div>
	);
};

interface ChatAvatarInterface {
	src?: string,
	srcSet?: string,
	className?: string,
	color?: string,
	unreadMessage?: number,
	isOnline?: boolean,
	size?: number,
	username?: string,
	name?: string,
	surname?: string
}

export const ChatAvatar = ({
	src,
	srcSet,
	className,
	color,
	unreadMessage,
	isOnline = false,
	size = 45,
	...props
}: ChatAvatarInterface) => {
	return (
		<div
			className={classNames('chat-avatar', className)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			<div className='position-relative'>
				{src && <Avatar srcSet={srcSet} src={src} size={size} color={color} />}
				{unreadMessage && (
					<span className='position-absolute top-15 start-85 translate-middle badge rounded-pill bg-danger'>
						{unreadMessage} <span className='visually-hidden'>unread messages</span>
					</span>
				)}
				{isOnline && (
					<span className='position-absolute top-85 start-85 translate-middle badge border border-2 border-light rounded-circle bg-success p-2'>
						<span className='visually-hidden'>Online user</span>
					</span>
				)}
			</div>
		</div>
	);
};

interface ChatGroupInterface {
	messages?: any[]
	isReply?: boolean,
	isOnline?: boolean,
	color?: string,
	user?: any
}

export const ChatGroup = ({ isReply = false, messages, isOnline = false, color, user, ...props }: ChatGroupInterface) => {
	const _Avatar = (
		<ChatAvatar
			src={user.src}
			srcSet={user.srcSet}
			username={user.username}
			name={user.name}
			surname={user.surname}
			isOnline={user.isOnline}
			color={user.color}
		/>
	);
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div className={classNames('chat-group', { 'chat-group-reply': isReply })} {...props}>
			{!isReply && _Avatar}
			<ChatMessages messages={messages} isReply={isReply} />
			{isReply && _Avatar}
		</div>
	);
};

interface ChatInterface {
	children: ReactNode
	className?: string
}

const Chat = ({ children, className }: ChatInterface) => {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div className={classNames('chat-container', className)}>{children}</div>
	);
};

export default Chat;
