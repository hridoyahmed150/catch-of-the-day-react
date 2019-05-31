import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
	constructor(){
		super();
		this.renderInventory=this.renderInventory.bind(this);
		this.handelChange=this.handelChange.bind(this);
	}
	handelChange(e,key){
		const fish=this.props.fishes[key]
		const updateFish={...fish,[e.target.name]:e.target.value}
		this.props.updateFish(key,updateFish)
	}
	renderInventory(key){
		const fish=this.props.fishes[key];
		return (
				<div className="fish-edit">
					<input name="name"  type="text" placeholder="Fish Name" onChange={(e)=>this.handelChange(e,key)}
					value={fish.name}
					/>
					<input name="price" type="text" value={fish.price} placeholder="Fish Price" onChange={(e)=>this.handelChange(e,key)}/>
					<select name="status" value={fish.status} onChange={(e)=>this.handelChange(e,key)}>  
						<option value="available">Fresh!</option>
						<option value="unavailable">Sold Out!</option>
					</select>
					<textarea name="desc" value={fish.desc} placeholder="Fish Desc" onChange={(e)=>this.handelChange(e,key)}></textarea>
					<input name="image" value={fish.image} type="text" placeholder="Fish Image" onChange={(e)=>this.handelChange(e,key)}/>
					<button onClick={()=>this.props.removeFish(key)}>Remove Item</button>
				</div>
			)
	}
  render() {
    return (
    	<div>
			<h2>Inventory</h2>
			{Object.keys(this.props.fishes).map(this.renderInventory)}
			<AddFishForm addFish={this.props.addFish}/>
			<button onClick={this.props.loadSamples}>Add sample Fishes</button>
    	</div>
    )
  }
}

export default Inventory;
