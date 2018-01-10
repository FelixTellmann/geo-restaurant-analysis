import React, {Component} from 'react';

class CityInput extends Component {

    render() {
        return (
            <form className="CityInput" onSubmit={(e) => {
                e.preventDefault();
                this.props.updateCity(this.city.value);
            }}>
                <label htmlFor="CityInput__City" className="CityInput__label">Enter Your City</label>
                <input ref={(input) => { this.city = input; }} id="CityInput__City" type="text" className="CityInput__input" placeholder="City" />
                <button type="submit" className="CityInput__button">Submit</button>
            </form>
        );
    }
}

export default CityInput;