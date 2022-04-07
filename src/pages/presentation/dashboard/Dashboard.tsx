import React from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import { demoPages } from '../../../menu';
import CustomerTrafficBoard from './CustomerTrafficBoard';
import MetricBoard from './MetricBoard';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
    const { t } = useTranslation('dashboard')

	return (
		<PageWrapper title={demoPages.crm.subMenu.dashboard.text}>
			<Page>
				<div className='row'>
					<div className='col-lg-8'>
						<CustomerTrafficBoard />
					</div>
                    <div className='col-lg-4'>
                        <MetricBoard title={t('deposit')} dayTotal={1876300.00} nightTotal={12920.65} />
                        <MetricBoard title={t('withdraw')} dayTotal={78000.14} nightTotal={6520.10} />
                    </div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Dashboard;
