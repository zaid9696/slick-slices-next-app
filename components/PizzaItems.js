import Image from 'next/image'
import Link from 'next/link';
import styled from 'styled-components';
import Pagination from './Pagination';
import { imageBuilder } from '../sanity';

const SliceMastersGridStyles = styled.div`

	display: grid;
	gap: 2rem;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

`;

const SliceMastersStyles = styled.div`

	a {
		text-decoration: none;
	}

	h2 {
		transform: rotate(-2deg);
		text-align: center;
		font-size: 4rem;
		margin-bottom: -2rem;
		position: relative;
		z-index: 2;
	}
	.description {
		background: var(--yellow);
		padding: 1rem;
		margin: 2rem;
		margin-top: -6rem;
		position: relative;
		z-index: 2;
		transform: rotate(1deg);
		text-align: center;

	}
`;

const PizzaItems = ({allSliceMasters, base ,currentPage, skip, pageSize, totalCount}) => {
  return (
    <>
    <Pagination skip={skip} base={base} totalCount={totalCount} pageSize={pageSize} currentPage={currentPage || 1} />
    <SliceMastersGridStyles> 
    	{allSliceMasters.map(person => {
    		return (
    	    		<SliceMastersStyles key={person._id}>
    	    		<Link href={`/slicemaster/${person.slug.current}`} >
    	    			<a>
    	    			<h2>
    	    				<span className="mark">
    	    					{person.name}
    	    				</span>
    	    			</h2>
    	    			</a>
    	    		</Link>
    	    		<Image src={imageBuilder.image(person.image.asset._ref).width(410).url()} width={410} height={400} />
    	    		<p className="description">
    	    			{person.description}
    	    		</p>
    	    		</SliceMastersStyles>
    	    		)})}
    </SliceMastersGridStyles>
    </>
  )
}

export default PizzaItems;