import React, { useState } from 'react'
import Button from 'components/bootstrap/Button'
import Card, { CardActions, CardBody, CardHeader, CardLabel, CardTitle } from 'components/bootstrap/Card'
import { Calendar as DatePicker } from 'react-date-range'
import { getLabel } from 'components/extras/calendarHelper'
import { Views } from 'react-big-calendar'
import Dropdown, { DropdownMenu, DropdownToggle } from 'components/bootstrap/Dropdown'
import Icon from 'components/icon/Icon'
import { useTranslation } from 'react-i18next'

interface MetricInterface {
    title: string
    dayTotal: number
    nightTotal: number
}

const MetricBoard = ({ title, dayTotal, nightTotal }: MetricInterface) => {
    const { t } = useTranslation('dashboard')
    const [date, setDate] = useState<Date>(new Date())
    const [isOpenCalendar, setIsOpenCalendar] = useState(false)

    const onDateChange = (item: Date) => {
        setDate(item)
        setIsOpenCalendar(false)
    }

    return (
        <Card>
			<CardHeader>
				<CardLabel>
                    <div className="d-flex col align-items-center">
                        <Icon icon='Money' size='2x' color='primary' />
                        <CardTitle className="mx-2">{title}</CardTitle>
                    </div>
				</CardLabel>
				<CardActions>
                    <Dropdown>
                        <DropdownToggle color='dark' isLight hasIcon={false} isOpen={isOpenCalendar} setIsOpen={setIsOpenCalendar}>
                            <span>{getLabel(date, Views.DAY)}</span>
                        </DropdownToggle>
                        <DropdownMenu isAlignmentEnd isOpen={isOpenCalendar} setIsOpen={setIsOpenCalendar}>
                            <DatePicker
								onChange={onDateChange}
								date={date}
								color={process.env.REACT_APP_PRIMARY_COLOR}
							/>
                        </DropdownMenu>
                    </Dropdown>
				</CardActions>
			</CardHeader>
			<CardBody className='row g-4 py-0'>
                <div className='col-xl-6'>
                    <Card>
                        <CardHeader>
                            <CardTitle className="mb-0">{t('day.time')}</CardTitle>
                            <div className="mb-0">00:00 - 12:00</div>
                        </CardHeader>
                        <CardBody className="pt-0">
                            <h2 className="fw-bolder text-center">{dayTotal.toLocaleString()}</h2>
                        </CardBody>
                    </Card>
                </div>
                <div className='col-xl-6'>
                    <Card>
                        <CardHeader>
                            <CardTitle className="mb-0">{t('night.time')}</CardTitle>
                            <div className="mb-0">12:01 - 23:59</div>
                        </CardHeader>
                        <CardBody className="pt-0">
                            <h2 className="fw-bolder text-center">{nightTotal.toLocaleString()}</h2>
                        </CardBody>
                    </Card>
                </div>
			</CardBody>
		</Card>
    )
}

export default MetricBoard