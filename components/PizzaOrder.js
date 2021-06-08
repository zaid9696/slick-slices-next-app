import Image from 'next/image';
import MenueItemStyles from '../styles/MenueItemStyles';
import {imageBuilder} from '../sanity';
import CalculatePizzaPrice from '../utils/CalculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

const PizzaOrder = ({order, allPizza, removeFromOrder}) => {
  return (
    <>
    	{order.map((singlePizza, i) => {

    		const pizza = allPizza.find(pizza => pizza._id === singlePizza.id)

    		return (
    			<MenueItemStyles key={`${singlePizza.id}-${i}`}>
    			<Image src={imageBuilder.image(pizza.image.asset._ref).width(100).url()} height={100} width={100} />
    		    <h2>{pizza.name}</h2>	
    		    {console.log(singlePizza.size)}
    		    <p>
    		    {formatMoney(CalculatePizzaPrice(singlePizza.size,pizza.price))}
    		    <button className="remove" type="button" title={`Remove ${singlePizza.size} ${pizza.name} from order`}
    		    onClick={() => removeFromOrder(i)}
    		    >
    		    &times;
    		    </button>
    		    </p>
    		    </MenueItemStyles>)
    	})}
    </>

  )
}

export default PizzaOrder;