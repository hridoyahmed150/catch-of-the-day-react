import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
  render() {
    return (
    	<div>
			<h2>Inventory</h2>
			<AddFishForm addFish={this.props.addFish}/>
			<button onClick={this.props.loadSamples}>Add sample Fishes</button>
    	</div>
    )
  }
}

export default Inventory;
