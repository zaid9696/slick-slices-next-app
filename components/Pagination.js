import styled from 'styled-components';
import Link from 'next/link';

const PaginationStyles = styled.div`

	display: flex;
	align-content: center;
	align-items: center;
	justify-items: center;
	border: 1px solid var(--grey);
	margin: 2rem 0;
	text-align: center;
	border-radius: 5px;
	@media {
		.word {
			display: none;
		}
		font-size: 1.4rem;
	}
	& > * {
		padding: 1rem;
		flex: 1;
		border-right: 1px solid var(--grey);
		text-decoration: none;
		&.active {
			color: var(--red);
		}
		&[disabled]{
			pointer-events: none;
			color: var(--grey);
		}
	}
`;

const Pagination = ({
	pageSize,
	totalCount,
	skip,
	currentPage,
	base
}) => {

	const totalPage = Math.ceil(totalCount / pageSize);
	const prevPage = currentPage - 1;
	const nextPage = currentPage + 1;
	const hasNextPage = nextPage <= totalPage;
	const hasPrevPage = prevPage >= 1;
  return (
    <PaginationStyles>
    	<Link title="Prev Page"  href={`/${base}/${prevPage == 1 ? "" : prevPage}`}>
	    	<a disabled={!hasPrevPage}>
	    		&#8592; <span className="word">Prev</span>
	    	</a>
    	</Link>
    	{Array.from({length: totalPage}).map((_, i) => (
    			<Link key={i} href={`/${base}/${i + 1 == 1 ? "" : i + 1}`}>
    				<a className={i + 1 == currentPage ? "active" : ""}>{i + 1}</a>
    			</Link>
    		))}
    	<Link title="Next Page" href={`/${base}/${nextPage}`}>
	    	<a disabled={!hasNextPage}>
	    		 <span className="word">Next</span> &#8594;
	    	</a>
    	</Link>
   </PaginationStyles>
  )
}

export default Pagination;