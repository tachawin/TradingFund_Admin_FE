import React from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import Navigation from '../Navigation/Navigation';
import { dashboardMenu } from '../../menu';

import useAsideTouch from '../../hooks/useAsideTouch';
import User from 'layout/User/User';

const Aside = () => {

	return (
		<>
			<motion.aside
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
