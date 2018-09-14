import React from 'react';


class SignIn extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}


	//The following two functions grab what was input into the email and password fields and modify their state to what was entered. This is then used in the onSubmitSignIn function.
	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}

	//This function does a POST request to the server at the /signin domain and submits in JSON what the user typed as their username and password. If the username and password match what is in the database
	//The server responds with a 'success' header. If a success header is received, the route state is set to home, which takes the user to the homepage.
	onSubmitSignIn = () => {
		fetch('http://localhost:3001/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user.id) { //if the user has an id
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
		})
		
	}

	render() {
		const { onRouteChange } = this.props;
			return (
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
				        	onChange={this.onEmailChange}
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="email" 
				        	name="email-address"  
				        	id="email-address" />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
				        	onChange={this.onPasswordChange} 
				        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="password" 
				        	name="password"  
				        	id="password" />
				      </div>
				    </fieldset>
				    <div className="">
				      <input 
				      	onClick={this.onSubmitSignIn}
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      	type="submit" 
				      	value="Sign in" />
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
				    </div>
				  </div>
				</main>
			</article>
		);
	}
}
	

export default SignIn;