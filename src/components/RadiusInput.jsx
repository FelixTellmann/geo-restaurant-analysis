import React, {Component} from 'react';

class RadiusInput extends Component {

    render() {
        return (
            <form className="RadiusInput" onSubmit={(e) => {
                e.preventDefault();
                this.props.updateRadius(this.radius.value);
            }}>
                <label htmlFor="RadiusInput__City" className="RadiusInput__label">Radius for Restaurant Search</label>
                <input ref={(input) => { this.radius = input; }} id="RadiusInput__City" type="number" className="RadiusInput__input" placeholder="Distance in meter" />
                <button type="submit" className="RadiusInput__button">Submit</button>
            </form>
        );
    }
}

export default RadiusInput;