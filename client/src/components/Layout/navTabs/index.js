import React from 'react';
import cl from "../layout.module.scss";
import {Link, NavLink} from "react-router-dom";
import DropDown from "../dropDown/dropDown";
import DropDownFullPage from "../dropDownFullPage";
import Login from "../../Auth/Login";

const navTabs = ({homeDropDownEnter, homeDropDownLeave,to, parentId, childId, title, dropDownList}) => {
  return (
      <div
          onMouseEnter={(e) => homeDropDownEnter(e, parentId, childId)}
          onMouseLeave={(e) => homeDropDownLeave(e, parentId, childId)}
          id={parentId}
          className={cl.linkWrapper}>
        <NavLink exact={true} to={to} className={cl.link}>{title}</NavLink>
        {parentId === "login"?
            <DropDownFullPage id={childId} parentId={parentId}>
              <div className={cl.ddContentFullPage}>
              {dropDownList.map((item, i) => {
                return<div className={cl.item} key={i}>
                      <h4 align="left">{item[0]}</h4>
                      {item[1].map((links, ind)=>{
                        return <div key={ind} className={cl.content}><Link to={links.to}>{links.title}</Link></div>
                      })}
                    </div>
              })}
              </div>
            </DropDownFullPage>
            :<DropDown id={childId}>
              {dropDownList.map((item, i) => {
                return <div className={cl.ddContentItem} key={i}><Link to={item.to}>{item.title}</Link></div>
              })}
            </DropDown>
        }
      </div>
  );
};

export default navTabs;
