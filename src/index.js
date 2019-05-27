import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter , Miss , Match} from "react-router";
import './css/style.css';
import App from './components/App';
import NotFound from './components/NotFound';

import StorePicker from './components/StorePicker';


const Root = ()=>{
	return(
		<BrowserRouter>
			<div>
				<Match exactly pattern="/" component={StorePicker}/>
				<Match pattern="/store/:storeId"  component={App}/>
				<Miss component={NotFound} />
			</div>
		</BrowserRouter>
	)
}

render(<Root/>, document.querySelector('#main'));
