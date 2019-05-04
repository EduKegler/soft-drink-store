import React from 'react';
import './App.css';
import SoftDrinksStore from '../store/softDrinksStore'
import Loader from 'react-loader-spinner'
import { connect } from 'react-redux';

function App(props) {
  return (
    <div className="container">
      <SoftDrinksStore></SoftDrinksStore>
      {props.loader ? loader() : null}
    </div>
  );
}

// Loader para ser usado quando o programa fizer uma requisição
export const loader = () => {
  return (<div className="loader">
    <div className="svg">
      <Loader type="RevolvingDot"
        color="#00BFFF"
        height="100"
        width="100" >
      </Loader>
    </div>
  </div>)
}

const mapStateToProps = state => ({ loader: state.loaderState.loader });
export default connect(mapStateToProps)(App);

