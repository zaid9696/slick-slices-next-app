import Image from 'next/image';
import Meta from '../components/Meta';
import beerImg from '../assets/images/beer.jpg';
import startImg from '../assets/images/star.png';
import styled from 'styled-components';

const BeerStyles = styled.div`

	display: grid;
	gap: 2rem;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

	.single-beer {
		border: 1px solid var(--grey);
		padding: 2rem;
		text-align: center;
		img:not(.start-img){width: 100%, object-fit: contain;}
	}

`;


const Beers = ({allBeer}) => {
	console.log(beerImg);	
	const func = () => (<img className="start-img" src={startImg} alt="start"/>);
	
  return (
    <>
        <Meta title={`Beers! we have ${allBeer.length} in stock`} />

    	<h2 className="center">
    		We have {allBeer.length} Beers Available. Dine in only!
    	</h2>
    	<BeerStyles>
    		{allBeer.map(beer => {
    			const rating = Math.round(beer.rating.average);
    			return (
    				<div key={beer.id} className="single-beer">
    					<Image src={beerImg} alt={beer.name} width={200} height={200}/>
    					<h3>{beer.name}</h3>
    					{beer.price}
    					<p title={`${rating} out 5 stars`}>
    						{Array.from({length: rating}, () => func())}
    						<span style={{filter: 'grayscale(100%)'}}>
    							{Array.from({length:5 - rating}, () => func())}
    						</span>
    						<span>
    							({beer.rating.reviews})
    						</span>
    					</p>
    				</div>
    			)}
    		)}
    	</BeerStyles>
    </>
  )
}



export async function getStaticProps() {

	const res = await fetch(`https://api.sampleapis.com/beers/ale`);
	const allBeer = await res.json();

	return {
		props: {allBeer}
	}
}

export default Beers;