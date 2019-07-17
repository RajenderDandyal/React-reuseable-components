import React, {Component} from 'react';
import {HandleChange, ClearFields, AddSelectOptions, Validation} from "../../helper/formActions";
import Form from "../UI/form/form";
//import axios from "../../axiosInstance";
import axios from "axios";

class Login extends Component {

  state = {
    completeFormValidity: false,
    formData: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail',
        },
        value: '',
        label: 'Email Address',
        rules: {
          required: true,
          minLength: 7,
          maxLength: 30,
          isEmail: true
        },
        isValid: true,
        errorMsg: "REQUIRED!! And should be between 8-30 characters, and include @example.com",
        touched: false,
      },

      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your password',
        },
        value: '',
        label: 'Password',
        rules: {
          required: true,
          minLength: 6,
          maxLength: 40
        },
        isValid: true,
        errorMsg: "REQUIRED!! And should be between 6-40 characters",
        touched: false,
      },


    }
  };

  submitFormHandler = (event) => {
    event.preventDefault();
    if (this.state.completeFormValidity) {

      let userDataFromState = {};
      for (let key in this.state.formData) {
        userDataFromState[key] = this.state.formData[key].value;
      }
      console.log(userDataFromState)
      axios.post("/api/users/login", userDataFromState).then(res=>console.log(res)).catch(err=>console.log(err))
      //this.props.loginUser(userDataFromState, this.props.history)
    }
  };
  checkCompleteFormValidity = () => {
    let dataValid = true;
    for (let key in this.state.formData) {
      dataValid = this.state.formData[key].isValid && this.state.formData[key].touched && dataValid;
    }
    console.log(dataValid)
    this.setState({completeFormValidity: dataValid})
  }
  checkValidity = (event) => {
    this.setState(Validation(event, this.state), () => this.checkCompleteFormValidity())
  };

  onChangehandler = (event) => {
    this.setState(HandleChange(event, this.state));
  };

  render() {
    let {formData} = this.state;
    return (
        <Form
            title={"login"}
            state={this.state}
            checkValidity={this.checkValidity}
            onChangehandler={this.onChangehandler}
            submitFormHandler={this.submitFormHandler}
        />
    );
  }
}

export default Login;