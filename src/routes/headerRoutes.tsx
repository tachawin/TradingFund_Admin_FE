import React from 'react'
import { dashboardMenu, pages } from '../menu'
import DashboardHeader from '../pages/common/Headers/DashboardHeader'
import DefaultHeader from '../pages/common/Headers/DefaultHeader'

const headers = [
	{ path: pages.login.path, element: null, exact: true },
	{ path: pages.otp.path, element: null, exact: true },
	{
		path: `*`,
		element: <DefaultHeader />,
	},
]

export default headers
