import React from 'react';
import hangInThereBaby from "../img/404.jpg";

const PageNotfound404 = () => {
  return (
    <div className="page-not-found">
        <img src={hangInThereBaby} alt="Hang in there baby!"/>
        <h1>404 page not found</h1>
    </div>
  )
}

export default PageNotfound404