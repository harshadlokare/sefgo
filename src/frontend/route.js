import React from "react";
import "./route.css";
const Route = (props) => {
  const {onTakeSource} = props;
  const {onTakeDestination} = props;

  const {onButtonClick} = props;
  //const[btnClick,setBtnClick] = useState(false);
  const ButtonHandler =()=>{
    onButtonClick(true);
  }


const sourceHandler = (e) =>{

    onTakeSource(e.target.value);
}

const destinationHandler = (e) =>{

  onTakeDestination(e.target.value);
}


  const handler = (e) =>{
    e.preventDefault();
  }

  return (
    
      <div class="first-div">
        <form onSubmit={handler}>
          <label for="sname">Source</label>  <br></br>
          <input
            type="text"
            id="sname"
            name="Source"
            placeholder="Enter Source.."
            onChange={sourceHandler}
          />
          <br></br>
          <label for="dname">Destination</label>  <br></br>
          <input
            type="text"
            id="dname"
            name="Destination"
            placeholder="Enter Destination.."
            onChange={destinationHandler}
            
          />
          <br></br>
          <button type="submit" onClick={ButtonHandler} >Show Route!</button>
        </form >
      </div>    
  );
};

export default Route;
