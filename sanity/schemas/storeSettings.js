import {MdStore as icon} from 'react-icons/md';


export default {
	name: 'storeSettings',
	title: 'Settings',
	type: 'document',
	icon,
	fields: [
		{
			name: 'name',
			title: 'Store Name',
			type: 'string',
			description: 'Name of the pizza'
		},
		{
			name: 'slicemasters',
			title: 'SliceMasters Currently Slicing',
			type: 'array',
			of: [{type: 'reference', to: [{type: 'person'}]}],
		},
		{
			name: 'hotSlices',
			title: 'Hot Slices available in the case',
			type: 'array',
			of: [{type: 'reference', to: [{type: 'pizza'}]}],
		}
	],
	
}