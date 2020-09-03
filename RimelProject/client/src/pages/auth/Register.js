import React, { Fragment, useState ,useEffect} from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { register } from '../../actions/authAction'
import {clearAlert} from '../../actions/alertAction'

const Register = ({register ,alert , isAuthenticated ,clearAlert}) => {
	
	const [formData, setFormData] = useState({
		pseudo: '',
		email: '',
		password: ''
	})
	
	const [msge,setMsg] = useState('hello') ;


	const { pseudo, email, password } = formData

	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

	const onSubmit = async e => {
		e.preventDefault()
		
		register(formData)	
	
		
	} 
	console.log(alert.msg.msg)


	if(isAuthenticated){
		return <Redirect to="/" />
	}



	return (
		<Fragment>
		
	

	        <h1 className="large text-primary">Sign UP</h1>
			<p style={{color:'red'}}>{alert.msg.msg || alert.msg.error}</p>
			<form className="form" noValidate={true} onSubmit={e => onSubmit(e)}>
				<div className="form-group">
					<input
						type="text"
						placeholder="pseudo"
						name="pseudo"
						value={pseudo}
						onChange={e => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						value={email}
						onChange={e => onChange(e)}
						name="email"
					/>
				
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={e => onChange(e)}
						required
						minLength="6"
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Register" />
			</form>
			<p className="my-1">
				Already have an account? <Link to="/login">Sign In</Link>
			</p>
		</Fragment>
	)
}

const mapStateToProps = (state) => (
	{
		isAuthenticated: state.auth.isAuthenticated ,
		alert : state.alert
		

	}
)



export default connect(mapStateToProps, { register  })(Register)