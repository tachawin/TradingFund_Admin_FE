import React, { useState } from 'react'
import Card, { CardActions, CardBody, CardHeader, CardLabel, CardTitle } from 'components/bootstrap/Card'
import { Calendar as DatePicker } from 'react-date-range'
import { getLabel } from 'components/extras/calendarHelper'
import { Views } from 'react-big-calendar'
import Dropdown, { DropdownMenu, DropdownToggle } from 'components/bootstrap/Dropdown'
import Icon from 'components/icon/Icon'
import { useTranslation } from 'react-i18next'
import { th } from 'date-fns/locale'

interface MetricInterface {
    type: MetricBoardType
    deposit: number
    withdraw: number
}

export enum MetricBoardType {
    Day = 'day',
    Night = 'night'
}

const MetricBoard = ({ type, deposit, withdraw }: MetricInterface) => {
    const { t } = useTranslation('dashboard')
    const [date, setDate] = useState<Date>(new Date())
    const [isOpenCalendar, setIsOpenCalendar] = useState(false)

    const onDateChange = (item: Date) => {
        setDate(item)
        setIsOpenCalendar(false)
    }

    return (
        <Card className='col'>
			<CardHeader className='pb-2'>
                <CardLabel>
                    <div className="d-flex row g-2 align-items-center">
                        {type === MetricBoardType.Day ? <>
                            <Icon className='col' icon='Sunrise' size='2x' color='primary' />
                            <CardTitle className="col mx-2 text-nowrap">00:00 - 12:00</CardTitle></>
                            : 
                            <><Icon className='col' icon='SunsetFill' size='2x' color='primary' />
                            <CardTitle className="col mx-2 text-nowrap">12:01 - 23:59</CardTitle></>
                        }
                    </div>
                </CardLabel>
				<CardActions>
                    <Dropdown>
                        <DropdownToggle color='primary' isLight hasIcon={false} isOpen={isOpenCalendar} setIsOpen={setIsOpenCalendar}>
                            <span>{getLabel(date, Views.DAY)}</span>
                        </DropdownToggle>
                        <DropdownMenu className='p-0' isAlignmentEnd isOpen={isOpenCalendar} setIsOpen={setIsOpenCalendar}>
                            <DatePicker
								onChange={onDateChange}
								date={date}
								color={process.env.REACT_APP_PRIMARY_COLOR}
                                locale={th}
							/>
                        </DropdownMenu>
                    </Dropdown>
				</CardActions>
			</CardHeader>
			<CardBody className='row g-4 py-0'>
                <div className='col'>
                    <Card style={{ minWidth: 136 }}>
                        <CardLabel className='p-3'>
                            <div className="d-flex row g-2 align-items-center">
                                <Icon className='col text-nowrap' icon='AttachMoney' size='2x' color='success' />
                                <span className='col align-self-center text-nowrap'>{t('deposit')}</span>
                            </div>
                        </CardLabel>
                        <CardBody className="pt-0 align-self-center">
                            <span color='success' className='fs-3 fw-bold text-success'>
                                {deposit.toLocaleString()}
							</span>
                        </CardBody>
                    </Card>
                </div>
                <div className='col'>
                    <Card style={{ minWidth: 136 }}>
                        <CardLabel className='p-3'>
                            <div className="d-flex row g-2 align-items-center">
                                <Icon className='col' icon='MoneyOff' size='2x' color='danger' />
                                <span className='col align-self-center text-nowrap'>{t('withdraw')}</span>
                            </div>
                        </CardLabel>
                        <CardBody className="pt-0 align-self-center">
                            <span color='success' className='fs-3 fw-bold text-danger'>
                                {withdraw.toLocaleString()}
							</span>
                        </CardBody>
                    </Card>
                </div>
			</CardBody>
		</Card>
    )
}

export default MetricBoard