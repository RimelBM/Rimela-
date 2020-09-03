import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addFood } from '../../actions/foodAction';


const AddFood = ({ isAuthenticated, addFood }) => {
  const [modal, setModal] = useState(false);

  
  const [formData,setFormData]  =useState(null) ;
  
  const handleToggle = () => setModal(!modal);

 
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
 
  const handleOnSubmit = (e) => {
    e.preventDefault();
    // Add item via addItem action
    addFood(formData);
    // Close modal
    handleToggle();
  };
 
  return (
    <div style={{paddingLeft:'30px' , paddingRight:'30px'}}>

      {isAuthenticated ? (
        <Button
          outline color="success"
          style={{ marginBottom: '2rem' }}
          onClick={handleToggle}
          style={{width:"100%" , marginTop :"20px" ,marginBottom:'50px' }}
        >
          Add Food
        </Button>
      ) : (
        <h4 ></h4>
      )}



      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Add To Foods List</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="item">food</Label>
              
              <Input
                type="description"
                name="description"
                id="description"
                placeholder="Add desc of food"
                onChange={e=>onChange(e)}
              />
              <Input
              type="picture"
              placeholder="name picture"
              onChange={e => onChange(e)}
              name="picture"
          />




              <Button outline color="success" style={{ marginTop: '2rem' }} block >
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  item: state.food,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addFood })(AddFood);