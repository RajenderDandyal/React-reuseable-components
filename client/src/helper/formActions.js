import isEmpty from "lodash";

export const Validation = (event, state) => {
  let isValid = true;
  let updatedForm = {
    ...state.formData,
    [event.target.name]: {
      ...state.formData[event.target.name],
      touched: true
    }

  };

  let rules = updatedForm[event.target.name].rules;
  let value = updatedForm[event.target.name].value;

  if (rules.required) {
    /*if (updatedForm[event.target.name].elementType === 'select') {
      console.log("inside select ============")
      isValid = value !== "" && isValid
    } else {
      console.log("inside else ============")
      isValid = value.trim() !== "" && isValid;
    }*/
    if (updatedForm[event.target.name].elementConfig.type === 'checkbox') {
      console.log("value", value)
      isValid = !!(value && updatedForm[event.target.name].touched && isValid);
    } else {
      isValid = value.trim() !== "" && isValid;
    }
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid
  }

  if (rules.isEmail) {
    const pattern = /^\S+@\S+(\.\S+)$/;
    isValid = pattern.test(value) && isValid
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid
  }
  if (rules.confirmPassword) {
    const match = value === state.formData.password.value
    isValid = match && isValid
  }
  /*
    let completeFormShouldBeValid = true;
    for (let id in updatedForm) {
      completeFormShouldBeValid = !!(updatedForm[id].isValid && completeFormShouldBeValid);

    }*/
  updatedForm[event.target.name].isValid = isValid
  return {formData: updatedForm};
};


export const HandleChange = (event, state) => {
  let updatedForm = {
    ...state.formData,
    [event.target.name]: {
      ...state.formData[event.target.name],
      value: event.target.value,
      touched: true
    }

  };

  if (state.formData[event.target.name].elementConfig.type === 'checkbox') {
    updatedForm = {
      ...state.formData,
      [event.target.name]: {
        ...state.formData[event.target.name],
        value: state.formData[event.target.name].elementConfig.type === 'checkbox' ? event.target.checked : event.target.value,
        checked: event.target.checked,
        touched: true
      }

    }
  }

  /*let completeFormShouldBeValid = true;
  for (let id in updatedForm) {
    completeFormShouldBeValid = !!(updatedForm[id].isValid  && updatedForm[id].touched && completeFormShouldBeValid);
  }*/
  return {formData: updatedForm};
};

export const AddSelectOptions = (data, state, category) => {
  let updatedFormData = {...state.formData}
  let newOptions = [...state.formData[category].elementConfig.option];

  data.forEach(item => newOptions.push({value: item._id, displayValue: item.name}))

  updatedFormData[category].elementConfig.option = newOptions;

  return {formData: updatedFormData}
}

export const ClearFields = (state) => {
  let updatedFormData = {...state.formData};
  for (let key in updatedFormData) {
    if (key === 'images') {
      updatedFormData[key].value = [];
    }
    updatedFormData[key].value = "";
  }
  return {
    formData: updatedFormData,
    completeFormValidity: false,
    succfromServer: true
  }
}