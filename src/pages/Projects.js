import React, { Component } from 'react';
import Navbars from '../components/Navbar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { projectDetails, uploadScreens } from '../store/action/projectActions';
import ScreenDetails from '../components/ScreenDetails';

class Projects extends Component {
    state = {
        data: {},
        file: '',
        name: true,
        fileName: 'Choose Screen'
    }

    handleInput = e => {
        const files = e.target.files[0]
        this.setState({
            file: files,
            fileName: files.name
        })
    }

    onsubmit = e => {
        e.preventDefault();
        const { file } = this.state;
        const formData = new FormData();
        formData.append('screens', file);
        formData.append('type', 'mobile');
        formData.append('projectId', this.props.match.params.id);

        this.props.uploadScreens(formData)
            .then(res => {
                window.location.reload();
            })
            .catch(err => console.log(err))

        this.setState({ fileName: 'Choose Screen' })
    }

    logOut = () => {
        localStorage.removeItem('token');
        this.setState({ name: false })
        localStorage.removeItem('name');
        // this.props.history.push('/');
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.projectDetails(id)
            .then(res => {
                this.setState({ data: res.data });
            })
            .catch(err => console.log(err))
    }

    render() {
        const { projectName } = this.state.data;
        if (!this.state.name) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <Navbars name={localStorage.getItem('name')} logOut={this.logOut} toggle={this.toggle} brand={(projectName) ? `< ${projectName}` : ''} btn={false} />
                <form className="screen app-container text-center p-4" onSubmit={this.onsubmit}>
                    <h6 className="h4 mb-4">Upload your screens</h6>
                    <div className="custom-file app-file mr-4 text-left">
                        <input type="file"
                            className="custom-file-input"
                            id="customFile"
                            onChange={this.handleInput}
                        />
                        <label className="custom-file-label" htmlFor="customFile">{this.state.fileName}</label>
                    </div>
                    <button type="submit" className="btn btn-primary mt-2 px-4 py-2">Upload</button>
                    <br />
                    <small className="text-muted pt-5">*Image should be less than 2MB*</small>
                </form>
                <ScreenDetails id={this.props.match.params.id} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        projectDetails,
        uploadScreens
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(Projects);
