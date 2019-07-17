import React from 'react';

const dropDownFullPage = ({children, id, parentId}) => {
  return (
      <div id={id} style={{
        display: "none",
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight/1.2,
        padding: "0.3em",
        backgroundColor: "white",
        position: "absolute",
        top: "4em",
        left:0,
        zIndex: "10"
      }}>
        {children}
      </div>
  );
};

export default dropDownFullPage;
