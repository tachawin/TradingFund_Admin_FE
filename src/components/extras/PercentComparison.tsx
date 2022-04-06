import Icon from '../icon/Icon';

interface PercentComparisonInterface {
	valueOne: number,
	valueTwo: number,
}

const PercentComparison = ({ valueOne, valueTwo }: PercentComparisonInterface) => {
	const _value = (valueOne / valueTwo) * 100;
	function getIcon() {
		if (_value > 0) {
			return { icon: 'TrendingUp', color: 'success' };
		}
		if (_value < 0) {
			return { icon: 'TrendingDown', color: 'danger' };
		}
		return { icon: 'TrendingFlat', color: 'info' };
	}
	return (
		<span className={`text-${getIcon().color} fs-5 fw-bold ms-3 d-inline`}>
			{`${_value}%`}
			<Icon icon={getIcon().icon} />
		</span>
	);
};

export default PercentComparison;
