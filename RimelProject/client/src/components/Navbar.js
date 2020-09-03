import React from 'react';
import {
    
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';
  import { logout } from '../actions/authAction'
  import { connect } from 'react-redux';

  const navbar = ({logout , isAuthenticated ,pseudo}) => {

   
    
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Food&Picture</NavbarBrand>
         
            <Nav className="mr-auto" navbar>
             
            
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Country
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Tunisia
                  </DropdownItem>
                  <DropdownItem>
                    Germany
                  </DropdownItem>
                  
                </DropdownMenu>
              </UncontrolledDropdown>
              </Nav>
              
              {
                isAuthenticated ?
                <>
                
                <NavLink href=''>{pseudo}</NavLink>
                <NavLink href='/login' onClick ={logout}>Logout</NavLink>
              </>
                    
                :
                
                <NavLink href='/login' >Login</NavLink>
              }
           
        </Navbar>
      </div>
    );
  }

  const mapStateToProps = (state) => (
    {
      isAuthenticated: state.auth.isAuthenticated ,

      pseudo:state.auth.pseudo
      
  
    }
  )


export default connect( mapStateToProps , {logout}) (navbar);