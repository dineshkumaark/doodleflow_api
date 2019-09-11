import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { listScreens } from '../store/action/projectActions'
import img from '../assets/images/download.png';

class ScreenDetails extends Component {
    state = {
        id: this.props.id,
        data: {},
    }

    componentDidMount() {
        const { id } = this.state;
        this.props.listScreens(id)
            .then(res => {
                this.setState({ data: res.data })
                // console.log(res)
            })
            .catch(err => console.log(err))
    }

    render() {
        const { screens } = this.state.data;
        return (
            <div className="container-fluid px-5 screen-list pb-5">
                <h3 className="h3 text-center">Your Screens</h3>
                <div className="d-flex mt-5">
                    {(screens) ? (screens.length >= 1) ? (
                        screens.map((screen, index) => (
                            <div className="card mr-4" key={index}>
                                <div className="hover-details p-3"><p className="mx-auto text-white">{screen.screenName}</p></div>
                                <img src={img} className="card-img-top" alt={screen.screenName} title={screen.screenName} />
                            </div>
                        ))
                    ) : <h6 className="h6 mx-auto">No Screens to Display</h6> : <h6 className="h6 mx-auto">No Screens to Display</h6>}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        listScreens,
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(ScreenDetails);