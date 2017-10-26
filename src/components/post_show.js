import React, { Component } from 'react';
import { connect } from "react-redux";
import { showSinglePost, deletePost} from '../actions/index';

import _ from 'lodash';
import { Field, reduxForm } from 'redux-form'
//import {createPost} from '../actions';
// if we import a single function from a file it has to be in curly braces - destructing
// import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import {Link}  from 'react-router-dom'

class PostShow extends Component {
  constructor(props) {
    super(props) 

    this.state = {srcTable: []}
    this.state = {playersCount: 0}
    this.state = {playersScore: []}
    this.state = {playerTurn: 1}
    this.state = {whell_running: false}
    this.state = {angle: 0}
    this.state = {chooseArea: true}
    this.state = {discoveredLetter: []}
    this.state = {discoveredLetterCount: 0}
    this.state = {area: 'none'}
  }

componentWillMount() {
  const { post } = this.props;
  var tmp = []
  var tmp2 = []
  var playerCount = 5
  
  for (var i = 0; i < post.content.length; i++) {
      if(post.content[i] != ' ') {
        tmp.push("../../image/letters/question_mark.png")
      } else {
        tmp.push("../../image/letters/space.png")
      }
  }

  for (var j = 0; j < playerCount ; j++) {
      tmp2.push(0)
  }

  this.setState({srcTable: tmp,
                   playersCount: playerCount,
                   playersScore: tmp2,
                   playerTurn: 1,
                   whell_running: false,
                   angle: 0,
                   chooseArea: true,
                   discoveredLetter: [],
                   discoveredLetterCount: 0,
                   area: 'none'})
}

componentDidMount() {
    const {id} = this.props.match.params;
    // get the id from the params object which is provide by react router by itself
    this.props.showSinglePost(id);
}

onDeleteClick() {
    const {id} = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    })
}

getChoice(angle) {

    let tmp = '';

    switch(Math.floor((360 + (360/42) - angle) / (360/21))) {
      case 0: tmp = '2500'; break;
      case 1: tmp = '100'; break;
      case 2: tmp = '550'; break;
      case 3: tmp = '900'; break;
      case 4: tmp = '200'; break;
      case 5: tmp = '600'; break;
      case 6: tmp = 'bankrupt'; break;
      case 7: tmp = '800'; break;
      case 8: tmp = '750'; break;
      case 9: tmp = '500'; break;
      case 10: tmp = 'prize'; break;
      case 11: tmp = '300'; break;
      case 12: tmp = '700'; break;
      case 13: tmp = '450'; break;
      case 14: tmp = '150'; break;
      case 15: tmp = '650'; break;
      case 16: tmp = '400'; break;
      case 17: tmp = 'lose turn'; break;
      case 18: tmp = '350'; break;
      case 19: tmp = '150'; break;
      case 20: tmp = '200'; break;
      case 21: tmp = '2500'; break;
      default: tmp = 'error'; break;
    }

    return tmp; 
}

handleSpecialArea(choice) {

  if(choice == 'bankrupt') {
    let scoreTable = this.state.playersScore;
    scoreTable [this.state.playerTurn - 1] = 0;
    this.setState({playersScore: scoreTable});
    this.setState({chooseArea: true});
    this.setState({playerTurn: (this.state.playerTurn % this.state.playersCount) + 1});
  }

  if(choice == 'lose turn') {
    this.setState({chooseArea: true});
    this.setState({playerTurn: (this.state.playerTurn % this.state.playersCount) + 1});
  }

  if(choice == 'prize') {
    let scoreTable = this.state.playersScore;
    scoreTable [this.state.playerTurn - 1] = scoreTable [this.state.playerTurn - 1] + 1000;
    this.setState({playersScore: scoreTable});
    this.setState({chooseArea: true});
    this.setState({playerTurn: (this.state.playerTurn % this.state.playersCount) + 1});
  }
}

refresh = (param) => {
  setTimeout(function() {
    this.setState({angle: ((this.state.angle + param) % 360)});
    if(param > 0.15)
      this.refresh(param * 0.96);
    else {
      this.setState({whell_running: false});
      this.setState({area: this.getChoice(this.state.angle)});
      this.setState({chooseArea: false});
      this.handleSpecialArea(this.getChoice(this.state.angle));
    }
  }.bind(this), 100);
}

onRunClick() {

  if((this.state.whell_running == false) && (this.state.chooseArea == true)) {
    var pow = 20 * Math.random() + 5;
    this.setState({whell_running: true});
    this.refresh(pow);
  }
}

getCountLetterToDiscover(content) {
  let count = 0;

  for(var i = 0; i < content.length; i++) {
      if(content[i] != ' ')
          count++;
  }

  return count;
}

isLetterDiscovered(letter) {
  var tmp = []
  let is = false;
  tmp = this.state.discoveredLetter;
  for(var i = 0; i < tmp.length ; i++) {
      if(tmp[i] == letter) {
        is = true;
        i = tmp.length;
      }
  }
  return is;
}

