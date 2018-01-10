import React, {Component} from 'react';
import './App.css';
import CityInput from './components/CityInput';
import RadiusInput from './components/RadiusInput';
import GoogleMap from './components/GoogleMap';
import RestaurantDetail from './components/RestaurantDetail';
import Table from './components/Table';

class App extends Component {
    constructor() {
        super();
        this.state = {
            city: "Knysna",
            radius: 5000,
            geocoder: {},
            map: {},
            marker: {},
            circle: {}
        };
    }

    updateCity = (city = this.state.city) => {
        this.setState({city});
        this.googleCodeAddress(city, this.state.radius);
        this.setState({geocoder: new window.google.maps.Geocoder()});
    };
    updateRadius = (radius = this.state.radius) => {
        this.setState({radius});
        this.googleCodeAddress(this.state.city, radius);
        this.setState({geocoder: new window.google.maps.Geocoder()});
    };

    googleInitMap = () => {
        this.setState({geocoder: new window.google.maps.Geocoder()});
        this.setState({
            map: new window.google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: {lat: -33.924868, lng: 18.424055},
                disableDoubleClickZoom: true,
            })
        });
    };


    googleCodeAddress = (location, radius) => {
        this.setState({
            geocoder: this.state.geocoder.geocode({'address': location}, (results, status) => {
                if (status === 'OK') {
                    this.state.map.panTo(results[0].geometry.location);

                    if (this.state.circle && this.state.circle.setMap) {
                        this.state.circle.setMap(null);
                    }
                    /*this.setState({
                        marker: new window.google.maps.Marker({
                            map: this.state.map,
                            position: results[0].geometry.location,
                            draggable: true,
                            opacity: 0.5
                        })
                    });*/


                    this.setState({
                        circle: new window.google.maps.Circle({
                            strokeColor: '#09c2ff',
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: '#00f1ff',
                            fillOpacity: 0.05,
                            map: this.state.map,
                            center: results[0].geometry.location,
                            radius: parseInt(radius),
                            editable: true,
                            draggable: true
                        })
                    });

                    this.state.circle.addListener('radius_changed', () => {
                        this.setState({radius: this.state.circle.getRadius()});
                    });

                    this.state.circle.addListener('center_changed', () => {
                        this.setState({city: this.state.circle.getCenter().lat() + ', ' + this.state.circle.getCenter().lng()});
                    });

                    this.state.circle.addListener('dragend', () => {
                        this.updateCity();
                    });

                    this.state.map.addListener('dblclick', (e) => {
                        this.setState({city: e.latLng.lat() + ', ' + e.latLng.lng()});
                        this.state.circle.setCenter({lat: e.latLng.lat(), lng: e.latLng.lng()});
                        this.updateCity();
                    });

                    this.state.circle.addListener('dblclick', (e) => {
                        this.setState({city: e.latLng.lat() + ', ' + e.latLng.lng()});
                        this.state.circle.setCenter({lat: e.latLng.lat(), lng: e.latLng.lng()});
                        this.updateCity();
                    });
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            })
        });
    };


    render() {
        return (
            <div className="App">
                <CityInput updateCity={this.updateCity} />
                <RadiusInput updateRadius={this.updateRadius} />
                <GoogleMap googleInitMap={this.googleInitMap} updateRadius={this.updateRadius} location={this.state.city} marker={this.state.marker} radius={this.state.radius} />
                <RestaurantDetail />
                <Table />
            </div>
        );
    }
}

export default App;
