import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { login } from '../../actions/authAction'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
	return (
	  <Typography variant="body2" color="textSecondary" align="center">
		{'Copyright © '}
		<Link color="inherit" href="https://material-ui.com/">
		  Your Website
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
	  </Typography>
	);
  }
  const useStyles = makeStyles((theme) => ({
	paper: {
	  marginTop: theme.spacing(8),
	  display: 'flex',
	  flexDirection: 'column',
	  alignItems: 'center',
	},
	avatar: {
	  margin: theme.spacing(1),
	  backgroundColor: theme.palette.secondary.main,
	},
	form: {
	  width: '100%', // Fix IE 11 issue.
	  marginTop: theme.spacing(1),
	},
	submit: {
	  margin: theme.spacing(3, 0, 2),
	},
  }));



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

	const classes = useStyles();

	return (
		<Fragment>
			<h1 className="large text-primary">Sign IN</h1>
			
			<form className="form" noValidate={true} onSubmit={e => onSubmit(e)}>
				
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
				<input type="submit" className="btn btn-primary" value="LOgin" />
			</form>

			<p className="my-1">
				Not have an account? <Link to="/register">Sign Up</Link>
			</p>
			
		</Fragment>
	)
}

const mapStateToProps = (state) => (
	{
		isAuthenticated: state.auth.isAuthenticated
	}
)



export default connect(mapStateToProps, { login })(Login)