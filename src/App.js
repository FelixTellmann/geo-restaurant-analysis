import React, {Component} from 'react';
import './App.css';
import CityInput from './components/CityInput'
import Map from './components/Map'
import RestaurantDetail from './components/RestaurantDetail'
import Table from './components/Table'

class App extends Component {
    render() {
        return (
            <div className="App">
                <CityInput />
                <Map />
                <RestaurantDetail />
                <Table />
            </div>
        );
    }
}

export default App;
