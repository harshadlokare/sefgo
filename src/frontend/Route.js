import React from "react";
import "./Route.css";
const Route = (props) => {
  //passing data to parent component(App) using props
  const {onTakeSource} = props;
  const {onTakeDestination} = props;
  const {onButtonClick} = props;
  
  //Show route button handler function
  const ButtonHandler =()=>{
    onButtonClick(true);
  }

//funtion to pass source input via props
const sourceHandler = (e) =>{

    onTakeSource(e.target.value);
}
//function to pass destination input via props
const destinationHandler = (e) =>{

  onTakeDestination(e.target.value);
}

//form handler function
  const formHandler = (e) =>{
    e.preventDefault();
  }

  return (
      <div className="first-div">

        <form onSubmit={formHandler}>
          <label htmlFor="sname">Source</label>  <br></br>
          <input
            type="text"
            id="sname"
            name="Source"
            placeholder="Enter Source.."
            onChange={sourceHandler}
          />
          <br></br>
          <label htmlFor="dname">Destination</label>  <br></br>
          <input
            type="text"
            id="dname"
            name="Destination"
            placeholder="Enter Destination.."
            onChange={destinationHandler}
          />
          <br></br>
          <button type="submit" onClick={ButtonHandler} >Show Map!</button>
          
        </form >     

      </div>    
      
  );
};

export default Route;
