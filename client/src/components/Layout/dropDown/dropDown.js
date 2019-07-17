import React from 'react';

const homeDropDown = ({children, id}) => {
  return (
      <div id={id} style={{
        display:"none",
        minWidth:"120px",
        minHeight:"120px",
        padding:"0.3em",
        backgroundColor:"white",
        position:"absolute",
        top:"4em",
        left:'0em',
        zIndex:"10"
      }}>
        {children}
      </div>
  );
};

export default homeDropDown;
