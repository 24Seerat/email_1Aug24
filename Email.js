import React, {useState,useRef} from 'react';
import axios from 'axios';

export default function Email()
{

	const [email, setEmail] = useState('');
  	const [msg, setMsg] = useState('');

	const hSubscribe=async()=>
	{
    	try {
      		const res = await axios.post('http://localhost:9000/subscribe', {email});
      		setMsg(res.data);
    	}
	catch(error) {
		setMsg(error.res ? error.res.data : 'An error occurred');
    	}
  	}

  	const hUnsubscribe=async()=> {
    	try {
      		const res = await axios.post('http://localhost:9000/unsubscribe',{email});
      		setMsg(res.data);
    	} 
	catch(error) {
      		setMsg(error.res ? error.res.data : 'An error occurred');
   	}
  	}

return (
    <div className="App">
      <h1>Email Subscription</h1>
      <input type="email"  placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/><br/><br/>
      <button1 onClick={hSubscribe}>Subscribe</button1><br/><br/>
      <button2 onClick={hUnsubscribe}>Unsubscribe</button2>
      <h2>{msg}</h2>
    </div>
  );
}


