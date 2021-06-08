import Image from 'next/Image';
import Meta from '../../components/Meta';
import client, { previewClient, imageBuilder } from '../../sanity';
const getClient = (preview) => (preview ? previewClient : client);

const SingleSliceMaster = ({sliceMaster,params}) => {
	console.log(sliceMaster)
  return (
  	<>
    <Meta title={sliceMaster[0].name} image={imageBuilder.image(sliceMaster[0].image.asset._ref)}/>
    <div className="center">
    	<Image src={imageBuilder.image(sliceMaster[0].image.asset._ref).width(1000).height(750).url()} width={1000} height={750} />
    	<h2>
    		<span className="mark">{sliceMaster[0].name}</span>
    	</h2>
    	<p>{sliceMaster[0].description}</p>
    </div>
    </>
  )
}


export async function getStaticProps({preview = false, params}) {

	const sliceMaster = await getClient(preview).fetch(`

		*[_type == 'person' && slug.current == "${params.name}"] {

			_id,
			name,
			description,
			image{asset},
		}

		`);

	return {
		props: {sliceMaster,params}
	}
}

const queryPath = `

	*[_type == 'person'] {
		slug {
			current
		}
	}

`;

export async function getStaticPaths({preview = false}) {

	const sliceMaster = await getClient(preview).fetch(queryPath);
	const paths = sliceMaster.map(slice => (

			{params: {name: slice.slug.current}}

		));

	return {
		paths,
		fallback: false
	}
}

export default SingleSliceMaster;