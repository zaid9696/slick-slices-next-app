import Image from 'next/image';
import OrderStyles from '../styles/OrderStyles';
import MenueItemStyles from '../styles/MenueItemStyles';
import useForm from '../utils/useForm';
import usePizza from '../utils/usePizza';
import Meta from '../components/Meta';
import PizzaOrder from '../components/PizzaOrder';
import CalculatePizzaPrice from '../utils/CalculatePizzaPrice';
import calculateOrderTotal from '../utils/calculateOrderTotal';
import formatMoney from '../utils/formatMoney';
import client, { previewClient, imageBuilder } from '../sanity';
const getClient = (preview) => (preview ? previewClient : client);

const Order = ({allPizza}) => {

	const {values, updateValues} = useForm({
		name: '',
		email: '',
		maplesyrup: ''
	});

const {order, addToOrder, removeFromOrder, error, loading, message, submitOrder} = usePizza({allPizza, values});
	if(message){
		return <p>{message}</p>
	}
  return (
	  	<>
	  	<Meta title={"Order a Pizza!"} />
	    <OrderStyles onSubmit={submitOrder}>
	    	<fieldset disabled={loading}>
	    		<legend>Your Info</legend>
	    		<label htmlFor="name">Name</label>
	    		<input type="name" name="name" value={values.name} onChange={updateValues} />
	    		<label htmlFor="email">Email</label>
	    		<input type="email" name="email" value={values.email} onChange={updateValues} />
	    		<input type="maplesyrup" id="maplesyrup" name="maplesyrup" value={values.maplesyrup} onChange={updateValues} />
	    	</fieldset>
	    	<fieldset className="menu" disabled={loading}>
	    		<legend>Menu</legend>
	    		{
	    			allPizza.map(pizza => (

	    				<MenueItemStyles key={pizza._id}>
	    				<div className="img">
	    				<Image src={imageBuilder.image(pizza.image.asset._ref).width(100).url()} width={100} height={100} alt={pizza.name} />
	    				</div>
	    					<div>
		    					<h2>
		    					{pizza.name}
		    					</h2>
	    					</div>
	    					<div>
	    				{
	    				['S', 'M', 'L'].map(size => (

	    				<button key={size} type="button"  onClick={() => addToOrder({id: pizza._id, size})}>
	    				{size}{formatMoney(CalculatePizzaPrice(size, pizza.price))}
	    				</button>
	    					))
	    						}
	    					</div>
	    				</MenueItemStyles>

	    				))
	    		}
	    	</fieldset>
	    	<fieldset className="order" disabled={loading}>
	    		<legend>Order</legend>
	    		<PizzaOrder 
	    		order={order} 
	    		removeFromOrder={removeFromOrder} 
	    		allPizza={allPizza}
	    		 />
	    		
	    	</fieldset>
	    	<fieldset>
	    		<h3>Your Total is {formatMoney(calculateOrderTotal(order, allPizza))}</h3>
	    		<div>
	    			{error ? <p>Error: {error}</p> : ''}
	    		</div>
	    		<input type="submit" disabled={loading} value={`${loading ? 'Placing Order...' : 'Order Ahead'}`}/>
	    			
	    		
	    	</fieldset>
	    </OrderStyles>
	  	</>
  )
}

const query = `

*[_type == 'pizza'] {
	_id,
	name,
	slug{current},
	image{asset},
	price
}

`;

export async function queryAllPizza(preview) {

	const result = await getClient(preview).fetch(query);
	return result;
}

export async function getStaticProps({preview = false}) {

	const allPizza = await queryAllPizza(preview);

	return {
		props: {allPizza}
	}
}

export default Order;