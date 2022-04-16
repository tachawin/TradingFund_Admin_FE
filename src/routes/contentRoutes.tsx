import React, { lazy } from 'react'
import { dashboardMenu, pages } from '../menu'

const LANDING = {
	DASHBOARD: lazy(() => import('../pages/presentation/dashboard/Dashboard')),
	ADMIN: lazy(() => import('../pages/presentation/admin/Admin')),
	REPORT: lazy(() => import('../pages/presentation/report/Report')),
	DEPOSIT: lazy(() => import('../pages/presentation/deposit/Deposit')),
	CUSTOMER: lazy(() => import('../pages/presentation/customer/Customer')),
	CUSTOMER_PROFILE: lazy(() => import('../pages/presentation/customer/CustomerProfile')),
	WITHDRAW: lazy(() => import('../pages/presentation/withdraw/Withdraw')),
	REWARD: lazy(() => import('../pages/presentation/reward/Reward')),
	CREDIT: lazy(() => import('../pages/presentation/credit/Credit')),
	BANK: lazy(() => import('../pages/presentation/bank/Bank')),
	PRODUCT: lazy(() => import('../pages/presentation/product/Product')),
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
	},
	{
		path: pages.deposit.path,
		element: <LANDING.DEPOSIT />,
		exact: true,
	},
	{
		path: pages.customer.path,
		element: <LANDING.CUSTOMER />,
		exact: true
	},
	{
		path: `${pages.customerID.path}/:id`,
		element: <LANDING.CUSTOMER_PROFILE />,
		exact: true,
	},
	{
		path: pages.withdraw.path,
		element: <LANDING.WITHDRAW />,
		exact: true,
	},
	{
		path: pages.reward.path,
		element: <LANDING.REWARD />,
		exact: true,
	},
	{
		path: pages.credit.path,
		element: <LANDING.CREDIT />,
		exact: true,
	},
	{
		path: pages.bank.path,
		element: <LANDING.BANK />,
		exact: true,
	},
	{
		path: pages.product.path,
		element: <LANDING.PRODUCT />,
		exact: true,
	}
]
const contents = [...presentation]

export default contents
