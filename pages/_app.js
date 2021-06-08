import '../styles/globals.css'
import Layout from '../components/Layout';
import {OrderProvider} from '../components/OrderContext';
function MyApp({ Component, pageProps }) {
  return <>
  		<OrderProvider>
  			<Layout><Component {...pageProps} /></Layout>
  		</OrderProvider>
  		</>
}

export default MyApp
