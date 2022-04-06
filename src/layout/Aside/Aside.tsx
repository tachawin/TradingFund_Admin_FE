import React from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Navigation from '../Navigation/Navigation';
import { dashboardMenu } from '../../menu';

import useAsideTouch from '../../hooks/useAsideTouch';
import User from 'layout/User/User';

const Aside = () => {
	const { asideStyle } = useAsideTouch();

	const { t } = useTranslation(['translation', 'menu']);

	return (
		<>
			<motion.aside
				style={asideStyle}
				className={classNames(
					'aside'
				)}>
				<div className='aside-body'>
					<Navigation menu={dashboardMenu} horizontal id='aside-dashboard' />
				</div>
				<div className='aside-foot'>
					<User />
				</div>
			</motion.aside>
		</>
	);
};

export default Aside;
