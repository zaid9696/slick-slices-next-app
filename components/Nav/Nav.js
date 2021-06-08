
import Link from 'next/link';
import NavLink from './NavLink';
import Logo from './Logo';
import styled from 'styled-components';

const NavStyles = styled.nav`

    margin-bottom: 3rem;
    .logo {
        transform: translateY(-25%);;
    }
    ul {
        margin: 0;
        padding: 0;
        text-align: center;
        list-style: none;
        display: grid;
        grid-template-columns: 1fr 1fr auto 1fr 1fr;
        grid-gap: 2rem;
        align-items: center;
    }
    li {
        --rotate: -2deg;
        transform: rotate(var(--rotate));
        order:1;
        &:nth-child(1){
            --rotate: 1deg
        }
        &:nth-child(2){
            --rotate: -2.5deg
        }
        &:nth-child(4){
            --rotate: 2.5deg
        }
        &:hover {--rotate: 3deg}
    }
    a {
        font-size: 3rem;
        text-decoration: none;  
        display: block;
        @media (max-width: 800px) {
            font-size: 2rem;
        }
        &:hover {
            color: var(--red);
        }
        &.activePage {
            color: var(--red);
    }
    }

    @media (max-width: 800px) {
        --columns: 4;
        margin-bottom: 2rem;
        ul {

            grid-template-rows: auto auto;
            grid-template-columns: repeat(var(--columns), 1fr);
            justify-items: center;
        }
        .logo-item {
            order:0;
            grid-column: 1 / -1;
        }
        .logo {
            transform: none;
        }
    }
    @media (max-width: 500px) {

        --columns: 2;
    }


`;

const Nav = (props) => {
  return (
    <NavStyles>
    	<ul>
    		<li>
    			<NavLink href="/" activeClassName="activePage"><a>Hot Now</a></NavLink>
    		</li>
    		<li>
    			<NavLink href="/pizzas" activeClassName="activePage"><a>Pizza Menu</a></NavLink>
    		</li>
    		<li className="logo-item">
    			<Link href="/" passHref><a><Logo /></a></Link>
    		</li>
    		<li>
    			<NavLink href="/slicemasters" activeClassName="activePage"><a>SliceMasters</a></NavLink>
    		</li>
    		<li>
    			<NavLink href="/order" activeClassName="activePage"><a>Order Ahead!</a></NavLink>
    		</li>
    	</ul>
    </NavStyles>
  )
}

export default Nav;