import PizzaList from '../components/PizzaList';
import ToppingFilter from '../components/ToppingFilter';
import Meta from '../components/Meta';
import client, { previewClient, imageBuilder } from '../sanity';
const getClient = (preview) => (preview ? previewClient : client);

const Pizzas = ({allPizza}) => {

      const pizzas = allPizza.map(pizza => {
          return {
            toppings: pizza.toppings
          }
      })
      // console.log(allPizza);
  return (
    <>
      <Meta title={"All Pizzas"} />
      <ToppingFilter pizzas={pizzas} topping={allPizza[0].topping}/>
    	<PizzaList pizzas={allPizza} />
    </>
  )
}

const query = `
  *[_type == 'pizza']{
  
  name,
  _id,
  slug {
  current
},
toppings[]->{_id, name},
image,
"topping": *[_type == 'topping']{
  name,
  _id,
  vegetarian
}
  
}
`;



export async function getAllPostsForHome(preview) {
  const results = await getClient(preview)
    .fetch(query);
  return results;
}

export async function getStaticProps({ preview = false }) {
  const allPizza = await getAllPostsForHome(preview)
  return {
    props: { allPizza,preview },
  }
}



export default Pizzas;