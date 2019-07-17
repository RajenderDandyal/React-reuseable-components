import React from 'react';
import cl from "../layout.module.scss";
import {Link, NavLink} from "react-router-dom";
import DropDown from "../dropDown/dropDown";
import DropDownFullPage from "../dropDownFullPage";

const navTabs = ({homeDropDownEnter, homeDropDownLeave, parentId, childId, title, dropDownList}) => {
  return (
      <div
          onMouseEnter={(e) => homeDropDownEnter(e, parentId, childId)}
          onMouseLeave={(e) => homeDropDownLeave(e, parentId, childId)}
          id={parentId}
          className={cl.linkWrapper}>
        <NavLink exact={true} to={"/"} className={cl.link}>{title}</NavLink>
        {parentId === "login"?
            <DropDownFullPage id={childId} parentId={parentId}>
              {dropDownList.map((item, i) => {
                return <div className={cl.ddContentItem} key={i}><Link to={item.to}>{item.title}</Link></div>
              })}
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