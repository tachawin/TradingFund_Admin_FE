import React, { useState, Fragment, useEffect } from 'react'
import PageWrapper from '../../../layout/PageWrapper/PageWrapper'
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight
} from '../../../layout/SubHeader/SubHeader'
import Page from '../../../layout/Page/Page'
import { pages } from '../../../menu'
import { useTranslation } from 'react-i18next'
import Button from 'components/bootstrap/Button'
import Product, { ProductModalProperties } from '../product/Product'
import Bank, { BankModalProperties } from '../bank/Bank'
import Level, { LevelModalProperties } from '../level/Level'
import ProductSubHeader from '../product/ProductSubHeader'
import BankSubHeader from '../bank/BankSubHeader'
import OTPSettings from '../otp/OTPSetting'
import InviteFriendSetting from '../invite_friend/InviteFriendSetting'
import { getSystemSetting, ServiceType, SystemSettingInterface, SystemSettingResponse } from 'common/apis/settings'
import showNotification from 'components/extras/showNotification'
import { InfoTwoTone } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { storeSetting } from 'redux/setting/action'
import CreditCondition, { CreditConditionModalProperties } from '../credit_condition/CreditCondition'

enum SettingPanel {
    Product = 'product',
    Bank = 'bank',
	Common = 'common'
}

const Settings = () => {
    const { t } = useTranslation(['common', 'settings'])
    const [panel, setPanel] = useState<SettingPanel>(SettingPanel.Common)
	const [isOpenProductModal, setIsOpenProductModal] = useState<ProductModalProperties>()
	const [isOpenBankModal, setIsOpenBankModal] = useState<BankModalProperties>()
	const [isOpenLevelModal, setIsOpenLevelModal] = useState<LevelModalProperties>()
	const [isOpenCreditConditionModal, setIsOpenCreditConditionModal] = useState<CreditConditionModalProperties>()
	const [isLoading, setIsLoading] = useState(false)

	const dispatch = useDispatch()

	const SETTING_PANELS = [
		{
			container: 'fluid',
			id: SettingPanel.Product,
			subHeader: <ProductSubHeader isOpenProductModal={isOpenProductModal} setIsOpenProductModal={setIsOpenProductModal} />,
			body:  <Product isOpenProductModal={isOpenProductModal} setIsOpenProductModal={setIsOpenProductModal} />
		},
		{
			id: SettingPanel.Bank,
			subHeader: <BankSubHeader isOpenBankModal={isOpenBankModal} setIsOpenBankModal={setIsOpenBankModal} />,
			body:  <Bank isOpenBankModal={isOpenBankModal} setIsOpenBankModal={setIsOpenBankModal} />
		},
		{
			id: SettingPanel.Common,
			subHeader: <></>,
			body: <div>
				<div className='row px-4'>
					<OTPSettings />
					<InviteFriendSetting />
				</div>
				<Level isOpenLevelModal={isOpenLevelModal} setIsOpenLevelModal={setIsOpenLevelModal} />
				<CreditCondition isOpenCreditConditionModal={isOpenCreditConditionModal} setIsOpenCreditConditionModal={setIsOpenCreditConditionModal} />
			</div>
		}
	]

	useEffect(() => {
		if (panel === SettingPanel.Common) {
			getSystemSetting((systemSettings: SystemSettingResponse[]) => {
				const newSystemSetting: SystemSettingInterface = {
					flagOTP: {
						admin: true,
						customer: true
					},
					referral: {
						firstLevel: 0,
						secondLevel: 0
					}
				}
				systemSettings.forEach((setting: SystemSettingResponse) => {
					newSystemSetting.flagOTP[setting.serviceType] = setting.flagOTP
					if (setting.serviceType === ServiceType.Customer) {
						newSystemSetting.referral.firstLevel = setting.firstReferralPercentage ?? 0
						newSystemSetting.referral.secondLevel = setting.secondReferralPercentage ?? 0
					}
				})
				dispatch(storeSetting(newSystemSetting))
			}, (error) => {
				const { response } = error
				console.log(response)
				showNotification(
					<span className='d-flex align-items-center'>
						<InfoTwoTone className='me-1' />
						<span>{t('get.otp.setting.failed')}</span>
					</span>, t('try.again')
				)
			}).finally(() => setIsLoading(false))
		}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [panel])

	return (
		<PageWrapper title={pages.settings.text}>
			{SETTING_PANELS.map((page) => 
				page.id === panel && <Fragment key={page.id}>
					<SubHeader className='g-3 pb-3'>
						<SubHeaderLeft className='col-md'>
							<Button
								color='primary'
								isLight
								isActive={panel === SettingPanel.Product}
								onClick={() => setPanel(SettingPanel.Product)}
								className='text-nowrap'
							>
								{t('product')}
							</Button>
							<Button
								color='primary'
								isLight
								isActive={panel === SettingPanel.Bank}
								onClick={() => setPanel(SettingPanel.Bank)}
								className='text-nowrap'
							>
								{t('bank')}
							</Button>
							<Button
								color='primary'
								isLight
								isActive={panel === SettingPanel.Common}
								onClick={() => setPanel(SettingPanel.Common)}
								className='text-nowrap'
							>
								{t('common')}
							</Button>
						</SubHeaderLeft>
						<SubHeaderRight className='col-md' style={{ minWidth: '400px' }}>
							{page.subHeader}
						</SubHeaderRight>
					</SubHeader>
					<Page container={page.container}>
						{page.body}
					</Page>
				</Fragment>
			)}
		</PageWrapper>
	)
}

export default Settings
