
import Link from 'next/link';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
	
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	margin-bottom: 4rem;
	a{
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		grid-gap: 0 1rem;
		padding: 5px;
		background: var(--grey);
		border-radius: 2px;
		font-size: clamp(1.5rem, 1.4vw, 2.5rem);
		.count {
			background: white;
			padding: 2px 5px;
		}
		&.active {
			background: var(--yellow);
		}
	}

`;

const countPizzasToppings = (pizzas) => {

	const counts = pizzas.map(pizza => pizza.toppings)
	.flat()
	.reduce((acc, topping) => {

			const existingTopping = acc[topping._id];
			if(existingTopping) {
				existingTopping.count += 1;	
			}else {
				acc[topping._id] = {
					id: topping._id,
					name: topping.name,
					count: 1
			}
			}
			
			return acc;
	}, {});

	const sortedToppings = Object.values(counts).sort((a,b) => b.count - a.count);

	return sortedToppings;
}

const ToppingFilter = ({pizzas, activeName}) => {

	const toppingsWithCounts = countPizzasToppings(pizzas);

	// console.log(toppingsWithCounts);
  return (
    <ToppingsStyles>
    <Link href="/pizzas">
    <a>
    	<span className="name"> 
    		All
    	</span>
    	<span className="count"> 
    		{pizzas.length}
    	</span>
    </a>
    </Link>
    	{toppingsWithCounts.map(topping => 
    	<Link href={`/topping/[name]`} as={`/topping/${topping.name}`} key={topping.id}><a className={topping.name == activeName ? "active" : ""}>
    		<span className="name">
    			{topping.name}
    		</span>
    		<span className="count">{topping.count}</span>
    	</a></Link>)}
    </ToppingsStyles>
  )
}



export default ToppingFilter;