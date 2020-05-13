import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import '../style.css';
import logo from '../img/logo.png';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.items = [
      'Microsoft',
      'Google',
      'Bain',
      'Salesforce',
      'Square',
    ];
    this.state = {
      companies: [],
      text: '',
    };
  }

  onTextChanged = (e) => {
    const { value } = e.target;
    let companies = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      companies = this.items.sort().filter((v) => regex.test(v));
    }
    this.setState(() => ({ companies, text: value }));
  }

  companySelected(value) {
    this.setState(() => ({
      text: value,
      companies: [],
    }));
  }

  renderCompanies() {
    const { companies } = this.state;
    if (companies.length === 0) {
      return null;
    }
    return (
      <ul className="CompaniesList">
        {companies.map((item) => <li className="dropDown" onClick={() => this.companySelected(item)}>{item}</li>)}
      </ul>
    );
  }

  render() {
    const { text } = this.state;
    return (
      <div className="homeInput">
        <img className="logo" src={logo} alt="logo" />
        <h1>Bread Box</h1>
        <h2>Recommendations and reviews of jobs from our Dartmouth community.</h2>
        <input className="mainSearchBar" placeholder="Search for jobs..." value={text} onChange={this.onTextChanged} type="text" />
        {this.renderCompanies()}
      </div>
    );
  }
}

export default withRouter(connect(null)(HomePage));
