import React from 'react';

import { getFunName } from "./../helpers";

class StorePicker extends React.Component {
  storChange(e){
    e.preventDefault();
    console.log(this);
    const storeId=this.storInput.value
    this.context.router.transitionTo({pathname: `/store/${storeId}`})  
  }

  render() {
    // Any where else
    return (
      <form className="store-selector" onSubmit={this.storChange.bind(this) }>
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={ getFunName() } ref={(input)=> {this.storInput=input}} />
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}

StorePicker.contextTypes ={
  router: React.PropTypes.object
}

export default StorePicker;
