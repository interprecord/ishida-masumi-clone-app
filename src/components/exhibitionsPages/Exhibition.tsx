import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Nomatch from "../Routes/Nomatch";
import Exhibition2 from "./Exhibition2";
import Exhibition1 from "./Exhibition1";
import { dataProps } from "../Exhibitions";
import Exhibition3 from "./Exhibition3";
import Exhibition4 from "./Exhibition4";
import Exhibition6 from "./Exhibition6";
import Exhibition5 from "./Exhibition5";



const Exhibition:React.FC<dataProps>= ({data}) => {
  const { id } = useParams();

  if (!id) {
    return (
      <div>
        <Nomatch />
      </div>
    );
  } else if (id === "0") {
    return <Exhibition1 data={data}/>;
  } else if (id === "1") {
    return <Exhibition2 data={data}/>;
  }else if (id === "2") {
    return <Exhibition3 data={data}/>;
  } else if (id === "3") {
    return <Exhibition4 data={data}/>;
  } else if (id === "4") {
    return <Exhibition5 data={data}/>;
  } else if (id === "5") {
    return <Exhibition6 data={data}/>;
  }
};


export default Exhibition;
