/* eslint-disable */
/*
Tnis is the component that is home and allows the user to search for a specific company
It gets all the companies from the database and uses an autocomplete component
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import '../style.css';
import logo from '../img/logo.png';
import { fetchCompanies } from '../Actions';


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
     loaded: false,
    };
  }

  componentDidMount() {
    this.props.fetchCompanies(() => {
      this.setState({ loaded: true });
    });
  }

  onTextChanged = (e) => {
    var items = [];
    if(this.props.allCompanies!=null){
      for (var i = 0; i< this.props.allCompanies.length; i++){
        items.push(this.props.allCompanies[i].CompanyName);
      }
    }
    const { value } = e.target;
    let companies = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      companies = items.sort().filter((v) => regex.test(v));
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
    if (companies.length === 0 && this.state.text != '') {
      return <li className="dropDown"><Link to={`/addCompany`}>Add a Company</Link></li>;
    }
    else if(companies.length ===0){
      return null;
    }
    return (
      <ul className="CompaniesList">
        {companies.map((item) => <li className="dropDown"><Link to={`/company/${item}`}>{item}</Link></li>)}
      </ul>
    );
  }

  render() {
    //this.props.fetchCompanies();
    const { text } = this.state;
    return (
      <div className="homeInput">
        <img className="logo" src={logo} alt="BreadBoxlogo" />
        <h1>Bread Box</h1>
        <h2>Recommendations and reviews of jobs from our Dartmouth community.</h2>
        <input className="mainSearchBar" placeholder="Search for companies..." value={text} onChange={this.onTextChanged} type="text" />
        {this.renderCompanies()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { allCompanies: state.company.allCompanies };
}

export default withRouter(connect(mapStateToProps, { fetchCompanies })(HomePage));
