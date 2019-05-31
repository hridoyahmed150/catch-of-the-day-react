import React from 'react';

import { getFunName } from "./../helpers";

class StorePicker extends React.Component {
  constructor(){
    super();
    this.storChange= this.storChange.bind(this);
    this.reload= this.reload.bind(this);
  }

  storChange(e){
    e.preventDefault();
    const storeId=this.storInput.value
    this.context.router.transitionTo({pathname:`/store/${storeId}`});
    this.reload();
  }
  reload(){
    location.reload();
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

StorePicker.contextTypes = {
  router: React.PropTypes.object
};

export default StorePicker;
