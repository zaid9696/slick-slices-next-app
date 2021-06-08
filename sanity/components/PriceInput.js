import React from 'react';
import PatchEvent , {set, unset} from 'part:@sanity/form-builder/patch-event';


const createPatchEvent = (value) => {

	return PatchEvent.from(value === '' ? unset() : set(Number(value)));
}

const formatMoney = Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD'
}).format;

const PriceInput = ({type, value, onChange, inputComponent}) => {
  return (
    <div>
    	<h2>{type.title} - {value ? formatMoney(value / 100) : ''}</h2>
    	<p>{type.description}</p>
    	<input type={type.name} value={value} onChange={e => onChange(createPatchEvent(e.target.value))} 
    	ref={inputComponent}
    	 />
    	

    </div>
  )
}

PriceInput.focus = function() {
	this._inputElement.focus();
}

export default PriceInput;