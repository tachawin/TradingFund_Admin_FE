import React, { ReactNode, useState } from 'react'

import Dropdown, {
	DropdownMenu,
	DropdownToggle,
} from 'components/bootstrap/Dropdown'
import Button from 'components/bootstrap/Button'
import FormGroup from 'components/bootstrap/forms/FormGroup'

interface Filter {
    label: string
    children: ReactNode
}

interface CommonTableFilterInterface {
    filters: Filter[]
    resetLabel: string
    onReset: () => void
    submitLabel: string
    onSubmit: () => void
}

const CommonTableFilter = ({ filters, resetLabel, onReset, submitLabel, onSubmit }: CommonTableFilterInterface) => {
	const [isOpenFilter, setOpenFilter] = useState(false)

    return (
        <Dropdown>
            <DropdownToggle icon='FilterAlt' hasIcon={false} color='dark' isLight isOpen={Boolean(isOpenFilter)} setIsOpen={setOpenFilter} />
                
            <DropdownMenu isAlignmentEnd size='lg' isOpen={isOpenFilter} setIsOpen={setOpenFilter}>
                <div className='container py-2'>
                    <div className='row g-3'>
                        {filters.map((filter: Filter, index: number) => 
                            <FormGroup label={filter.label} key={index} className='col-12'>
                                {filter.children}
                            </FormGroup>
                        )}
                        <div className='col-6'>
                            <Button
                                color='primary'
                                isOutline
                                className='w-100'
                                onClick={onReset}
                            >
                                {resetLabel}
                            </Button>
                        </div>
                        <div className='col-6'>
                            <Button color='primary' className='w-100' type='submit' onClick={onSubmit}>
                                {submitLabel}
                            </Button>
                        </div>
                    </div>     
                </div>
            </DropdownMenu>
        </Dropdown>
  )
}

export default CommonTableFilter