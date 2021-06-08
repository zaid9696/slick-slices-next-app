import client, { previewClient, imageBuilder } from '../sanity';
const getClient = (preview) => (preview ? previewClient : client);
import {HomePageGrid} from '../styles/grids';
import LoadingGrid from '../components/LoadingGrid';
import ItemGrid from '../components/ItemGrid';

const CurrentlySlicing = ({slicemasters}) => {
  console.log(slicemasters);
  return (
      <div>
      <h2><span className="mark tilt"> SliceMasters on </span></h2>
      <p>Stand by ready, to slice you up!</p>
       {!slicemasters && <LoadingGrid count={4}/>}
       {slicemasters && !slicemasters?.length && <p>Not one is working now</p>}
       {slicemasters?.length && <ItemGrid items={slicemasters} />}
      </div>
    )
}

const HotSlices = ({hotSlices}) => {

  return (
      <div>
      <h2><span className="mark tilt"> Hot Slices on </span></h2>
      <p>Come on by, Buy the Slice!</p>
        {!hotSlices && <LoadingGrid count={4}/>}
       {hotSlices && !hotSlices?.length && <p>Nothing in the case</p>}
       {hotSlices?.length && <ItemGrid items={hotSlices} />}

      </div>
    )
}

const Home = ({allPosts}) => {

    const {hotSlices, slicemasters} = allPosts[0];

    console.log({hotSlices, slicemasters});
    return (

      <div className="center">
          <h1>The Best Pizza Downtown!</h1>
          <p>Open 11am to 11pm Every Single Day</p>
          <HomePageGrid>
            <CurrentlySlicing slicemasters={slicemasters}/>
            <HotSlices hotSlices={hotSlices}/>
          </HomePageGrid>
      </div>
    
     )
};

const query = `
*[_type == 'storeSettings' && _id match "downtown"]{
  name,
  slicemasters[]->{name, image, _id},
  hotSlices[]->{name, image, _id}
}
`;



export async function getAllPostsForHome(preview) {
  const results = await getClient(preview)
    .fetch(query);
  return results;
}

export async function getServerSideProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview)
  return {
    props: { allPosts,preview },
  }
}



export default Home;