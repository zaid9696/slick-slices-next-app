
import CalculatePizzaPrice from './CalculatePizzaPrice';
import formatMoney from './formatMoney';


const calculateOrderTotal = (order, allPizza) => {

	return order.reduce((runningTotal, signlePizza) => {

		const pizza = allPizza.find(pizza => pizza._id === signlePizza.id);
		return runningTotal + CalculatePizzaPrice(signlePizza.size, pizza.price);

	}, 0);
}

export default calculateOrderTotal;