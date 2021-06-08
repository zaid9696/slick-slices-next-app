import Head from 'next/head';
import Nav from './Nav/Nav';
import Footer from './Footer';
import 'normalize.css';
import stripes from '../assets/images/stripes.svg';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import Meta from '../components/Meta';



const SiteBorderStyles = styled.div`
	
	max-width: 1000px;
	margin: 12rem auto 4rem auto;
	margin-top:clamp(2rem, 10vw, 12rem);
	padding: 5px;
	padding: clamp(5px, 1vw, 25px);
	border: 5px solid #fff;
	background-size: 1500px;
	box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.044);
	background: #fff url(${stripes});
	@media (max-width: 1100px) {
		margin-right: 1.5rem;
		margin-left: 1.5em;
	}
`;

const ContentStyles = styled.div`
	
	background-color: #fff;
	padding: 2rem;
`;

const Layout = ({children}) => {
  return (
    <>
  		<Meta/>
    	<GlobalStyles />
    	<Typography />
    	<SiteBorderStyles>
    	<ContentStyles>
    	<Nav />
    	{children}
    	<Footer />
    	</ContentStyles>
    	</SiteBorderStyles>

    </>
  )
}

export default Layout;