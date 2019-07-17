import React, {Component} from 'react';
import {NavLink, Link} from "react-router-dom";
import cl from "./layout.module.scss"
import DropDown from "./dropDown/dropDown";
class Layout extends Component {
  state={
    home:[
        {title:"Home", to:"/"},
        {title:"Login", to:"/login"},
        {title:"Register", to:"/register"},
        {title:"DragNDrop", to:"/dragndrop"},
        {title:"Home", to:"/"},
        {title:"Login", to:"/login"},
        {title:"Register", to:"/register"},
        {title:"DragNDrop", to:"/dragndrop"},

        ]
  }
  homeDropDownEnter =(e, parentId, DropDownId)=>{
    e.currentTarget.style.backgroundColor="white";
    document.getElementById(DropDownId).style.display = "block"
    //this.setState({show:true})
  }
  homeDropDownLeave =(e,parentId, DropDownId)=>{
    e.currentTarget.style.backgroundColor="";
    document.getElementById(DropDownId).style.display = "none"
    //this.setState({show:false})

  }
  render() {
    return (
        <React.Fragment>
          <header>
            <nav className={cl.nav}>
              <div
                  onMouseEnter={(e)=>this.homeDropDownEnter(e,"home","homeDropDown")}
                  onMouseLeave={(e)=>this.homeDropDownLeave(e,"home","homeDropDown")}
                  id={"home"}
                  className={cl.linkWrapper}>
                <NavLink  exact={true} to={"/"} className={cl.link}>Home</NavLink>
                <DropDown id={"homeDropDown"} show={this.state.show}>
                  {this.state.home.map((item, i)=>{
                    return<div className={cl.ddContentItem} key={i}><Link to={item.to}>{item.title}</Link></div>
                  })}
                </DropDown>
              </div>
              <div
                  onMouseEnter={(e)=>this.homeDropDownEnter(e,"login","loginDropDown")}
                  onMouseLeave={(e)=>this.homeDropDownLeave(e,"login","loginDropDown")}
                  id={"login"}
                  className={cl.linkWrapper}>
                <NavLink  exact={true} to={"/login"} className={cl.link}>Login</NavLink>
                <DropDown id={"loginDropDown"} show={this.state.show}>
                  {this.state.home.map((item, i)=>{
                    return<div className={cl.ddContentItem} key={i}><Link to={item.to}>{item.title}</Link></div>
                  })}
                </DropDown>
              </div>
              <div
                  onMouseEnter={(e)=>this.homeDropDownEnter(e,"register","registerDropDown")}
                  onMouseLeave={(e)=>this.homeDropDownLeave(e,"register","registerDropDown")}
                  id={"register"}
                  className={cl.linkWrapper}>
                <NavLink  exact={true} to={"/register"} className={cl.link}>Register</NavLink>
                <DropDown id={"registerDropDown"} show={this.state.show}>
                  {this.state.home.map((item, i)=>{
                    return<div className={cl.ddContentItem} key={i}><Link to={item.to}>{item.title}</Link></div>
                  })}
                </DropDown>
              </div>
              <div
                  onMouseEnter={(e)=>this.homeDropDownEnter(e,"dragndrop","dragndropDropDown")}
                  onMouseLeave={(e)=>this.homeDropDownLeave(e,"dragndrop","dragndropDropDown")}
                  id={"dragndrop"}
                  className={cl.linkWrapper}>
                <NavLink  exact={true} to={"/dragndrop"} className={cl.link}>DragNDrop</NavLink>
                <DropDown id={"dragndropDropDown"} show={this.state.show}>
                  {this.state.home.map((item, i)=>{
                    return<div className={cl.ddContentItem} key={i}><Link to={item.to}>{item.title}</Link></div>
                  })}
                </DropDown>
              </div>
              {/*<div id={"login"}>
                <NavLink className={cl.link} exact={true} to={"/login"}>Login</NavLink>
              </div>
              <div id={"register"}>
                <NavLink className={cl.link} exact={true} to={"/register"}>Register</NavLink>
              </div>
              <div id={"dragndrop"}>
                <NavLink className={cl.link} exact={true}
                         to={"/dragndrop"}>DragNDrop</NavLink>
              </div>*/}

            </nav>
          </header>
          {this.props.children}
        </React.Fragment>
    );
  }
}

export default Layout;