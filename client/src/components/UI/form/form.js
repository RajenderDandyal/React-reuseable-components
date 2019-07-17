import React from "react";
import cl from "./formStyle.module.scss";

export default function ({title,submitFormHandler, state, disabled, checkValidity, onChangehandler, children}) {
  return (
      <div className={cl.container}>
        <form onSubmit={submitFormHandler} className={cl.form}>
          <h1 align="center">{title}</h1>
          {Object.entries(state.formData).map((item, index) => {
            return <div
                style={item[1].elementConfig.type === "checkbox" ?{display:"flex",flexDirection:"row", justifyContent:"center", alignItems:"flex-start"}:null}
                key={index}
                className={cl["form-wrapper"]}>
              <label
                  //style={item[1].elementConfig.type === "checkbox" ?{display:"inline-flex", width:"4em"}:null}
                  >
                {item[1].label}
                </label>
              {item[1].elementType === "input" ?
                  <input
                         onBlur={checkValidity}
                         onChange={onChangehandler} name={item[0]}
                         value={item[1].values}
                         type={item[1].elementConfig.type}
                         placeholder={item[1].elementConfig.placeholder}/>
                  : item[1].elementType === "select" ?
                      <select name={item[0]}
                              onChange={onChangehandler}
                              onBlur={checkValidity}
                              value={item[1].value}
                      >
                        {item[1].elementConfig.option.map((option) => {
                          return <option key={option.value} value={option.value}>{option.displayValue}</option>
                        })}
                      </select>
                      : item[1].elementType === "checkbox" ?
                          <input
                              style={{display: "inline-block", width:"2em"}}
                              onBlur={checkValidity}
                              onChange={onChangehandler} name={item[0]}
                              checked={item[1].checked}
                              value={item[1].values}
                              type={item[1].elementConfig.type}
                              placeholder={item[1].elementConfig.placeholder}/>
                          : null
              }
              <span className={cl.error}>{!item[1].isValid ? item[1].errorMsg : null}</span>
            </div>
          })}
          {children}
          <button  className={state.completeFormValidity? cl["submit-button"]: cl["submit-button-disabled"]}>Submit</button>
        </form>
      </div>
  );
}