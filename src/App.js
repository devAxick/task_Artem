/*
 * Вынеси всю логику redux в отдельную папку
 * Вынеси компонненты отдельно (в 90% случаях следуй принципу "В одном файле 1 компонент")
 * Сделай чтобы список результатов выводился весь сразу, а только потом уже фильтровался
 * если результатов 0 выводи сообщение о том, что ничего не найдено
 */

import React from 'react';
import './App.css';
import { createStore } from 'redux'
import { connect, Provider } from 'react-redux'
import hotelList from './hotel'


const initialState = {
  hotelList: hotelList,
  dropDown: !true, // поменять инициализацию
  filterList: ''
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FILTER_LIST':
      return { ...state, filterList: action.amount };
    case 'TOGGLE_DROPDOWN':
      return { ...state, dropDown: action.amount };
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

const ToggleDropDown = (amount) => {
  return {
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

  filterList() {
    store.dispatch(filterList(this.text.value.toLowerCase()))
  }

  render() {
    return (
      <React.Fragment>
        <input onChange={this.showDropDown} type="text" ref={input => this.text = input}/>
        <Provider store={store}>
          <WrapComponent/>
        </Provider>

      </React.Fragment>
    )
  }
}


class DropDown extends React.Component {
  constructor(props) { // не используй конструктор, если в нем ничего нет
    super(props)
  }

  render() {
    // if(this.props.dropDown){
    //     return (
    //         <div>{this.props.hlList.map((item, index) =>
    //             <div key={item.id}>
    //                 <span>{item.location.cachedData.country} -</span>
    //                 <span>{item.name}</span>
    //             </div>
    //         )}
    //         </div>
    //     )
    // }else return null // весь этот блок можно заменить на такой код, это тоже самое, но гораздо читабельней
    return (
      this.props.dropDown && (
        <div>
          {this.props.hlList.map(item =>
            <div key={item.id}>
              <span>{item.location.cachedData.country} -</span>
              <span>{item.name}</span>
            </div>
          )}
        </div>
      )
    )
  }
}


const mapStateToProps = (state) => {
  return {
    dropDown: state.dropDown,
    hlList: state.hotelList.filter(hotelList => {return hotelList.name.toLowerCase().includes(state.filterList) || hotelList.location.cachedData.country.toLowerCase().includes(state.filterList)}) // не используй тут логику, выноси ее в отдельное место
  }
};

const WrapComponent = connect(mapStateToProps)(DropDown);

export default App;
