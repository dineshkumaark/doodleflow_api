import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody
} from 'reactstrap';
import Forms from './Forms';

class Navbars extends Component {
    state = {
        modal: false
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <React.Fragment>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/" className="px-4">{this.props.brand}</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        {this.props.btn ? <button type="button" className="btn btn-primary mr-4" onClick={this.toggle}>Add Project</button> : ''}
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret className="text-light">
                                {this.props.name ? this.props.name : ''}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={this.props.logOut}>
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Navbar>
                <Modal isOpen={this.state.modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
                    toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Create Project</ModalHeader>
                    <ModalBody>
                        <Forms toggle={this.toggle} />
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Navbars;