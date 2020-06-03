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

    this.state = {fieldsError: false, field: '', name:'', size: ''};
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
    if ((this.state.name === '' || this.state.size === '' || this.state.field === '') === false) {
      this.props.addCompany(fields, this.props.history);
    } else {
      this.setState({fieldsError: true});
    }
  }

  sizeDropdown = () => {
    return (
      // mysql requiring int
      <select id="addcompany-select" value={this.state.size} onChange={this.sizeChange}>
        <option value="15"> 0-15 people </option>
        <option value="200"> 16-200 people </option>
        <option value="500"> 201-500 people </option>
        <option value="1000"> 501-1000 people </option>
        <option value="3000"> 1001-3000 people </option>
        <option value="1000"> 3001-5000 people </option>
        <option value="50000"> 5000+ people </option>
      </select>
    );
  }

  render() {
    var error = this.state.fieldsError ? <p> PLEASE FILL ALL FIELDS </p> : null;
    return (
      <div>
        <h1 className= "add-a-company"> Add a Company </h1>
        <div className="company-content">
          {error}
          <p className="company-input-name"> Company Name: </p>
          <input className="company-text-box" onChange={this.nameChange} value={this.state.name} />
          <p className="company-input-name"> Company Size: </p>
          {this.sizeDropdown()}
          <p className="company-input-name"> Company Field: </p>
          <input className="company-text-box" onChange={this.fieldChange} value={this.state.field} />
          <div>
            <button className="submit-company" type="button" onClick={this.submit}> submit </button>
          </div>
        </div>
      </div>
    );
  }
}



export default withRouter(connect(null, {addCompany})(AddCompany));
