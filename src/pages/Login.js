import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { loginUser } from '../store/action/userActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

class Login extends Component {
    state = {
        userName: '',
        password: '',
        visible: false,
        logged: false
    }
    onError = (message) => toast.error(message, {
        position: toast.POSITION.TOP_RIGHT
    });

    onSuccess = (message) => toast.success(message, {
        position: toast.POSITION.TOP_RIGHT
    });

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onLogin = e => {
        e.preventDefault();
        const { userName, password } = this.state;
        const user = { userName, password };
        this.props.login(user)
            .then(data => {
                this.onSuccess(data.message)
                const { token } = data.data;
                localStorage.setItem('token', token);
                window.location.replace('/user');
            })
            .catch(err => {
                this.onError(err.message)
            })
        // Clear Input Fields
        this.setState({
            userName: '',
            password: ''
        })

    }

    onDismiss = () => {
        this.setState({ visible: false });
    }

    render() {
        const { userName, password } = this.state;
        if (localStorage.getItem('token')) {
            return <Redirect to="/user" />
        }
        return (
            <div className="container">
                <h3 className="h3 p-5 text-center">Login</h3>
                <form className="app-container" onSubmit={this.onLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            onChange={this.handleInput}
                            value={userName}
                            name="userName"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            onChange={this.handleInput}
                            value={password}
                            name="password"
                            placeholder="Password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-2 px-4">Submit</button>
                    <Link to='/signup' className="btn btn-link mt-2 ml-4 px-4">Create Account ></Link>
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

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        login: loginUser
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);