import {ItemsGrid, ItemStyles} from '../styles/grids';
import { imageBuilder } from '../sanity';

const ItemGrid = ({items}) => {
  return (
    <ItemsGrid>
    {
    	items.map(item => (
    		<ItemStyles key={item._id}>

    		<p>
    			<span className="mark">{item.name}</span>
    		</p>
    		<img src={imageBuilder.image(item.image.asset._ref).width(500).height(400).url()} alt={item.name}/>
    		</ItemStyles>
    		))
    }
    </ItemsGrid>
  )
}

export default ItemGrid;