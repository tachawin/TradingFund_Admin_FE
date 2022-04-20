import React from 'react'
import PageWrapper from '../../../layout/PageWrapper/PageWrapper'
import Page from '../../../layout/Page/Page'
import { demoPages } from '../../../menu'
import CustomerTrafficBoard from './CustomerTrafficBoard'
import MetricBoard, { MetricBoardType } from './MetricBoard'
import { useTranslation } from 'react-i18next'


const Dashboard = () => {
    const { t } = useTranslation('dashboard')

	return (
		<PageWrapper title={demoPages.crm.subMenu.dashboard.text}>
			<Page>
				<div className='col'>
                    <div className='row gap-4 px-4'>
                        <MetricBoard 
							type={MetricBoardType.Day} 
							deposit={1876300.00} 
							withdraw={12920.65} 
						/>
                        <MetricBoard 
							type={MetricBoardType.Night} 
							deposit={78000.14} 
							withdraw={6520.10} 
						/>
                    </div>
					<div className='row px-4'>
						<CustomerTrafficBoard />
					</div>
				</div>
			</Page>
		</PageWrapper>
	)
}

export default Dashboard
