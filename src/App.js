import React from 'react';
import logo from './logo.svg';
import './App.css';
import {createStore} from 'redux'
import {connect, Provider} from 'react-redux'
import hotelList from './hotel'


const initialState = {
    hotelList: [hotelList],
    dropDown: true
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SOME_ACTION':
            return state;
        case 'TOGGLE_DROPDOWN':
            return {...state, dropDown: action.amount};
        default:
            return state;
    }
}

const store = createStore(reducer, initialState);

const Increment = (amount) => {
    return {
        type: 'SOME_ACTION',
        amount: `${amount}`
    }
};

const ToggleDropDown = (amount) =>{
    return{
        type: 'TOGGLE_DROPDOWN',
        amount: amount
    }
};

class App extends React.Component {
    constructor(props) {
        super(props);

        this.showDropDown = this.showDropDown.bind(this);
    }

    componentDidMount() {
        store.subscribe(() => {
            this.forceUpdate()
        })
    }

    showDropDown() {
        store.dispatch(ToggleDropDown(Boolean(this.text.value)))
    }

    render() {
        console.log(hotelList);
        return (
            <React.Fragment>
                <input onChange={this.showDropDown} type="text" ref={input => this.text = input}/>
                <Provider store={store}>
                    <WrapComponent />
                </Provider>

            </React.Fragment>
        )
    }
}





class DropDown extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return(
            <div>{

            }
            </div>
        )
    }
}


const mapStateToProps = (state) =>{
    return{
        dropDown: state.dropDown,
        hlList: state.hotelList
    }
};

const WrapComponent = connect(mapStateToProps)(DropDown);

export default App;
