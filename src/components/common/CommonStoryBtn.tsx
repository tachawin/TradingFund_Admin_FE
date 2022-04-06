import PropTypes from 'prop-types';
import Button from '../bootstrap/Button';

interface CommonStoryBn {
	to: string
	color?: string
}

const CommonStoryBtn = ({ to, ...props }: CommonStoryBn) => {
	return (
		<Button
			color='storybook'
			icon='CustomStorybook'
			tag='a'
			target='_blank'
			isLight
			href={`${process.env.REACT_APP_STORYBOOK_URL}${to}`}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			Storybook
		</Button>
	);
};

export default CommonStoryBtn;
