import React,{ Component } from 'react'
import axios from 'axios';

//class
class Dogs extends Component {
   //constructor
    constructor(props) {
      super(props);
      this.state = { 
            dogs: [], 
            _id: '',
            name: '',
            breed: '',
            age: '',
            sex: '',
            merits: '',
            father: '',
            mother: '',
             buttonText: 'Add dog',  
             errorMessage: '', 
             put:false} 
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        //Get everything from db
        axios.get('https://cryptic-peak-10746.herokuapp.com/dogs/')
        .then(response => {
            this.setState({
                dogs: response.data
            })
            
        })

         
      }
      //change
      handleChange(event){
        this.setState({
            //values
          [event.target.name] : event.target.value,
          [event.target.breed] : event.target.value,
          [event.target.age] : event.target.value,
          [event.target.sex] : event.target.value,
          [event.target.merits] : event.target.value,
          [event.target.father] : event.target.value,
          [event.target.mother] : event.target.value
        })
      }
      
    //updatebtn to fill in form
      update(dog) {
        this.setState({ name: dog.name, breed: dog.breed, age: dog.age, sex: dog.sex, merits: dog.merits, father: dog.father, mother: dog.mother, _id: dog._id, put: true })
        //change button form add to update
        this.setState({ buttonText: "Update dog"});
      }
//submit
    handleSubmit(event){
    //constant values
        const {name, breed, age, sex, merits, father, mother} = this.state
      event.preventDefault()
        
    //Check if inputs are empty
    if ( `${name}` === "" || `${breed}` === "" || `${age}` === "" || `${sex}` === "" || `${merits}` === "" || `${father}` === "" || `${mother}` === ""){
       //errormessage
        alert("Fill in correctly")
    }
    else{
      //check if put or post is used
      if( this.state.put === false){
      const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //values
        body: JSON.stringify({ "name": `${name}`, "breed": `${breed}`, "age": `${age}`, "sex": `${sex}`,"merits": `${merits}`,"father": `${father}`,"mother": `${mother}`})
    }
    //add
    fetch('https://cryptic-peak-10746.herokuapp.com/dogs/', request)
        .then(async response => {
            //reload window to update site
            window.location.reload();
        })
    }
    else{
      const request = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "name": `${name}`, "breed": `${breed}`, "age": `${age}`, "sex": `${sex}`,"merits": `${merits}`,"father": `${father}`,"mother": `${mother}`})
    }
    //update
    fetch('https://cryptic-peak-10746.herokuapp.com/dogs/' + this.state._id, request)
        .then(async response => {
           //reload window to update site
            window.location.reload();
        })
    }
    }
  }
  
    render() {
        const { dogs } = this.state
        //deletefunction
        function handleRemove(_id) {
            //link + id to the dog that u want to delete
             axios.delete('https://cryptic-peak-10746.herokuapp.com/dogs/' + _id)
             //reload to update list of dogs
             setTimeout(() => window.location.reload(), 90);  
  
          } 
       
      
          return( 
//everything that writesout
            <>
                
                <h1>Add Dog</h1>
                
                <form id="dogform" className="dogform" onSubmit={this.handleSubmit}>
               <div>
                       <input 
                       type='hidden' 
                       name='_id' 
                       id='_id'
                       value={this.state._id} 
                       onChange={this.handleChange}
                       />
                   </div>
                   <div>
                       <label>Name</label>
                       <input 
                       type='text' 
                       name='name' 
                       id='name'
                       value={this.state.name} 
                       onChange={this.handleChange}
                       />
                   </div>
                   <div>
                       <label>Breed</label>
                       <input 
                       type='text' 
                       name='breed' 
                       id='breed'
                       value={this.state.breed} 
                       onChange={this.handleChange}
                       />
                   </div>
                   <div>
                       <label>Born</label>
                       <input 
                       type='date' 
                       name='age' 
                       id='age'
                       value={this.state.age} 
                       onChange={this.handleChange}
                       />
                   </div>
                   <div>
                       <label>Sex</label>
                       <input
                       type='text'
                       name='sex' 
                       id='sex'
                       value={this.state.sex} 
                       onChange={this.handleChange}
                       />
                       </div>
                   <div>
                       <label>Merits</label>
                       <input 
                       type='text' 
                       name='merits'
                       id='merits' 
                       value={this.state.merits} 
                       onChange={this.handleChange}
                       />
                   </div>
                   <div>
                       <label>Father</label>
                       <input 
                       type='text' 
                       name='father' 
                       id='father'
                       value={this.state.father} 
                       onChange={this.handleChange}
                       />
                   </div>
                   <div>
                       <label>Mother</label>
                       <input 
                       type='text' 
                       name='mother' 
                       id='mother'
                       value={this.state.mother} 
                       onChange={this.handleChange}
                       />
                   </div>
        <div>
          <button className="submitbtn">{this.state.buttonText}</button>
        </div>
      </form>
      <div id="dogs">
      <h2>Dogs</h2>
            {dogs.map(dog => 
            //writeout all dogs
            
            <ul className="onedog" key={dog._id}> 
            <li><h3>{dog.name}</h3></li>
                    <li>
                    <b>Breed: </b>{dog.breed}, <b>Born: </b>{dog.age}, <b>Sex: </b>{dog.sex}
                    </li>
                    <li>
                    <b>Father:</b> {dog.father} <b>Mother:</b> {dog.mother}
                    </li>
                    <li>
                    <b>Merits:</b> {dog.merits}
                    </li> 
          
                <li><button onClick={() => handleRemove(dog._id)} className="btn">Delete</button> 
                <button onClick={() =>this.update(dog)} className="btnred">Update</button></li> 
                
           </ul>
           
            
           )}
</div>

           </>
           
          )
        }
  }
  
  export default Dogs