onSubmit(values) {

  const { post } = this.props;
  var tmp = []
  var changes = 0
  tmp = this.state.srcTable

  if((this.state.whell_running == false) && (this.state.chooseArea == false) && (values.check.toLowerCase().length > 0)) {

    if((values.check.toLowerCase().length > 1) || (this.isLetterDiscovered(values.check.toLowerCase()) == false)) {
      
      if(values.check.toLowerCase().length == 1) {
          let table = []
          table = this.state.discoveredLetter;
          table.push(values.check.toLowerCase());
          this.setState({discoveredLetter: table});
      }

      if(post.content.toLowerCase() == values.check.toLowerCase()) {
        changes = this.getCountLetterToDiscover(post.content) - this.state.discoveredLetterCount;
          for (var i = 0; i < post.content.length; i++) {
            if(post.content[i] != ' ') {
              tmp[i] = "../../image/letters/letter_" + post.content[i].toLowerCase() + ".png"
          }
        }
      } else {

        for (var i = 0; i < post.content.length; i++) {
          if(post.content[i].toLowerCase() == values.check.toLowerCase()) {
            changes = changes + 1;
            tmp[i] = "../../image/letters/letter_" + post.content[i].toLowerCase() + ".png"
          }
        }
      }

      values.check = ''
      if(changes > 0) {
        var scoreTable = this.state.playersScore;
        var count = 0;
        scoreTable [this.state.playerTurn - 1] = scoreTable [this.state.playerTurn - 1] + changes * Number(this.state.area);
        this.setState({playersScore: scoreTable}); 
        this.setState({srcTable: tmp});
        count = this.state.discoveredLetterCount + changes;
        this.setState({discoveredLetterCount: count});
        values.msg = 'great: ' + changes + ' letters'
      } else {
        values.msg = 'fail'
      }

      if((this.state.discoveredLetterCount + changes) == this.getCountLetterToDiscover(post.content)) {
        // koniec gry
        values.msg = 'finish'
        this.setState({whell_running: true});
        this.setState({chooseArea: true});
      } else {
        this.setState({playerTurn: (this.state.playerTurn % this.state.playersCount) + 1});
      }
      this.setState({chooseArea: true});
    } else {
      values.msg = 'the letter was already choosen';
    }
  } else {
    if((this.state.whell_running == false) && (this.state.chooseArea == false) && (values.check.toLowerCase().length > 0)) {
      if(values.check.toLowerCase().length == 0)
        values.msg = 'put the letter';
      else
        values.msg = 'wait';
    }
  }
}

createScoreTable() {
  var rows = [];
  for (var i = 0; i < this.state.playersCount ; i++) {
    rows.push(<h5>Player {i + 1} score: {this.state.playersScore[i]}</h5>);
  }
  return rows;
}

createTable(content) {
  var rows = [];
  for (var i = 0; i < content.length; i++) {
    if(content[i] != ' ') {
      rows.push(<Field
          name = {"check" + i}
          component = {this.renderCoverLetter.bind(this)} />)
      } else {
      rows.push(<Field
          name = {"check" + i}
          component = {this.renderSpace.bind(this)} />)
    }
  }
  return rows;
}

createKeyboardTable(content) {
  var rows = [];
  for (var i = 0; i < content.length; i++) {
    if(content[i] != ' ') {
      rows.push(<Field
          name = {"check" + i}
          component = {this.renderCoverLetter.bind(this)} />)
      }
  }
  return rows;
}

renderCoverLetter(field) {
    return (
      <div className="row" style={{width: 6 + 'em', display:'block', float: 'left'}}>
        <img className="card-img-top" src={this.state.srcTable[Number(field.input.name.substring(5, 7))]} alt="Card image cap"/>
      </div>
    )
}

renderSpace(field) {
    return (
      <div className="row" style={{width: 6 + 'em', display:'block', float: 'left'}}>
        <img className="card-img-top" src={this.state.srcTable[Number(field.input.name.substring(5, 7))]} alt="Card image cap"/>
      </div>
    )
}

renderField(field) {
    return (
      <div className="row" style={{width: 6 + 'em', display:'block', float: 'left'}}> 
        <input className="form-control"
          type="text" style={{width: 6 + 'em'}}
          {...field.input}
        />
      </div>
    )
}

  render() {
    const { post } = this.props;
    const {handleSubmit} = this.props

    if (!post) {
        return <div>Loading...</div>
    }
    
    return (
    <div style = {{position: 'absolute'}}>
        <Link to="/">Back to list</Link>
        <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}>Delete Post</button>
          <h5>Title: { post.title }</h5>
          <h6>Categories: {post.categories}</h6>
          <div>
          <form onSubmit = { handleSubmit(this.onSubmit.bind(this)) }>
          { this.createTable(post.content) }
          <Field
          name = "msg"
          component = { this.renderField }
          />
          <Field
          name = "check"
          component = { this.renderField }
        />
        <button type="submit" className="btn btn-primary">Check</button>
        </form>
    </div>
      <div className = "row" style = {{flexDirection: 'column', margin: '40px 200px 0px',
      alignItems: 'center', display:'block', float: 'left'}}>
        { this.createScoreTable() }
      </div>
      <div className = "row" style = {{flexDirection: 'column', margin: '40px 200px 0px',
      alignItems: 'center', display:'block', float: 'left'}}>
        <h4>Turn: Player {this.state.playerTurn}</h4>
        <h4>Area: {this.state.area}</h4>
        <img className = "card-img-top" src = "../../image/arrow.png" alt = "Card image cap"
        style = {{margin: '0px auto 7px', display:'block'}}/>
        <img className = "card-img-top" src = "../../image/whell.png" alt = "Card image cap"
        style = {{margin: '0px auto', display:'block', transform: 'rotate(' + this.state.angle + 'deg)'}}/>
      </div>
      <button className = "btn btn-danger pull-xs-right" onClick = {this.onRunClick.bind(this)}>Run</button>
    </div>
    );
  }
}

//helpers functions

function mapStateToProps({ posts }, ownProps) {
  return {
    post: posts[ownProps.match.params.id]
  }
}

export default reduxForm({
  form: 'CheckLetter'
})(
  connect(mapStateToProps, {showSinglePost, deletePost })(PostShow)
);