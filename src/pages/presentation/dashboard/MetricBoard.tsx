import { AttachMoneyOutlined, DarkModeOutlined, LightModeOutlined, MoneyOffOutlined } from '@mui/icons-material'
import COLORS from 'common/data/enumColors'
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from 'components/bootstrap/Card'
import Spinner from 'components/bootstrap/Spinner'
import { useTranslation } from 'react-i18next'

interface MetricInterface {
    isLoading: boolean
    type: MetricBoardType
    deposit?: number
    withdraw?: number
}

export enum MetricBoardType {
    Day = 'day',
    Night = 'night'
}

const MetricBoard = ({ isLoading, type, deposit, withdraw }: MetricInterface) => {
    const { t } = useTranslation('dashboard')

    return (
        <Card className='col'>
			<CardHeader className='pb-2'>
                <CardLabel>
                    <div className="d-flex row g-2 align-items-center">
                        {type === MetricBoardType.Day ? <>
                            <LightModeOutlined htmlColor={COLORS.PRIMARY.code} fontSize='large' />
                            <CardTitle className="col mx-2 text-nowrap">00:00 - 12:00</CardTitle></>
                            : 
                            <><DarkModeOutlined htmlColor={COLORS.PRIMARY.code} fontSize='large' />
                            <CardTitle className="col mx-2 text-nowrap">12:01 - 23:59</CardTitle></>
                        }
                    </div>
                </CardLabel>
			</CardHeader>
			<CardBody className='row g-4 py-0'>
                <div className='col'>
                    <Card style={{ minWidth: 136 }}>
                        <CardLabel className='p-3'>
                            <div className="d-flex row g-2 align-items-center">
                                <AttachMoneyOutlined htmlColor={COLORS.SUCCESS.code} fontSize='large' />
                                <span className='col align-self-center text-nowrap'>{t('deposit')}</span>
                            </div>
                        </CardLabel>
                        <CardBody className="pt-0 align-self-center">
                            <span color='success' className='fs-3 fw-bold text-success'>
                                {isLoading ? <Spinner color='primary' size={12} /> : deposit?.toLocaleString()}
							</span>
                        </CardBody>
                    </Card>
                </div>
                <div className='col'>
                    <Card style={{ minWidth: 136 }}>
                        <CardLabel className='p-3'>
                            <div className="d-flex row g-2 align-items-center">
                                <MoneyOffOutlined htmlColor={COLORS.DANGER.code} fontSize='large' />
                                <span className='col align-self-center text-nowrap'>{t('withdraw')}</span>
                            </div>
                        </CardLabel>
                        <CardBody className="pt-0 align-self-center">
                            <span color='success' className='fs-3 fw-bold text-danger'>
                                {isLoading ? <Spinner color='primary' size={14} /> : withdraw?.toLocaleString()}
							</span>
                        </CardBody>
                    </Card>
                </div>
			</CardBody>
		</Card>
    )
}

export default MetricBoard