import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { signupUser } from '../store/action/userActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

class SignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        UserName: '',
        password: '',
        visible: false
    }

    onError = (message) => toast.error(message, {
        position: toast.POSITION.TOP_RIGHT
    });

    onSuccess = (message) => toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,

    });

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onDismiss = () => {
        this.setState({ visible: false });
    }

    onSignup = e => {
        e.preventDefault();
        const { UserName, lastName, email, password, firstName } = this.state;
        const newUser = { userName: UserName, lastName, email, password, firstName };
        console.log(newUser);
        this.props.signupUser(newUser)
            .then(data => {
                this.onSuccess(data.message)
                setTimeout(() => {
                    this.props.history.push('/');
                }, 3800);
            })
            .catch(err => {
                console.log(err);
                if (typeof (err.message) === 'string') {
                    this.onError(err.message);
                } else if (typeof (err.message === 'object')) {
                    let { email, userName } = err.message;
                    if (email !== '') {
                        this.onError(err.message.email);
                    } else if (userName !== '') {
                        this.onError(err.message.userName);
                    } else {
                        this.onError('Error');
                    }
                }
            })
        // Clear Input Fields
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            UserName: '',
            password: ''
        })
    }

    render() {
        const { firstName, lastName, email, UserName, password } = this.state;

        if (localStorage.getItem('token')) {
            return <Redirect to="/" />
        }

        return (
            <div className="container">
                <h3 className="h3 p-5 text-center ">Signup</h3>
                <Link to='/' className="h6 font-weight-normal back text-dark"> &lt; Back</Link>
                <form className="app-container" onSubmit={this.onSignup}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="firstname">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstname"
                                name="firstName"
                                onChange={this.handleInput}
                                value={firstName}
                                placeholder="First Name"
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="lastname">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastname"
                                name="lastName"
                                onChange={this.handleInput}
                                value={lastName}
                                placeholder="Last Name"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            onChange={this.handleInput}
                            value={email}
                            placeholder="Enter Email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="UserName">User name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="UserName"
                            name="UserName"
                            onChange={this.handleInput}
                            value={UserName}
                            placeholder="Enter UserName"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            onChange={this.handleInput}
                            value={password}
                            placeholder="Enter Password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3 px-4">Sign in</button>
                </form>
                <ToastContainer
                    autoClose={3000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        err: state.user.err
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        signupUser: signupUser
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);