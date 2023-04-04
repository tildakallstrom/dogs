import React,{ Component } from 'react'
import axios from 'axios';

class Dogs extends Component {
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
        axios.get('https://cryptic-peak-10746.herokuapp.com/dogs/')
        .then(response => {
            this.setState({
                dogs: response.data
            })
            
        })

         
      }
      handleChange(event){
        this.setState({
          [event.target.name] : event.target.value,
          [event.target.breed] : event.target.value,
          [event.target.age] : event.target.value,
          [event.target.sex] : event.target.value,
          [event.target.merits] : event.target.value,
          [event.target.father] : event.target.value,
          [event.target.mother] : event.target.value
        })
      }
      
      update(dog) {
        this.setState({ name: dog.name, breed: dog.breed, age: dog.age, sex: dog.sex, merits: dog.merits, father: dog.father, mother: dog.mother, _id: dog._id, put: true })
        this.setState({ buttonText: "Update dog"});
      }
    handleSubmit(event){
        const {name, breed, age, sex, merits, father, mother} = this.state
      event.preventDefault()
        
    if ( `${name}` === "" || `${breed}` === "" || `${age}` === "" || `${sex}` === "" || `${merits}` === "" || `${father}` === "" || `${mother}` === ""){
        alert("Fill in correctly")
    }
    else{
      if( this.state.put === false){
      const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "name": `${name}`, "breed": `${breed}`, "age": `${age}`, "sex": `${sex}`,"merits": `${merits}`,"father": `${father}`,"mother": `${mother}`})
    }
    fetch('https://cryptic-peak-10746.herokuapp.com/dogs/', request)
        .then(async response => {
            window.location.reload();
        })
    }
    else{
      const request = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "name": `${name}`, "breed": `${breed}`, "age": `${age}`, "sex": `${sex}`,"merits": `${merits}`,"father": `${father}`,"mother": `${mother}`})
    }
    fetch('https://cryptic-peak-10746.herokuapp.com/dogs/' + this.state._id, request)
        .then(async response => {
            window.location.reload();
        })
    }
    }
  }
  
    render() {
        const { dogs } = this.state
        function handleRemove(_id) {
             axios.delete('https://cryptic-peak-10746.herokuapp.com/dogs/' + _id)
             setTimeout(() => window.location.reload(), 90);  
          } 

          return( 
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