import Meta from '../../components/Meta';
import PizzaItems from '../../components/PizzaItems';
import {pageSize} from '../../lib/setting';
import client, { previewClient, imageBuilder } from '../../sanity';
const getClient = (preview) => (preview ? previewClient : client);

const Page = ({allSliceMasters, params, skip}) => {
	
		const currentPage = parseInt(params.page);
		const totalCount = allSliceMasters[0].totalCount;
	  return (
    <>
    <Meta title={`Slicemasters - page ${params.page}`} />
    <PizzaItems allSliceMasters={allSliceMasters} base={"slicemasters"} totalCount={totalCount} skip={skip} pageSize={pageSize} currentPage={currentPage} />
    </>
  )
}

const queryPath = `

	*[_type == 'person']{
	  _id,
	  name,
	  slug{current},
  	"totalCount": count(*[_type == 'person'])
}

`;


export async function getStaticProps({preview = false, params}) {

	const pageNum  = parseInt(params.page) - 1;
	const skip = pageNum * pageSize;
	const currentPage = pageNum;
	console.log("Page Size", pageSize - 1)
	console.log("Skip", skip)
	const allSliceMasters = await getClient(preview).fetch(`
		*[_type == 'person']{
  
		  _id,
		  name,
		  slug{current},
			description,
			image{asset},
		  "totalCount": count(*[_type == 'person'])
		}[${skip}..${pageSize - 1 + skip}]
`);



	return {
		props: {allSliceMasters, params, skip, currentPage}
	}
}


export async function getStaticPaths({preview = false}) {

	const allSliceMasters = await getClient(preview).fetch(queryPath);
	const totalCount = allSliceMasters[0].totalCount;
	const pageCount = Math.ceil(totalCount / pageSize);
	const paths = Array.from({length: pageCount}).map((_, i) =>{ 
		const pageNum = i + 1;
		return ({
			params: {page: pageNum.toString()}
		})});

	return {
		paths,
		fallback: false
	}


}

export default Page;