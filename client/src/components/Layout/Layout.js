import React, {Component} from 'react';

import cl from "./layout.module.scss"

import NavTabs from "./navTabs";

class Layout extends Component {
  state = {
    navBar: [
      {
        dropDownList: [
          {title: "Home", to: "/"},
          {title: "Login", to: "/login"},
          {title: "Register", to: "/register"},
          {title: "DragNDrop", to: "/dragndrop"},
          {title: "Home", to: "/"},
          {title: "Login", to: "/login"},
          {title: "Register", to: "/register"},
          {title: "DragNDrop", to: "/dragndrop"},
        ],
        parentId: "home",
        childId: "homeDropDown",
        title: "Home",
        to: "/"
      },
      {
        dropDownList: [
            [
                "First heading", [
                {title: "Home", to: "/"},
              {title: "Login", to: "/login"},
              {title: "Register", to: "/register"},
              {title: "DragNDrop", to: "/dragndrop"}
              ]
            ],
          [
                "Second heading", [
                {title: "Home", to: "/"},
              {title: "Login", to: "/login"},
              {title: "Register", to: "/register"},
              {title: "DragNDrop", to: "/dragndrop"}
              ]
            ],
          [
                "Third heading", [
                {title: "Home", to: "/"},
              {title: "Login", to: "/login"},
              {title: "Register", to: "/register"},
              {title: "DragNDrop", to: "/dragndrop"}
              ]
            ],
          [
                "Fourth heading", [
                {title: "Home", to: "/"},
              {title: "Login", to: "/login"},
              {title: "Register", to: "/register"},
              {title: "DragNDrop", to: "/dragndrop"}
              ]
            ],
          [
                "Fifth heading", [
                {title: "Home", to: "/"},
              {title: "Login", to: "/login"},
              {title: "Register", to: "/register"},
              {title: "DragNDrop", to: "/dragndrop"}
              ]
            ],
          [
                "Sixth heading", [
                {title: "Home", to: "/"},
              {title: "Login", to: "/login"},
              {title: "Register", to: "/register"},
              {title: "DragNDrop", to: "/dragndrop"}
              ]
            ],

        ],
        parentId: "login",
        childId: "loginDropDown",
        title: "Login",
        to: "/login"
      },
      {
        dropDownList: [
          {title: "Home", to: "/"},
          {title: "Login", to: "/login"},
          {title: "Register", to: "/register"},
          {title: "DragNDrop", to: "/dragndrop"},
          {title: "Home", to: "/"},
          {title: "Login", to: "/login"},
          {title: "Register", to: "/register"},
          {title: "DragNDrop", to: "/dragndrop"},
        ],
        parentId: "register",
        childId: "registerDropDown",
        title: "Register",
        to: "/register"
      },
      {
        dropDownList: [
          {title: "Home", to: "/"},
          {title: "Login", to: "/login"},
          {title: "Register", to: "/register"},
          {title: "DragNDrop", to: "/dragndrop"},
          {title: "Home", to: "/"},
          {title: "Login", to: "/login"},
          {title: "Register", to: "/register"},
          {title: "DragNDrop", to: "/dragndrop"},
        ],
        parentId: "dragndrop",
        childId: "dragndropDropDown",
        title: "DragNDrop",
        to: "/dragndrop"
      },
    ]
  };
  homeDropDownEnter = (e, parentId, DropDownId) => {
    let dropdown = document.getElementById(DropDownId)

      if (e.currentTarget.id === "login"){
        console.log("inside login")

        e.currentTarget.style.backgroundColor = "white";
        dropdown.style.display = "block";
        dropdown.style.left = `-${(document.getElementById(parentId).getBoundingClientRect().left)}px`
      } else if (e.currentTarget.id === "dragndrop"){
        console.log("inside dragndrop")

        // always read the offsetWidth after setting display block
        // never try to read elem.style.width ... elem.offsetWidth
        e.currentTarget.style.backgroundColor = "white";
        dropdown.style.display = "block";
        dropdown.style.left = `-${(dropdown.offsetWidth -document.getElementById(parentId).offsetWidth)}px`
      }else {
        e.currentTarget.style.backgroundColor = "white";
        dropdown.style.display = "block"
        dropdown.style.left ="0px"
      }


  };
  homeDropDownLeave = (e, parentId, DropDownId) => {
    //e.currentTarget.style.backgroundColor = "";
    document.getElementById(parentId).style.backgroundColor = ""
    document.getElementById(DropDownId).style.display = "none"
  };

  render() {
    return (
        <React.Fragment>
          <header>
            <nav className={cl.nav}>
              {this.state.navBar.map((item, i) => {
                return <NavTabs
                    key={i}
                    homeDropDownEnter={this.homeDropDownEnter}
                    homeDropDownLeave={this.homeDropDownLeave}
                    parentId={item.parentId}
                    childId={item.childId}
                    title={item.title}
                    dropDownList={item.dropDownList}
                />
              })}
              {/*<div
                  onMouseEnter={(e) => this.homeDropDownEnter(e, "home", "homeDropDown")}
                  onMouseLeave={(e) => this.homeDropDownLeave(e, "home", "homeDropDown")}
                  id={"home"}
                  className={cl.linkWrapper}>
                <NavLink exact={true} to={"/"} className={cl.link}>Home</NavLink>
                <DropDown id={"homeDropDown"}>
                  {this.state.home.map((item, i) => {
                    return <div className={cl.ddContentItem} key={i}><Link to={item.to}>{item.title}</Link></div>
                  })}
                </DropDown>
              </div>
              <div
                  onMouseEnter={(e) => this.homeDropDownEnter(e, "login", "loginDropDown")}
                  onMouseLeave={(e) => this.homeDropDownLeave(e, "login", "loginDropDown")}
                  id={"login"}
                  className={cl.linkWrapper}>
                <NavLink exact={true} to={"/login"} className={cl.link}>Login</NavLink>
                <DropDown id={"loginDropDown"} show={this.state.show}>
                  {this.state.home.map((item, i) => {
                    return <div className={cl.ddContentItem} key={i}><Link to={item.to}>{item.title}</Link></div>
                  })}
                </DropDown>
              </div>
              <div
                  onMouseEnter={(e) => this.homeDropDownEnter(e, "register", "registerDropDown")}
                  onMouseLeave={(e) => this.homeDropDownLeave(e, "register", "registerDropDown")}
                  id={"register"}
                  className={cl.linkWrapper}>
                <NavLink exact={true} to={"/register"} className={cl.link}>Register</NavLink>
                <DropDown id={"registerDropDown"} show={this.state.show}>
                  {this.state.home.map((item, i) => {
                    return <div className={cl.ddContentItem} key={i}><Link to={item.to}>{item.title}</Link></div>
                  })}
                </DropDown>
              </div>
              <div
                  onMouseEnter={(e) => this.homeDropDownEnter(e, "dragndrop", "dragndropDropDown")}
                  onMouseLeave={(e) => this.homeDropDownLeave(e, "dragndrop", "dragndropDropDown")}
                  id={"dragndrop"}
                  className={cl.linkWrapper}>
                <NavLink exact={true} to={"/dragndrop"} className={cl.link}>DragNDrop</NavLink>
                <DropDown id={"dragndropDropDown"} show={this.state.show}>
                  {this.state.home.map((item, i) => {
                    return <div className={cl.ddContentItem} key={i}><Link to={item.to}>{item.title}</Link></div>
                  })}
                </DropDown>
              </div>*/}
            </nav>
          </header>
          {this.props.children}
        </React.Fragment>
    );
  }
}

export default Layout;