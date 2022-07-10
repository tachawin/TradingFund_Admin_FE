import React from 'react'

const CommonTableNotFound = () => {
    return (
        <div className='col-12 d-flex flex-column justify-content-center align-items-center'>
            <div
                className='text-dark fw-bold'
                style={{ fontSize: 'calc(1.5rem + 1.5vw)' }}>
                ไม่พบข้อมูล
            </div>
        </div>
    )
}

export default CommonTableNotFound