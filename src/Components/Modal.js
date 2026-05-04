import React from "react";
import { Modal, Button } from "react-bootstrap";

class CustomModal extends React.Component {
    state = {
        show: false,
        heading: '',
        btnText:'Save'
    }
    static getDerivedStateFromProps(props, state) {
        return {
            show: props.show,
            heading: props.heading,
            btnText: props.btnText
        };
    }

    render() {
        return (
            <Modal show={this.state.show} className="custom-modal" onHide={() => this.props.closeBtn()}>
                <Modal.Header>
                    <Modal.Title>{this.state.heading}</Modal.Title>
                    <button type="button" class="btn-close" onClick={() => this.props.closeBtn()} ></button>
                </Modal.Header>
                <form onSubmit={this.state.btnText === 'Save'?this.props.onSubmit:this.props.onUpdate}>

                    <Modal.Body>
                        {this.props.children}
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <Button variant="secondary" className="btnClose" onClick={() => this.props.closeBtn()}>
                            Close
                        </Button> */}
                        <Button as="input" type="submit" value={this.state.btnText} />
                    </Modal.Footer>
                </form>
            </Modal>
        )
    }
}

export default CustomModal;