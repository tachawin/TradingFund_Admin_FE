import { useState, useMemo } from 'react';

export interface ConfigInterface {
	key: any
	direction: string
}

const useSortableData = (items: any, config: ConfigInterface | null = null) => {
	const [sortConfig, setSortConfig] = useState<ConfigInterface | null>(config);

	const sortedItems = useMemo(() => {
		const sortableItems = [...items];
		if (sortConfig !== null) {
			sortableItems.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === 'ascending' ? -1 : 1;
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === 'ascending' ? 1 : -1;
				}
				return 0;
			});
		}
		return sortableItems;
	}, [items, sortConfig]);

	const requestSort = (key: any) => {
		let direction = 'ascending';
		if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
			direction = 'descending';
		}
		setSortConfig({ key, direction });
	};

	const getClassNamesFor = (key: any) => {
		if (!sortConfig) {
			return 'd-none';
		}
		// eslint-disable-next-line consistent-return
		return sortConfig.key === key ? sortConfig.direction : 'd-none';
	};

	return { items: sortedItems, requestSort, getClassNamesFor, sortConfig };
};

export default useSortableData;
