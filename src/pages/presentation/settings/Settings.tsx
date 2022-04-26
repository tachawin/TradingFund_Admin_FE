import React, { useState, Fragment } from 'react'
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
import LevelSubHeader from '../level/LevelSubHeader'
import BankSubHeader from '../bank/BankSubHeader'

enum SettingPanel {
    Product = 'product',
    Bank = 'bank',
    Level = 'level'
}

const Settings = () => {
    const { t } = useTranslation(['common', 'settings'])
    const [panel, setPanel] = useState<SettingPanel>(SettingPanel.Product)
	const [isOpenProductModal, setIsOpenProductModal] = useState<ProductModalProperties>()
	const [isOpenBankModal, setIsOpenBankModal] = useState<BankModalProperties>()
	const [isOpenLevelModal, setIsOpenLevelModal] = useState<LevelModalProperties>()

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
			id: SettingPanel.Level,
			subHeader: <LevelSubHeader isOpenLevelModal={isOpenLevelModal} setIsOpenLevelModal={setIsOpenLevelModal} />,
			body:  <Level isOpenLevelModal={isOpenLevelModal} setIsOpenLevelModal={setIsOpenLevelModal} />
		}
	]


	return (
		<PageWrapper title={pages.settings.text}>
			{SETTING_PANELS.map((page) => 
				page.id === panel && <Fragment key={page.id}>
					<SubHeader>
						<SubHeaderLeft>
							<Button
								color='primary'
								isLight
								isActive={panel === SettingPanel.Product}
								onClick={() => setPanel(SettingPanel.Product)}
							>
								{t('product')}
							</Button>
							<Button
								color='primary'
								isLight
								isActive={panel === SettingPanel.Bank}
								onClick={() => setPanel(SettingPanel.Bank)}
							>
								{t('bank')}
							</Button>
							<Button
								color='primary'
								isLight
								isActive={panel === SettingPanel.Level}
								onClick={() => setPanel(SettingPanel.Level)}
							>
								{t('level')}
							</Button>
						</SubHeaderLeft>
						<SubHeaderRight className='w-50'>
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
