import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Lists from '../components/Lists';

class User extends Component {

    render() {

        if (!localStorage.getItem('token')) {
            return <Redirect to="/" />
        }

        return (
            <Lists history={this.props.history} />
        )
    }
}



export default User;