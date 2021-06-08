
import {useState, useContext} from 'react';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';
import attchNamesAndPrices from './attchNamesAndPrices';
import OrderContext from '../components/OrderContext';
const usePizza = ({allPizza, values}) => {

	// const [order, setOrder] = useState([]);
	const [order, setOrder] = useContext(OrderContext);
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	const addToOrder = (orderdPizza) => {

		setOrder([...order, orderdPizza]);
	}

	const removeFromOrder = (index) => {
		setOrder([
			...order.slice(0, index),
			...order.slice(index + 1)
			])
	}

	const submitOrder = async (e) => {

		e.preventDefault();
		setLoading(true);
		setError(null);
		// setMessage(null);
		const body = {
			order: attchNamesAndPrices(order, allPizza),
			total: formatMoney(calculateOrderTotal(order, allPizza)),
			name: values.name,
			email: values.email,
			maplesyrup: values.maplesyrup
		}
		// console.log(body);
		const res = await fetch('http://localhost:8888/.netlify/functions/placeOrder', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body)
		});

		const text = JSON.parse(await res.text());
		if(res.status >= 400 && res.status < 600) {
			setLoading(false);
			setError(text.message);
		}else {
			setLoading(false);
			setMessage('Success! come on down for your pizza!!')
		}
	}


	return {
		order,
		addToOrder,
		removeFromOrder,
		error,
		loading,
		message,
		submitOrder,
	}

}

export default usePizza;