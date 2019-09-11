import React, { Component } from 'react';
import Navbars from './Navbar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserDetails } from '../store/action/userActions';
import { listProjects } from '../store/action/projectActions';
import img from '../assets/images/download.png';

class Lists extends Component {
    state = {
        name: '',
        data: '',
        logOut: false,
        modals: false,
        data: {},
        display: false
    }

    cardDetails = (item) => {
        this.props.history.push(`/projects/${item._id}`);
    }

    logOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        window.location.reload();
    }

    componentDidMount() {
        const { user, listProjects } = this.props;
        user()
            .then(res => {
                const { data } = res;
                localStorage.setItem('name', data.firstName);
                this.setState({ data, name: data.firstName });
            })
            .catch(err => console.log(err))
        listProjects()
            .then(res => {
                if (res.data.items.length >= 1) {
                    this.setState({ display: true, data: res.data })
                }
                // console.log(res.data);
            })
            .catch(err => console.log(err))
    }

    render() {
        const { name, display } = this.state;
        const { items } = this.state.data;
        return (
            <React.Fragment>
                <Navbars name={name} logOut={this.logOut} toggle={this.toggle} brand={'doodleflow.io'} btn={true} />
                {display ? (
                    <div className="container-fluid mt-4 px-5">
                        <h6 className="h6 font-weight-normal mb-4">Projects</h6>
                        <div className="d-flex">
                            {items.map((item) => (
                                <div className="card mr-4" onClick={() => this.cardDetails(item)}
                                    key={item._id}>
                                    {/* {item.count >= 1 ? (
                                        item.screens.map((screen) => (
                                            <img src={screen.image} alt="ok" />
                                        ))
                                    )
                                        : <img src={img} alt="ok" />} */}
                                    <img src={img} alt={item.projectName} title={item.projectName} />
                                    <div className="card-body">
                                        <small className="h6">{item.projectName}</small>
                                        <div className="industry">
                                            <small className="text-muted text-uppercase">{item.industry}</small> |
                                            <small className="text-muted text-uppercase"> {item.count} Screens </small>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                ) : <div className="container-fluid px-5">
                        <h4 className="h4 mt-5 text-center">No Projects Yet</h4>
                    </div>}
            </React.Fragment>

        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        user: getUserDetails,
        listProjects,
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(Lists);