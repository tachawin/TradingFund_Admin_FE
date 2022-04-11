import React, { useEffect, useRef } from 'react'
import classNames from 'classnames'

interface ValidationInterface {
	isTouched?: boolean
	invalidFeedback?: string
	validFeedback?: string
	isTooltip?: boolean
}

const Validation = ({ isTouched = false, invalidFeedback, validFeedback, isTooltip = false }: ValidationInterface) => {
	const ref = useRef<any>(null)

	useEffect(() => {
		if (isTooltip) {
			for (let i = 0; i < ref?.current?.parentNode.classList.length; i += 1) {
				if (['input-group'].includes(ref?.current?.parentNode.classList[i])) {
					ref?.current?.parentNode.parentNode.classList.add('position-relative')
				} else {
					ref?.current?.parentNode.classList.add('position-relative')
				}
			}
		}
	})

	if (isTouched && invalidFeedback) {
		return (
			<div
				ref={ref}
				className={classNames({
					'invalid-feedback': !isTooltip,
					'invalid-tooltip': isTooltip,
				})}>
				{invalidFeedback}
			</div>
		)
	}
	return (
		!invalidFeedback &&
		validFeedback ? (
			<div
				ref={ref}
				className={classNames({
					'valid-feedback': !isTooltip,
					'valid-tooltip': isTooltip,
				})}>
				{validFeedback}
			</div>
		) : <></>
	)
}

export default Validation
