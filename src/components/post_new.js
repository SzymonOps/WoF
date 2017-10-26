import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchPosts } from '../actions/index';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form'
import {createPost} from '../actions';
// if we import a single function from a file it has to be in curly braces - destructing
// import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import {Link}  from 'react-router-dom'

class PostNew extends Component {
  constructor(props){
    super(props)
  }


renderField(field) {
    const { meta: {touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className}> 
      <label>{field.label}</label>
        <input className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    )
} 

 onSubmit(values) {
    this.props.createPost(values, ()=>{
      this.props.history.push('/');
    })
  }

  render() {
    const {handleSubmit} = this.props
    return (
    <div>
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          name="title"
          label="Title For Post" 
          component={this.renderField}
        />
        <Field
          name="categories" 
          label="Categories"
          component={this.renderField}
        />
        <Field
          name="content" 
          label="Post Content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
    </div>
    );
  }
}

//helpers functions

function validate(values){
  const error = {}
  if (!values.title) {
    error.title = "enter the title that is at least 3 characters"
  }
  if (!values.categories) {
    error.categories = "enter the categories"
  }
  if (!values.content) {
    error.content = "enter the content"
  }
  return error;
}


export default reduxForm({
  validate,
  form: 'PostNewForm'
})(
  connect(null, {createPost})(PostNew)
);

//this is some deep wierd shit!


