import COLORS from './enumColors';

const TAGS = [
	{
		id: 'critical',
		color: COLORS.SUCCESS.name,
		title: 'Critical',
	},
	{
		id: 'design',
		color: COLORS.WARNING.name,
		title: 'Design',
	},
	{
		id: 'code',
		color: COLORS.INFO.name,
		title: 'Code',
	},
	{
		id: 'review',
		color: COLORS.INFO.name,
		title: 'Review',
	},
	{
		id: 'revise',
		color: COLORS.SECONDARY.name,
		title: 'Revise',
	},
];

export function getTagsDataWithId(id: string): any[] {
	return TAGS.filter((tag) => tag.id === id);
}

export default TAGS;
