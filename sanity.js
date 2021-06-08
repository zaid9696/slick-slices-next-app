import sanityClient from '@sanity/client';
import sanityImage from '@sanity/image-url';
// src={imageBuilder.image(url).height(1000).width(2000).url()}
// import dotenv from 'dotenv';

// dotenv.config({'path': '.env.local'});



const options = {
  // Find your project ID and dataset in `sanity.json` in your studio project
  dataset: 'production',
  projectId: 'b48hs0rq',
  useCdn: process.env.NODE_ENV === 'production',
  // useCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible
  // data always (potentially slightly slower and a bit more expensive).
}

const client = sanityClient(options)

export const imageBuilder = sanityImage(client)

export const previewClient = sanityClient({
  ...options,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export default client