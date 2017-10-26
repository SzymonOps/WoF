import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PostIindex from './components/post_index';
import reducers from './reducers';
import promise from 'redux-promise';
import PostNew from './components/post_new';
import PostShow from './components/post_show';
import thunk from 'redux-thunk'


const createStoreWithMiddleware = applyMiddleware(thunk, promise)(createStore);
// take a look at this a bit closer


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
   <BrowserRouter>
      <div>
        <Switch>
          <Route path="/post/new" component={PostNew} />
          <Route path="/post/:id" component={PostShow} />
          <Route path="/" component={PostIindex} />
        </Switch>
      </div>
   </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
