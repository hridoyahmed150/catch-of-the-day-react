import React from 'react';

class AddFishForm extends React.Component {
	createFish(e){
		e.preventDefault();
		console.log('hello')
		const fish={
			name:this.name.value,
			price:this.price.value,
			status:this.status.value,
			desc:this.desc.value,
			image:this.image.value,
		}
		console.log(fish)
		this.props.addFish(fish)
		this.fishEditForm.reset()
	}
  render() {
    return (
   		<form ref={(input)=>{this.fishEditForm=input}} className="fish-edit" onSubmit={(e)=>this.createFish(e)}>
   			<input ref={(input)=>this.name=input} type="text" placeholder="Fish Name"/>
   			<input ref={(input)=>this.price=input} type="text" placeholder="Fish Price"/>
   			<select ref={(input)=>this.status=input}>
   				<option value="abailable">Fresh!</option>
   				<option value="unabailable">Sold Out!</option>
   			</select>
   			<textarea ref={(input)=>this.desc=input} placeholder="Fish Desc"></textarea>
   			<input ref={(input)=>this.image=input} type="text" placeholder="Fish Image"/>
   			<button type="sbumit">+ Add Item</button>
   		</form>
    )
  }
}

export default AddFishForm;