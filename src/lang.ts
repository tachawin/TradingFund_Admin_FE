const LANG = {
	TH: {
		text: 'Thai',
		lng: 'th-TH',
		icon: 'CustomThai',
	},
};

export const getLangWithKey = (key: any) => {
	return Object.values(LANG).filter((f) => f.lng === key)[0];
};

export default LANG;
