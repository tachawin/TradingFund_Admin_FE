interface CommonStoryLinkInterface {
	children: any,
	to: string,
}

const CommonStoryLink = ({ to, children, ...props }: CommonStoryLinkInterface) => {
	return (
		<a
			href={`${process.env.REACT_APP_STORYBOOK_URL}${to}`}
			target='_blank'
			rel='noreferrer'
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</a>
	);
};

export default CommonStoryLink;
