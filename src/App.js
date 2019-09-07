import React from 'react';
import logo from './logo.svg';
import './App.css';
import {createStore} from 'redux'
import {connect, Provider} from 'react-redux'
import hotelList from './hotel'


const initialState = {
    hotelList: hotelList,
    dropDown: !true,
    filterList: ''
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FILTER_LIST':
            return {...state, filterList: action.amount};
        case 'TOGGLE_DROPDOWN':
            return {...state, dropDown: action.amount};
        default:
            return state;
    }
}

const store = createStore(reducer, initialState);

const filterList = (amount) => {
    return {
        type: 'FILTER_LIST',
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
        this.filterList = this.filterList.bind(this);
    }

    componentDidMount() {
        store.subscribe(() => {
            this.forceUpdate()
        })
    }

    showDropDown() {
        store.dispatch(ToggleDropDown(Boolean(this.text.value)));
        this.filterList();
    }

    filterList(){
        store.dispatch(filterList(this.text.value.toLowerCase()))
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
        if(this.props.dropDown){
            return (
                <div>{this.props.hlList.map((item, index) =>
                    <div key={item.id}>
                        <span>{item.location.cachedData.country} -</span>
                        <span>{item.name}</span>
                    </div>
                )}
                </div>
            )
        }else return null
    }
}


const mapStateToProps = (state) =>{
    return{
        dropDown: state.dropDown,
        hlList: state.hotelList.filter(hotelList => {return hotelList.name.toLowerCase().includes(state.filterList) || hotelList.location.cachedData.country.toLowerCase().includes(state.filterList)})
    }
};

const WrapComponent = connect(mapStateToProps)(DropDown);

export default App;
