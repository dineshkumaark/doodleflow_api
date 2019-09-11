import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createProject, listIndustries } from '../store/action/projectActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

class Forms extends Component {
    state = {
        projectName: '',
        description: '',
        industry: '',
        fontUsed: '',
        list: []
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onError = (message) => toast.error(message, {
        position: toast.POSITION.TOP_RIGHT
    });

    onSuccess = (message) => toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,

    });

    onAddProject = e => {
        e.preventDefault();
        const { projectName, description, industry } = this.state;
        const data = { projectName, description, industry };
        console.log(data);
        // Clear Fields
        this.setState({
            projectName: '',
            description: '',
            industry: '.',
            fontUsed: ''
        });
        this.props.addProject(data)
            .then(res => this.onSuccess(res.message))
            .catch(err => this.onError(err.message))
        this.props.toggle();
        window.location.reload();
    }

    componentDidMount() {
        this.props.list()
            .then(res => {
                const { data } = res;
                this.setState({
                    list: data
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        const { projectName, description, fontUsed, list } = this.state;
        return (
            <div className="container">
                <form onSubmit={this.onAddProject}>
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            id="ProjectName"
                            name="projectName"
                            onChange={this.handleInput}
                            value={projectName}
                            placeholder="Project Name"
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input type="text"
                                className="form-control"
                                id="fontUsed"
                                name="fontUsed"
                                onChange={this.handleInput}
                                value={fontUsed}
                                placeholder="Fonts used"
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <select id="industry" className="form-control" name="industry" onChange={this.handleInput}>
                                <option selected disabled value=".">Choose Industry</option>
                                {list.map((list) => (
                                    <option value={list._id} key={list._id}>{list.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            name="description"
                            placeholder="Description"
                            onChange={this.handleInput}
                            value={description}
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary mr-4">Add Project</button>
                    {' '}<button type="button" className="btn btn-secondary" onClick={this.props.toggle}>Cancel</button>
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

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        addProject: createProject,
        list: listIndustries
    }, dispatch)
}



export default connect(null, mapDispatchToProps)(Forms);