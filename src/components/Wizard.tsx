import { Children, cloneElement, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from './bootstrap/Card';
import Button from './bootstrap/Button';
import Popovers from './bootstrap/Popovers';
import useDarkMode from '../hooks/useDarkMode';

interface WizardItemInterface {
	id: string,
	children: any,
	title?: string,
	className?: string,
}

export const WizardItem = ({ id, title, children, className, ...props }: WizardItemInterface) => {
	return (
		<section
			id={id}
			className={classNames('wizard-item', className)}
			role='tabpanel'
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</section>
	);
};

interface WizardInterface {
	children: any,
	color?: string,
	isHeader?: string | boolean,
	onSubmit: any,
	stretch?: string | boolean,
	className?: string,
	noValidate?: boolean
	isValid?: boolean,
	onNext?: any,
	activeItemIndex: number,
	setActiveItemIndex?: any
}

const Wizard = ({ children, activeItemIndex, setActiveItemIndex, onSubmit, isHeader = false, color = 'primary', stretch, onNext, isValid = false, ...props }: WizardInterface) => {
	const { themeStatus } = useDarkMode();
	const childCount = children.length;

	const getTitleName = (i: any) => {
		return `Step ${i + 1}`;
	};

	const prevBtn = !!activeItemIndex && (
		<Button color={color} isLink onClick={() => setActiveItemIndex(activeItemIndex - 1)}>
			Previous
		</Button>
	);

	const nextBtn = (
		<>
			<Button
				className={classNames({ 'd-none': childCount === activeItemIndex + 1 }, 'me-0')}
				aria-hidden={childCount === activeItemIndex + 1}
				color={color}
				isLight
				onClick={onNext}>
				Next
			</Button>
			<Button
				className={classNames({ 'd-none': childCount !== activeItemIndex + 1 })}
				aria-hidden={childCount !== activeItemIndex + 1}
				type='submit'
				onClick={onSubmit}
				color={color}>
				Submit
			</Button>
		</>
	);

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<Card stretch={stretch} tag='form' onSubmit={onSubmit} {...props}>
			{!!isHeader && (
				<CardHeader>
					<CardLabel icon='Assignment' iconColor={color}>
						{Children.map(children, (child, index) => (
							<CardTitle
								key={child.props.id}
								className={index !== activeItemIndex ? 'd-none' : undefined}>
								{child.props.title || getTitleName(index)}
							</CardTitle>
						))}
					</CardLabel>
					{isHeader === 'withButton' && (
						<CardActions>
							{prevBtn}
							{nextBtn}
						</CardActions>
					)}
				</CardHeader>
			)}
			<CardBody isScrollable={!!stretch}>
				<div className='wizard-progress position-relative'>
					<div className='progress'>
						<div
							className={classNames('progress-bar', {
								[`bg-${color}`]: color !== 'primary',
							})}
							role='progressbar'
							style={{ width: `${(100 / (childCount - 1)) * activeItemIndex}%` }}
							aria-valuenow={(100 / (childCount - 1)) * activeItemIndex}
							aria-valuemin={0}
							aria-valuemax={100}
							aria-label='progress'
						/>
					</div>
					{Children.map(children, (child, index) => (
						<Popovers
							key={child.props.id}
							desc={child.props.title || getTitleName(index)}
							trigger='hover'>
							<button
								type='button'
								className={classNames(
									'wizard-progress-btn',
									'position-absolute p-0 top-0',
									'translate-middle',
									'btn btn-sm',
									{
										[`btn-${color}`]: activeItemIndex >= index,
										[`btn-${themeStatus}`]: activeItemIndex < index,
									},
									'rounded-pill',
								)}
								style={{
									left: `${(100 / (childCount - 1)) * index}%`,
								}}
								onClick={() => setActiveItemIndex(index)}>
								{index + 1}
							</button>
						</Popovers>
					))}
				</div>

				<div className='wizard'>
					{Children.map(children, (child, index) =>
						cloneElement(child, {
							className: index !== activeItemIndex ? 'd-none' : '',
							'aria-hidden': index !== activeItemIndex,
						}),
					)}
				</div>
			</CardBody>
			<CardFooter>
				<CardFooterLeft>{prevBtn}</CardFooterLeft>
				<CardFooterRight>{nextBtn}</CardFooterRight>
			</CardFooter>
		</Card>
	);
};

export default Wizard;
