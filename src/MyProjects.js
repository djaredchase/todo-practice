// this component is for something work related, not relevant to this Todo App
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import FormCheck from 'react-bootstrap/FormCheck';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

const MyProjects = () => {
    const [show, setShow] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const handleClose = () => {
        setShow(false);
        setModalContent('');
    }
    const handleShow = (projectName) => {
        setModalContent(projectName);
        setShow(true);
    }

    return (
        <div style={{ padding: '10px' }}>
            <Table >
                <thead>
                    <tr>
                        <th><FormCheck /></th>
                        <th>Site # / Switch</th>
                        <th>Site Name</th>
                        <th>Site Type</th>
                        <th>Project #</th>
                        <th>Project Name</th>
                        <th>Project/Sub Type</th>
                        <th>Vendor Turnkey</th>
                        <th>RTI(F) Date</th>
                        <th>Workflow Start Date</th>
                        <th>Workflow Step</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dummyProjects.map((proj, index) => (
                            <tr key={index}>
                                <td><FormCheck /></td>
                                <td>{proj.siteNumber}</td>
                                <td>{proj.siteName}</td>
                                <td>{proj.siteType}</td>
                                <td>{proj.projectNumber}</td>
                                <td>{proj.projectName}</td>
                                <td>{proj.projectType}</td>
                                <td>{proj.vendorTurnkey}</td>
                                <td>{proj.rtifDate}</td>
                                <td>{proj.wfStartDate}</td>
                                <td>{proj.wfStep}</td>
                                <td>
                                    <ButtonGroup size="sm">
                                        <Button>folder</Button>
                                        <Button>eye</Button>
                                        <Button>link</Button>
                                        <Button>Q+</Button>
                                        <Button>flag</Button>
                                        <Button onClick={() => handleShow(proj.projectName)}>
                                            <i>i</i>
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Initiatives</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This modal is dynamically showing content for <b>{modalContent}</b>
                </Modal.Body>
            </Modal>
        </div>
    );
}

const dummyProjects = [
    {
        siteNumber: 12345,
        siteName: 'Dummy Site 1',
        siteType: 'Small Cell',
        projectNumber: 123456,
        projectName: 'Dummy Project 1',
        projectType: 'Initial Build',
        vendorTurnkey: '',
        rtifDate: '',
        wfStartDate: '6/08/2022',
        wfStep: 'Transport Verification - In progress'
    },
    {
        siteNumber: 678910,
        siteName: 'Dummy Site 2',
        siteType: 'Repeater',
        projectNumber: 7891011,
        projectName: 'Dummy Project 2',
        projectType: 'Modification',
        vendorTurnkey: '',
        rtifDate: '',
        wfStartDate: '6/09/2022',
        wfStep: 'Validating Site Info - In progress',
    }
]

export default MyProjects;