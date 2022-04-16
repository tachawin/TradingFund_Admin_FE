const data = [
	{
		id: 1,
		image: '/assets/img/abstract/beveled-cone.png',
		name: 'Beveled Cone',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pharetra, purus sed ultricies mollis, felis tellus tempus ipsum, sed bibendum elit urna aliquam justo. Ut eu facilisis eros. Nullam maximus ut enim id accumsan. Vestibulum rutrum purus posuere, ullamcorper purus sed, convallis neque. Praesent at dui id odio convallis eleifend ut volutpat nisl. Mauris fringilla lorem aliquam rutrum feugiat. Quisque felis diam, posuere non mauris quis, blandit luctus nibh. Etiam eleifend arcu ipsum, condimentum elementum eros finibus in.',
		points: 3000123123,
		remaining: 21321,
		category: '3D Shapes',
		series: [
			{
				data: [25, 66, 41, 89, 63],
			},
		],
		color: process.env.REACT_APP_SUCCESS_COLOR,
		stock: 380,
		price: 14.5,
		store: 'Company A',
		file: 'Figma',
	},
	{
		id: 2,
		image: '/assets/img/abstract/cloud-ball.png',
		name: 'Cloud Ball',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pharetra, purus sed ultricies mollis, felis tellus tempus ipsum, sed bibendum elit urna aliquam justo. Ut eu facilisis eros. Nullam maximus ut enim id accumsan. Vestibulum rutrum purus posuere, ullamcorper purus sed, convallis neque. Praesent at dui id odio convallis eleifend ut volutpat nisl. Mauris fringilla lorem aliquam rutrum feugiat. Quisque felis diam, posuere non mauris quis, blandit luctus nibh. Etiam eleifend arcu ipsum, condimentum elementum eros finibus in.',
		points: 20,
		remaining: 10,
		category: '3D Shapes',
		series: [
			{
				data: [12, 24, 33, 12, 48],
			},
		],
		color: process.env.REACT_APP_SUCCESS_COLOR,
		stock: 1245,
		price: 12,
		store: 'Company A',
		file: 'Figma',
	},
	{
		id: 3,
		image: '../../assets/img/abstract/quadrilateral.png',
		name: 'Quadrilateral',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pharetra, purus sed ultricies mollis, felis tellus tempus ipsum, sed bibendum elit urna aliquam justo. Ut eu facilisis eros. Nullam maximus ut enim id accumsan. Vestibulum rutrum purus posuere, ullamcorper purus sed, convallis neque. Praesent at dui id odio convallis eleifend ut volutpat nisl. Mauris fringilla lorem aliquam rutrum feugiat. Quisque felis diam, posuere non mauris quis, blandit luctus nibh. Etiam eleifend arcu ipsum, condimentum elementum eros finibus in.',
		points: 200,
		remaining: 999,
		category: '3D Shapes',
		series: [
			{
				data: [34, 32, 36, 34, 34],
			},
		],
		color: process.env.REACT_APP_WARNING_COLOR,
		stock: 27,
		price: 12.8,
		store: 'Company D',
		file: 'XD',
	},
	{
		id: 4,
		image: '../../assets/img/abstract/hald-sharp-donut.png',
		name: 'Bendy Rectangle',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pharetra, purus sed ultricies mollis, felis tellus tempus ipsum, sed bibendum elit urna aliquam justo. Ut eu facilisis eros. Nullam maximus ut enim id accumsan. Vestibulum rutrum purus posuere, ullamcorper purus sed, convallis neque. Praesent at dui id odio convallis eleifend ut volutpat nisl. Mauris fringilla lorem aliquam rutrum feugiat. Quisque felis diam, posuere non mauris quis, blandit luctus nibh. Etiam eleifend arcu ipsum, condimentum elementum eros finibus in.',
		points: 78008,
		remaining: 100,
		category: '3D Shapes',
		series: [
			{
				data: [54, 34, 42, 23, 12],
			},
		],
		color: process.env.REACT_APP_DANGER_COLOR,
		stock: 219,
		price: 16,
		store: 'Company C',
		file: 'Sketch',
	},
	{
		id: 5,
		image: '../../assets/img/abstract/bendy-rectangle.png',
		name: 'Bendy Rectangle',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pharetra, purus sed ultricies mollis, felis tellus tempus ipsum, sed bibendum elit urna aliquam justo. Ut eu facilisis eros. Nullam maximus ut enim id accumsan. Vestibulum rutrum purus posuere, ullamcorper purus sed, convallis neque. Praesent at dui id odio convallis eleifend ut volutpat nisl. Mauris fringilla lorem aliquam rutrum feugiat. Quisque felis diam, posuere non mauris quis, blandit luctus nibh. Etiam eleifend arcu ipsum, condimentum elementum eros finibus in.',
		points: 123123,
		remaining: 20,
		category: '3D Shapes',
		series: [
			{
				data: [23, 21, 12, 34, 14],
			},
		],
		color: process.env.REACT_APP_DANGER_COLOR,
		stock: 219,
		price: 16,
		store: 'Company A',
		file: 'Figma',
	},
	{
		id: 6,
		image: '../../assets/img/abstract/infinity.png',
		name: 'Bendy Rectangle',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pharetra, purus sed ultricies mollis, felis tellus tempus ipsum, sed bibendum elit urna aliquam justo. Ut eu facilisis eros. Nullam maximus ut enim id accumsan. Vestibulum rutrum purus posuere, ullamcorper purus sed, convallis neque. Praesent at dui id odio convallis eleifend ut volutpat nisl. Mauris fringilla lorem aliquam rutrum feugiat. Quisque felis diam, posuere non mauris quis, blandit luctus nibh. Etiam eleifend arcu ipsum, condimentum elementum eros finibus in.',
		points: 3000123123,
		remaining: 21321,
		category: '3D Shapes',
		series: [
			{
				data: [23, 13, 34, 41, 38],
			},
		],
		color: process.env.REACT_APP_SUCCESS_COLOR,
		stock: 219,
		price: 16,
		store: 'Company C',
		file: 'Figma',
	},
	{
		id: 7,
		image: '../../assets/img/abstract/octahedron.png',
		name: 'Octahedron',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pharetra, purus sed ultricies mollis, felis tellus tempus ipsum, sed bibendum elit urna aliquam justo. Ut eu facilisis eros. Nullam maximus ut enim id accumsan. Vestibulum rutrum purus posuere, ullamcorper purus sed, convallis neque. Praesent at dui id odio convallis eleifend ut volutpat nisl. Mauris fringilla lorem aliquam rutrum feugiat. Quisque felis diam, posuere non mauris quis, blandit luctus nibh. Etiam eleifend arcu ipsum, condimentum elementum eros finibus in.',
		points: 3000123123,
		remaining: 21321,
		category: '3D Shapes',
		series: [
			{
				data: [21, 34, 23, 12, 67],
			},
		],
		color: process.env.REACT_APP_SUCCESS_COLOR,
		stock: 498,
		price: 18,
		store: 'Company B',
		file: 'Figma',
	},
	{
		id: 8,
		image: '../../assets/img/abstract/triangle.png',
		name: 'Triangle',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pharetra, purus sed ultricies mollis, felis tellus tempus ipsum, sed bibendum elit urna aliquam justo. Ut eu facilisis eros. Nullam maximus ut enim id accumsan. Vestibulum rutrum purus posuere, ullamcorper purus sed, convallis neque. Praesent at dui id odio convallis eleifend ut volutpat nisl. Mauris fringilla lorem aliquam rutrum feugiat. Quisque felis diam, posuere non mauris quis, blandit luctus nibh. Etiam eleifend arcu ipsum, condimentum elementum eros finibus in.',
		points: 3000123123,
		remaining: 21321,
		category: '3D Shapes',
		series: [
			{
				data: [18, 32, 26, 15, 34],
			},
		],
		color: process.env.REACT_APP_SUCCESS_COLOR,
		stock: 219,
		price: 16,
		store: 'Company B',
		file: 'Figma',
	},
	{
		id: 9,
		image: '../../assets/img/abstract/squigly-globe.png',
		name: 'SquiglyGlobe',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pharetra, purus sed ultricies mollis, felis tellus tempus ipsum, sed bibendum elit urna aliquam justo. Ut eu facilisis eros. Nullam maximus ut enim id accumsan. Vestibulum rutrum purus posuere, ullamcorper purus sed, convallis neque. Praesent at dui id odio convallis eleifend ut volutpat nisl. Mauris fringilla lorem aliquam rutrum feugiat. Quisque felis diam, posuere non mauris quis, blandit luctus nibh. Etiam eleifend arcu ipsum, condimentum elementum eros finibus in.',
		points: 3000123123,
		remaining: 21321,
		category: '3D Shapes',
		series: [
			{
				data: [18, 32, 26, 15, 34],
			},
		],
		color: process.env.REACT_APP_SUCCESS_COLOR,
		stock: 219,
		price: 16,
		store: 'Company C',
		file: 'Figma',
	},
	{
		id: 10,
		image: '../../assets/img/abstract/dodecagon.png',
		name: 'Dodecagon',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pharetra, purus sed ultricies mollis, felis tellus tempus ipsum, sed bibendum elit urna aliquam justo. Ut eu facilisis eros. Nullam maximus ut enim id accumsan. Vestibulum rutrum purus posuere, ullamcorper purus sed, convallis neque. Praesent at dui id odio convallis eleifend ut volutpat nisl. Mauris fringilla lorem aliquam rutrum feugiat. Quisque felis diam, posuere non mauris quis, blandit luctus nibh. Etiam eleifend arcu ipsum, condimentum elementum eros finibus in.',
		points: 3000123123,
		remaining: 21321,
		category: '3D Shapes',
		series: [
			{
				data: [18, 32, 26, 15, 34],
			},
		],
		color: process.env.REACT_APP_SUCCESS_COLOR,
		stock: 219,
		price: 16,
		store: 'Company A',
		file: 'Figma',
	},
	{
		id: 11,
		image: '../../assets/img/abstract/beveled-cube.png',
		name: 'Beveled Cube',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pharetra, purus sed ultricies mollis, felis tellus tempus ipsum, sed bibendum elit urna aliquam justo. Ut eu facilisis eros. Nullam maximus ut enim id accumsan. Vestibulum rutrum purus posuere, ullamcorper purus sed, convallis neque. Praesent at dui id odio convallis eleifend ut volutpat nisl. Mauris fringilla lorem aliquam rutrum feugiat. Quisque felis diam, posuere non mauris quis, blandit luctus nibh. Etiam eleifend arcu ipsum, condimentum elementum eros finibus in.',
		points: 3000123123,
		remaining: 21321,
		category: '3D Shapes',
		series: [
			{
				data: [18, 32, 26, 15, 34],
			},
		],
		color: process.env.REACT_APP_SUCCESS_COLOR,
		stock: 219,
		price: 16,
		store: 'Company A',
		file: 'Figma',
	},
	{
		id: 12,
		image: '../../assets/img/abstract/cylinder.png',
		name: 'Cylinder',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pharetra, purus sed ultricies mollis, felis tellus tempus ipsum, sed bibendum elit urna aliquam justo. Ut eu facilisis eros. Nullam maximus ut enim id accumsan. Vestibulum rutrum purus posuere, ullamcorper purus sed, convallis neque. Praesent at dui id odio convallis eleifend ut volutpat nisl. Mauris fringilla lorem aliquam rutrum feugiat. Quisque felis diam, posuere non mauris quis, blandit luctus nibh. Etiam eleifend arcu ipsum, condimentum elementum eros finibus in.',
		points: 3000123123,
		remaining: 21321,
		category: '3D Shapes',
		series: [
			{
				data: [18, 32, 26, 15, 34],
			},
		],
		color: process.env.REACT_APP_SUCCESS_COLOR,
		stock: 219,
		price: 16,
		store: 'Company B',
		file: 'Figma',
	},
];
export default data;
