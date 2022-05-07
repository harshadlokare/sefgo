import React from "react";
import "./route.css";
const Route = (props) => {
  return (
    <form>
      <div class="first-div">
        <form>
          <label for="sname">Source</label>  <br></br>
          <input
            type="text"
            id="sname"
            name="Source"
            placeholder="Enter Source.."
          />
          <br></br>
          <label for="dname">Destination</label>  <br></br>
          <input
            type="text"
            id="dname"
            name="Destination"
            placeholder="Enter Destination.."
          />
          <br></br>
          <input type="submit" value="Show Route!" />
        </form>
      </div>
      {/*  <!-- <div>
                          <a href="#" onclick='loadHtml("template","mapl.html")'>CLiker to show map</a>
                      </div> --> */}
    </form>
  );
};

export default Route;
