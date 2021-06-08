import CalculatePizzaPrice from './CalculatePizzaPrice';
import formatmoney from './formatMoney';
import {imageBuilder} from '../sanity';
const attchNamesAndPrices = (order, allPizza) => {
  return order.map(item => {

  		const pizza = allPizza.find(pizza => pizza._id == item.id);
  		return {
  			...item,
  			name: pizza.name,
  			price: formatmoney(CalculatePizzaPrice(item.size ,pizza.price)),
  			thumbnail: imageBuilder.image(pizza.image.asset._ref).width(500).url()
  		}
  })
}

export default attchNamesAndPrices;