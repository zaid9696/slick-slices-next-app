import Image from 'next/image';
import styled from 'styled-components';
import PizzaList from '../../../components/PizzaList';
import Meta from '../../../components/Meta';
import ToppingFilter from '../../../components/ToppingFilter';
import client, { previewClient, imageBuilder } from '../../../sanity';
const getClient = (preview) => (preview ? previewClient : client);


const PizzaSinglePage = ({allPizza, allToppings, params}) => {

	const allPizzas = allPizza[0].allPizza;
	const pizzas = allToppings.map(pizza => {
          return {
            toppings: pizza.toppings
          }
     });		
	// console.log();
  return (
    <>
    	<Meta title={`Pizzas with ${params.name}`} />
     	<ToppingFilter pizzas={pizzas} activeName={params.name}/>
    	<PizzaList pizzas={allPizzas} />
    </>
  )
}


const queryPath = `
  *[_type == 'pizza']{
  
	toppings[]->{
	    name
  	}
  	
}
`;


export async function getStaticProps({ preview = false, params }) {

  const allPizza = await getClient(preview)
    .fetch(`
    	*[_type == 'topping' && name match "${params.name}"] {
		  _id,
		  "allToppings": *[_type == 'pizza']{
			  toppings[]->{
			    name,
			    _id,
			    vegetarian
			  }
			},
		 "allPizza":*[_type == 'pizza' && references(^._id)]{
		  name,
		  _id,
			slug {
	  		current
			},
		  image,
		  toppings[]->{
			    name,
			    _id,
			    vegetarian
			  }

			}
		}
    	
  `);
   const allToppings = await getClient(preview)
    .fetch(`
    	*[_type == 'pizza'] {

			toppings[]->{
			    name,
			    _id
		  }
		}
`); 

  // console.log();
  return {
    props: {allPizza,allToppings,params,preview},
  }
}


export async function getStaticPaths({ preview = false }) {

   const allToppingNames = await getClient(preview)
    .fetch(queryPath);

    const paths = allToppingNames.map((allTopping, i) => {
		 	return allTopping.toppings;
		 }).flat().map((topping, i) => ({params: {name:topping.name }}))

  	return {
    paths,
    fallback: false
  }
}


export default PizzaSinglePage;