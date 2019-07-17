import React from "react";
import  "./toast.scss";
/*
* <Toast
         level={this.state.level} "success" "danger" "warning"
         message={this.state.message}
         visible={this.state.showToast}
          />
     */
class Toast extends React.Component {
  state = {
    visible: false
  };

  getIcon() {
    switch (this.props.level) {
      case 'warning':
        return 'http://svgshare.com/i/19x.svg'
      case 'danger':
        return 'http://svgshare.com/i/19E.svg'
      case 'success':
        return 'http://svgshare.com/i/19y.svg'
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible) {
      this.setState({
        visible: nextProps.visible
      })
    }
  }

  render() {
    let classes = `toast ${this.props.level} `
    classes += this.state.visible ? 'visible' : ''
    return (
        <div className={classes}>
          <figure>
            <img src={this.getIcon()}/>
          </figure>
          <p>{this.props.message}</p>
        </div>
    )
  }

}



export default Toast;