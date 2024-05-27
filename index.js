import express from 'express';
import connection from './src/connection.js';
import { StudentModel } from './src/models/index.js';

const app = express();

const findActiveInactiveUsers = async () => {
	const data = await StudentModel.aggregate([
		{
			$match: { isActive: true },
		},
		{
			$count: 'activeUsers',
		},
	]);
	console.log('🚀 ~ findActiveInactiveUsers ~ data:', data);
};

// findActiveInactiveUsers();

const avgAgeofUsers = async () => {
	const data = await StudentModel.aggregate([
		{
			$group: {
				_id: null,
				avgAge: { $avg: '$age' },
			},
		},
	]);
	console.log('🚀 ~ avgAgeofUsers ~ data:', data);
};

// avgAgeofUsers();

const topFiveFruits = async () => {
	const data = await StudentModel.aggregate([
		{
			$group: {
				_id: '$favoriteFruit',
				count: { $sum: 1 },
			},
		},
		{
			$sort: { count: -1 },
		},
		{
			$limit: 5,
		},
	]);
	console.log('🚀 ~ topFiveFruits ~ data:', data);
};

// topFiveFruits();

const totalMalesandFemales = async () => {
	const data = await StudentModel.aggregate([
		{
			$group: {
				_id: '$gender',
				genderCount: { $sum: 1 },
			},
		},
	]);
	console.log('🚀 ~ totalMalesandFemales ~ data:', data);
};

// totalMalesandFemales();

const countryHasHighestRegisteredUsers = async () => {
	const data = await StudentModel.aggregate([
		{
			$group: {
				_id: '$company.location.country',
				usersCount: { $sum: 1 },
			},
		},
		{
			$sort: { usersCount: -1 },
		},
		{
			$limit: 1,
		},
	]);
	console.log('🚀 ~ countryHasHighestRegisteredUsers ~ data:', data);
};

// countryHasHighestRegisteredUsers();

const allEyeColour = async () => {
	const data = await StudentModel.aggregate([
		{
			$group: {
				_id: '$eyeColor',
			},
		},
	]);
	console.log('🚀 ~ allEyeColour ~ data:', data);
};

// allEyeColour();

const averageNumberOftagsPerUser = async () => {
	const data = await StudentModel.aggregate([
		// {
		// 	$unwind: '$tags',
		// },
		// {
		// 	$project: {
		// 		tags: 1,
		// 		_id: 1,
		// 	},
		// },
		// {
		// 	$group: {
		// 		_id: '$_id',
		// 		numberOftags: { $sum: 1 },
		// 	},
		// },
		// {
		// 	$group: {
		// 		_id: null,
		// 		averageNumberOftags: { $avg: '$numberOftags' },
		// 	},
		// },

		{
			$addFields: {
				numberoftags: { $size: { $ifNull: ['$tags', []] } },
			},
		},
		{
			$group: {
				_id: null,
				averagetags: { $avg: '$numberoftags' },
			},
		},
	]);
	// avgAge: { $avg: '$age' },
	console.log('🚀 ~ averageNumberOftagsPerUser ~ data:', data);
};

// averageNumberOftagsPerUser();

const taginUser = async () => {
	const data = await StudentModel.aggregate([
		// {
		// 	$unwind: '$tags',
		// },
		// {
		// 	$group: {
		// 		_id: '$tags',
		// 		countoftag: { $sum: 1 },
		// 	},
		// },
		{
			$match: {
				tags: 'enim',
			},
		},
		{
			$count: 'userswithtag',
		},
	]);
	console.log('🚀 ~ taginUser ~ data:', data);
};

// taginUser();

const namesandAge = async () => {
	const data = await StudentModel.aggregate([
		{
			$match: {
				isActive: false,
				tags: 'velit',
			},
		},
		{
			$project: {
				name: 1,
				age: 1,
				_id: 0,
			},
		},
	]);
	console.log('🚀 ~ namesandAge ~ data:', data);
};

// namesandAge();

// const matchPhoneNumber = async () => {
// 	const data = await StudentModel.aggregate([
// 		{
// 			$match: {
// 				'company.phone': { $regex: /^\s*\+1\s*\(940\)\s*$/ },
// 			},
// 		},
// 		// {
// 		// 	$count: 'totalMatchPhone',
// 		// },
// 	]);
// 	console.log('🚀 ~ matchPhoneNumber ~ data:', data);
// };
// matchPhoneNumber();

const adtag = async () => {
	const data = await StudentModel.aggregate([
		{
			$match: {
				'tags.1': 'ad',
			},
		},
		{
			$count: 'totalUserwithadTag',
		},
	]);
	console.log('🚀 ~ adtag ~ data:', data);
};

// adtag();

const selectedtagsUser = async () => {
	const data = await StudentModel.aggregate([
		{
			$match: {
				tags: { $all: ['enim', 'id'] },
			},
		},
	]);
	console.log('🚀 ~ selectedtagsUser ~ data:', data);
};

// selectedtagsUser();

const companiesInUSA = async () => {
	const data = await StudentModel.aggregate([
		{
			$match: {
				'company.location.country': 'USA',
			},
		},
		{
			$group: {
				_id: '$company.title',
				userCount: { $sum: 1 },
			},
		},
	]);
	console.log('🚀 ~ companiesInUSA ~ data:', data);
};

companiesInUSA();

connection()
	.then((res) => console.log('connection with database sccessfull!'))
	.catch((error) => console.log('error::', error));

app.listen(3000, () => {
	console.log('Servert started at port 3000');
});
