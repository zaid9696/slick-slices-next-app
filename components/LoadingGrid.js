import {ItemsGrid, ItemStyles} from '../styles/grids';

const LoadingGrid = ({count}) => {
  return (
    <ItemsGrid>
    	{Array.from({length: count}, (_, i) => (

    			<ItemStyles>
    			<p>
    				<span className="mark">Loadding...</span>
    			</p>
    			<img src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAECAQAAADsOj3LAAAADklEQVR42mNkgANGQkwAAJoABWH6GPAAAAAASUVORK5CYII=" className="loading" alt="Loading" width={500} height={400}/>
    			</ItemStyles>

    		))}
    </ItemsGrid>
  )
}

export default LoadingGrid;