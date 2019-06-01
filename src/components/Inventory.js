import React from 'react';
import AddFishForm from './AddFishForm';
import base from "../base";

class Inventory extends React.Component {
	constructor(){
		super();
		this.renderInventory=this.renderInventory.bind(this);
		this.handelChange=this.handelChange.bind(this);
		this.renderLogin=this.renderLogin.bind(this);
		this.authenticate=this.authenticate.bind(this);
		this.authHandler=this.authHandler.bind(this);
		this.logOut=this.logOut.bind(this);

		this.state={
			uid: null,
			owner : null
		}
	}

	componentDidMount(){
		base.onAuth((user)=>{
			if (user) {
				this.authHandler(null, {user});
			}
		})
	}


	handelChange(e,key){
		const fish=this.props.fishes[key]
		const updateFish={...fish,[e.target.name]:e.target.value}
		this.props.updateFish(key,updateFish)
	}

	authenticate(provider){
		console.log(`trying to log in by ${provider}`);
		base.authWithOAuthPopup(provider,this.authHandler);
	}

	authHandler(err, authData){
		console.log(authData);
		if (err) {
			console.error(err);
			return;
		}

		// grab the stro info
		const storeRef=base.database().ref(this.props.storeId)

		// query the firebase once for the stro data
		storeRef.once('value',(snapshot)=>{
			const data=snapshot.val() || {};

			// claim it as out own if there is no owner already
			if (!data.owner) {
				storeRef.set({
					owner: authData.user.uid
				})
			}

			this.setState({
				uid:authData.user.uid,
				owner: data.owner || authData.user.uid
			})
		})
	}


	renderLogin(){
		return(
				<nav className="login">
					<p>sign in to manage your store's inventory</p>
					<button className="github" onClick={()=>this.authenticate('github')}>
						loge in with github
					</button>
				</nav>
			)
	}

	logOut(){
		base.unauth();
		this.setState({
			uid : null,
		})
	}


	renderInventory(key){
		const fish=this.props.fishes[key];
		return (
				<div className="fish-edit" key={key}>
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

  	const logout=<button onClick={this.logOut}>Log out</button>
		// check if they are not logged in
		if (!this.state.uid) {
			return <div>{this.renderLogin()}</div>
		}

		if (this.state.uid !==this.state.owner) {
			return (
					<div>
						<p>sorry , you aren't the owner of the store!</p>
						{logout}
					</div>
				)
		}

    return (
    	<div>
			<h2>Inventory</h2>
			{logout}
			{Object.keys(this.props.fishes).map(this.renderInventory)}
			<AddFishForm addFish={this.props.addFish}/>
			<button onClick={this.props.loadSamples}>Add sample Fishes</button>
    	</div>
    )
  }
}

Inventory.propTypes={
	fishes: React.PropTypes.object.isRequired,
	updateFish: React.PropTypes.func.isRequired,
	removeFish: React.PropTypes.func.isRequired,
	addFish: React.PropTypes.func.isRequired,
	loadSamples: React.PropTypes.func.isRequired,
	storeId: React.PropTypes.string.isRequired
}

export default Inventory;
