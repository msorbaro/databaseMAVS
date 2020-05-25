/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './companies.scss';
import {  addCompany } from '../Actions';
import './addCompany.scss';


class AddCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {field: '', name:'', size: ''};
  }


  nameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  fieldChange = (event) => {
    this.setState({ field: event.target.value });
  }

  sizeChange = (event) => {
    this.setState({ size: event.target.value });
  }

  submit = () => {
    const fields = {
      name: this.state.name,
      size: this.state.size,
      field: this.state.field,
    }
    this.props.addCompany(fields, this.props.history);
  }

  render() {
    return (
      <div className="content">
        <p> add a company </p>
        <p> company name </p>
        <input className="login-text-box" onChange={this.nameChange} value={this.state.name} />
        <p> company size </p>
        <input className="login-text-box" type="number" onChange={this.sizeChange} value={this.state.size} />
        <p> company field </p>
        <input className="login-text-box" onChange={this.fieldChange} value={this.state.field} />
        <button type="button" onClick={this.submit}> submit </button>
      </div>
    );
  }
}



export default withRouter(connect(null, {addCompany})(AddCompany));
