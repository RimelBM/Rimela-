import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { login } from '../../actions/authAction'

import {Form,FormGroup,Input,Button} from "reactstrap"


const Login = ({login, isAuthenticated}) => {
	const [formData, setFormData] = useState({
		
		email: '',
		password: ''
	})

	const { email, password } = formData

	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

	const onSubmit = async e => {
		e.preventDefault()
		
		login(formData)	
		
	}

	if(isAuthenticated){
		return <Redirect to="/" />
	}


	return (
	    
		<div style={{display:'flex' , margin:'40px'}}>

           <img src={'/photos/food.jpg'} width="50%" />

 	      <Form style={{margin:'150px' }} onSubmit={e => onSubmit(e)}>
	          <FormGroup>
			  <h1 className="large text-primary">Sign IN</h1>
			  </FormGroup>
			  <FormGroup>
        	  <Input type="email" name="email" id="exampleEmail" placeholder="email" value={email}
						onChange={e => onChange(e)}   /> 
			  </FormGroup>
			  <FormGroup>
			  <Input type="password" name="password" id="examplePassword" placeholder="password " value={password}
						onChange={e => onChange(e)} />
			  </FormGroup>

			  <Button>Login</Button>

			  <p className="my-1">
				Not have an account? <Link to="/register">Sign Up</Link>
			</p>
			



	
	  </Form>



</div>
	)
}

const mapStateToProps = (state) => (
	{
		isAuthenticated: state.auth.isAuthenticated
	}
)



export default connect(mapStateToProps, { login })(Login)