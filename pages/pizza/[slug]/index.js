import Image from 'next/image';
import Meta from '../../../components/Meta';
import styled from 'styled-components';
import client, { previewClient, imageBuilder } from '../../../sanity';
const getClient = (preview) => (preview ? previewClient : client);

const PizzaGrid = styled.div`

	display: grid;
	grid-gap: 2rem;
	grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

const PizzaSinglePage = ({allPizza}) => {

  return (
    <>
    <Meta 
    title={allPizza[0].name} 
    image={imageBuilder.image(allPizza[0]?.image?.asset?._ref).url()}

     />
    <PizzaGrid>
    	<Image src={imageBuilder.image(allPizza[0].image.asset._ref).url()} width={800} height={500}/>
    	<div>
    		<h2 className="mark">
    			{allPizza[0].name}
    		</h2>
    		<ul>
    			{allPizza[0].toppings.map(topping => (
    					<li key={topping._id}>{topping.name}</li>
    				))} 
    		</ul>
    	</div>
    </PizzaGrid>
    </>
  )
}
const query = `
  *[_type == 'pizza']{
	name
  
}
`

const queryPath = `
  *[_type == 'pizza']{
  
  slug {
  current
},
  
}
`;

// export async function getAllPostsForHome(preview) {
//   const results = await getClient(preview)
//     .fetch(query);
//   return results;
// }


export async function getStaticProps({ preview = false, params }) {
  const allPizza = await getClient(preview)
    .fetch(`
    	*[_type == 'pizza' && slug.current == "${params.slug}"]{
  			  name,
			  _id,
			  image,
			  toppings[]->{
			    name,
			    _id,
			    vegetarian
  				}
		}
    	`);

  console.log(params);
  return {
    props: {allPizza,params,preview},
  }
}


export async function getStaticPaths({ preview = false }) {

   const allSlugs = await getClient(preview)
    .fetch(queryPath);

   const paths = allSlugs.map(allSlug => ({params: {slug: allSlug.slug.current}})); 
  	
  	return {
    paths,
    fallback: false
  }
}


export default PizzaSinglePage;