import React, { lazy } from 'react'
import { dashboardMenu, pages } from '../menu'

const LANDING = {
	DASHBOARD: lazy(() => import('../pages/presentation/dashboard/Dashboard')),
	DASHBOARD_BOOKING: lazy(() => import('../pages/dashboard/DashboardBookingPage')),
	SUMMARY: lazy(() => import('../pages/SummaryPage')),
	ADMIN: lazy(() => import('../pages/presentation/admin/Admin')),
	REPORT: lazy(() => import('../pages/presentation/report/Report'))
}

const AUTH = {
	LOGIN: lazy(() => import('../pages/presentation/auth/Login')),
	OTP: lazy(() => import('../pages/presentation/auth/OTP')),
	PAGE_404: lazy(() => import('../pages/presentation/auth/Page404')),
}

const presentation = [
	/**
	 * Landing
	 */
	{
		path: dashboardMenu.dashboard.path,
		element: <LANDING.DASHBOARD />,
		exact: true,
	},
	{
		path: dashboardMenu.admin.path,
		element: <LANDING.ADMIN />,
		exact: true,
	},
	{
		path: dashboardMenu.summary.path,
		element: <LANDING.SUMMARY />,
		exact: true,
	},

	/**
	 * Auth Page
	 */
	{
		path: pages.login.path,
		element: <AUTH.LOGIN />,
		exact: true,
	},
	{
		path: pages.otp.path,
		element: <AUTH.OTP />,
		exact: true,
	},

	/**
	 * Admin Page
	 */
	{
		path: pages.admin.path,
		element: <LANDING.ADMIN />,
		exact: true,
	},

	{
		path: pages.report.path,
		element: <LANDING.REPORT />,
		exact: true,
	}
]
const contents = [...presentation]

export default contents
