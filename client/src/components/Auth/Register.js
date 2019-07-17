import React, {Component} from 'react';
import {HandleChange, ClearFields, AddSelectOptions, Validation} from "../../helper/formActions";
import Form from "../UI/form/form";
import axios from "axios";

class Register extends Component {
  state = {
    completeFormValidity: false,
    image: null,
    formData: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        label: 'Name',
        rules: {
          required: true,
          minLength: 4,
          maxLength: 18
        },
        isValid: true,
        errorMsg: "REQUIRED!! And should be between 4-18 characters",
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail',
        },
        value: '',
        label: 'Email',
        rules: {
          required: true,
          minLength: 8,
          maxLength: 30,
          isEmail: true
        },
        isValid: true,
        errorMsg: "REQUIRED!! And should be a valid email address",
        touched: false,
      },
      contactNumber: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'Your Contact No.',
        },
        value: '',
        label: 'Contact Number',
        rules: {
          required: true,
          minLength: 8,
          maxLength: 15,
          isNumeric: true
        },
        isValid: true,
        errorMsg: "REQUIRED!! And should be between 8-15 characters",
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
      password2: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Confirm password',
        },
        value: '',
        label: 'Confirm Password',
        rules: {
          required: true,
          confirmPassword: true
        },
        isValid: true,
        errorMsg: "Must be same as above password",
        touched: false,
      },

      registeringAs: {
        elementType: 'select',
        elementConfig: {
          option: [
            {value: '', displayValue: 'select'},
            {value: 'Buyer', displayValue: 'Buyer'},
            {value: 'Seller', displayValue: 'Seller'},
          ]
        },
        value: '',
        label: 'Registering As',
        touched: false,
        isValid: false,
        rules: {
          required: true,
        }
      },
      acceptPrivacy: {
        elementType: 'input',
        elementConfig: {
          type: 'checkbox',
        },
        value: '',
        label: 'Accept Privacy policy',
        checked: false,
        rules: {
          required: true,
        },
        isValid: true,
        errorMsg: "Please accept the privacy policy to proceed",
        touched: false,
      },
    }
  };

  submitFormHandler = async (event) => {
    event.preventDefault();
    if (this.state.completeFormValidity) {

      let userDataFromState = {};
      for (let key in this.state.formData) {
        userDataFromState[key] = this.state.formData[key].value;
      }
      console.log(userDataFromState)
      const data = new FormData()
      if (this.state.image){
        data.append('file', this.state.image);
      }
      try {
        let res1 = await axios.post("/api/users/image-upload", data);
        if (res1){
          let res2 = await axios.post("/api/users/register",userDataFromState)
          console.log(res1,res2)
        }
      }catch (e) {
        console.log(e)
      }


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
  handleImageSelect = e => {

    console.log(e)
    if (e.target.files && e.target.files[0]) {
      this.setState({image: e.target.files[0]})
      var img = document.querySelector('img');  // $('img')[0]
      img.src = URL.createObjectURL(e.target.files[0]); // set src to file url
      //img.onload = this.imageIsLoaded; // optional onload event listener
    }
  }


  componentDidMount() {
    document.querySelector('input[type="file"]').addEventListener('change', this.handleImageSelect);
  }

  componentWillUnmount() {
    document.querySelector('input[type="file"]').removeEventListener('change', this.handleImageSelect);
  }

  render() {
    let {formData} = this.state;
    console.log(this.state)
    return (
        <div>

          <Form
              title={"Sign up"}
              state={this.state}
              checkValidity={this.checkValidity}
              onChangehandler={this.onChangehandler}
              submitFormHandler={this.submitFormHandler}
          >
            {/* we can also pass this input type file from state as done for others*/}
            <input type='file'/>
            {this.state.image && <img id="myImg" src="#" alt="your image" height="150" width="100"/>}
          </Form>
        </div>

    );
  }
}

export default Register;