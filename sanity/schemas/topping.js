import {FaPepperHot as icon} from 'react-icons/fa';
import {FaLeaf as Leaf} from 'react-icons/fa';

export default {
	name: 'topping',
	title: 'Toppings',
	type: 'document',
	icon,
	fields: [
		{
			name: 'name',
			title: 'Topping Name',
			type: 'string',
			description: 'What is the name of topping?'
		},
		{
			name: 'vegetarian',
			title: 'Vegetarian',
			type: 'boolean',
			description: 'What is the name of topping?',
			options: {
				layout: 'checkbox'
			}
		},
		
	],
	preview: {
		select: {
			name: 'name',
			vegetarian: 'vegetarian'
		},
		prepare: (fields) => ({
			title: `${fields.name} ${fields.vegetarian ? 'Vege' : ''}`
		})
	}
}