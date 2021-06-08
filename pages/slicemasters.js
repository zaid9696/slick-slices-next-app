import {pageSize} from '../lib/setting';
import client, { previewClient } from '../sanity';
import Meta from '../components/Meta';
import PizzaItems from '../components/PizzaItems';
import Pagination from '../components/Pagination';

const getClient = (preview) => (preview ? previewClient : client);

const SliceMasters = ({allSliceMasters, skip}) => {
	console.log(allSliceMasters, skip);
	const totalCount = allSliceMasters[0].totalCount;
  return (
  	<>
  	<Meta title={"Slicemasters - page 1"} />
    <PizzaItems allSliceMasters={allSliceMasters} base={"slicemasters"} totalCount={totalCount} pageSize={pageSize} currentPage={1} skip={skip} />
    </>
  )
}

const query = `

*[_type == 'person']{
  _id,
  name,
  slug{current},
	description,
	image{asset},
  "totalCount": count(*[_type == 'person'])
}[0..1]

`;

export async function getAllSliceMasters(preview) {

	const sliceMasters = await getClient(preview).fetch(query);

	return sliceMasters;
}


export async function getStaticProps(preview = false) {

	const allSliceMasters = await getAllSliceMasters(preview);
	const skip = 1 * pageSize;
	return {
		props: {allSliceMasters, skip}
	};
}



export default SliceMasters;