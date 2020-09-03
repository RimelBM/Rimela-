import React,{useEffect,useState}  from 'react'
import { connect } from 'react-redux';
import  {loadUser} from '../../actions/authAction'
import {getFoods,deleteFood,likes,unlikeFood,addComment} from '../../actions/foodAction'
import AddFood from './AddFood';
import { Card, CardBody, Button, CardTitle, CardText, CardImg ,CardHeader,Input} from 'reactstrap';

import Rating from '@material-ui/lab/Rating';
import DeleteIcon from '@material-ui/icons/Delete';

const Home = ({
               auth,
               posts,
               loadUser,getFoods,deleteFood,likes,unlikeFood, addComment }) => {

   console.log(auth)
    useEffect(() => {
        
        loadUser() ;
    }, [])

    useEffect(() => {
        
        getFoods() ;
        
    }, [getFoods])

    const handleDelete = (id) => {
        
        deleteFood(id) ;
      };

      

      const handleLike = (id) => {
        
        likes(id) ;
      };

      const [value, setValue] = React.useState(2);

      const [formData,setFormData]  =useState(null) ;
      const onChange = e => setFormData({ [e.target.name]: e.target.value })

      const handleComment = (id ) => {
        
        addComment (id , formData) ;
      };
      
    return(
        <div>

            <AddFood/>

         

            <div>
          
            {posts.map(
                ({_id,description,picture,pseudo,createdAt})=>(


                    <div style={{marginLeft:'100px' , marginTop:'40px'}} >
                    
                   
                    <Card style={{width:'50%' }}>
                    <CardHeader style={{style:'flex'}}>
                     <div style={{display:'flex ', justifyContent:'space-between'}}>
                       <div style={{color:'blue' , fontFamily:'arial'}}>  
                         <h4> {pseudo} </h4>
                         <small className="text-muted">{createdAt}</small>
                         
                         </div>
                            
                       <div> <DeleteIcon  onClick={()=>handleDelete(_id)}/> </div>
                       <div> <DeleteIcon  onClick={()=>handleLike(_id)}/> </div>
                     </div>
                    </CardHeader>
               
                    <CardImg top  src="/photos/not.png" alt="Card image cap" style={{width:'100%'}}/>
                    <CardBody>
                        
                     <CardText>{description}</CardText>
                     <CardText>
                        <small className="text-muted">{createdAt}</small>
                     </CardText>
                     </CardBody>
                     
                  <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
<div>
                     <Input
                type="text"
                name="text"
                id="text"
                placeholder="Place your comment"
                onChange={e=>onChange(e)}
              />

              <Button onClick={()=>handleComment(_id)} />

              
     </div>         

                     </Card>
               
                

                
                </div>    )
            )}

</div>



          
        </div>
    )
}

const mapStateToProps = (state) => (
	{
        
        posts:state.food.posts,
        auth:state.auth.user
    }
)

export default connect(mapStateToProps , { getFoods, loadUser ,deleteFood,likes,unlikeFood ,addComment , likes})(Home)


