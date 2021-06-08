import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import {imageBuilder } from '../sanity';

const PizzaGridStyles = styled.div`

	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 4rem;
	grid-auto-rows: auto auto
`;

const PizzaStyles = styled.div`

	display: grid;
	@supports not(grid-template-rows: subgrid) {
		--rows: auto auto 1fr;
	}
	grid-template-rows: var(--rows, subgrid);
	grid-row: span 3;
	gap: 1rem;
	h2, 
	p{
		margin: 0;
	}

`;

// layout="fill"
const SinglePizza = ({pizza}) => {
	return (
			<PizzaStyles>
				<Link href={`/pizza/[slug]`} as={`/pizza/${pizza.slug.current}`}>
					<a>
						<h2><span className="mark">
						{pizza.name}
						</span></h2>
					</a>
				</Link>
						<p>{pizza.toppings.map(topping => topping.name).join(', ')}</p>
						<Image src={imageBuilder.image(pizza.image.asset._ref).url()} width={500} height={400} alt={pizza.name}/>
			</PizzaStyles>
		)
};

const PizzaList = ({pizzas}) => {
	// console.log(pizzas);
  return (
    <PizzaGridStyles>{
    	pizzas.map(pizza => (
    		<SinglePizza key={pizza._id} pizza={pizza} />
    		))
    }</PizzaGridStyles>
  )
}

export default PizzaList;