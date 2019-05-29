import React from 'react';
import {formatPrice} from '../helpers';

class Order extends React.Component {
	constructor(){
		super()
		this.renderTotal=this.renderTotal.bind(this)
	}
	renderTotal(key){
		const fish =this.props.fishes[key]
		const count =this.props.order[key]
		if (!fish || fish.status==="unavailable") {
			return <li key={key}>Sorry , {fish ? fish.name : "fish"} is no longer available</li>
		}
		return (
				<li key={key}>
					<strong>{fish.name}</strong>
					<strong>{formatPrice(count * fish.price)}</strong>
				</li>
			)
	}
  render() {
  	const orderIds=Object.keys(this.props.order)
  	const total = orderIds.reduce((prevTotal, key)=>{
		const fish =this.props.fishes[key]
		const count =this.props.order[key]
		const isAvailable= fish && fish.status==="available"
		if (isAvailable) {
			return prevTotal + (count * fish.price || 0)
		}
		return isAvailable;
  	},0)
    return (
      <div className="order-wrap">
				<h2>Your Order</h2>
				<ul className="order">
					{orderIds.map(this.renderTotal)}
					<li className="total">
						<strong>Total :</strong>
						{formatPrice(total)}
					</li>
				</ul>
      </div>
    )
  }
}

export default Order;

