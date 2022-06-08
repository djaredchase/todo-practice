import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Task from './Task';

function App() {
  const [show, setShow] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false)
    clearForm();
  };
  const handleNewTask = (event) => {
    event.preventDefault();
    const task = {
      title: newTaskTitle,
      description: newTaskDescription,
      status: 'planned'
    };
    const taskArray = [...tasks, task];
    setTasks(taskArray);
    handleClose();
  }
  const handleNewTaskTitle = (event) => {
    setNewTaskTitle(event.target.value);
  }
  const handleNewTaskDescription = (event) => {
    setNewTaskDescription(event.target.value);
  }
  const deleteTask = (index) => {
    const taskArray = [...tasks];
    taskArray.splice(index, 1);
    setTasks(taskArray);
  }
  const clearForm = () => {
    setNewTaskTitle('');
    setNewTaskDescription('');
  }

  return (
    <div className="App">
      <div className='my-heading'>
        <h1 className='todo-title'>Todo App</h1>
        <Button className='add-task-btn' onClick={handleShow}>Add task</Button>
      </div>
      <div className='my-container'>
        <Card className='planned-tasks'>
          <Card.Body>
            <Card.Title>Planned</Card.Title>
            <Card.Text>
              {
                tasks.filter((task) => task.status == 'planned')
                  .map((task, index) => (
                    <Task
                      key={index}
                      index={index}
                      title={task.title}
                      description={task.description}
                      status={task.status}
                      deleteTask={deleteTask}
                    />
                  ))
              }
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className='in-progress-tasks'>
          <Card.Body>
            <Card.Title>In Progress</Card.Title>
            <Card.Text>
              {
                tasks.filter((task) => task.status == 'in progress')
                  .map((task, index) => (
                    <Task
                      key={index}
                      index={index}
                      title={task.title}
                      description={task.description}
                      status={task.status}
                      deleteTask={deleteTask}
                    />
                  ))
              }
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className='completed-tasks'>
          <Card.Body>
            <Card.Title>Completed</Card.Title>
            <Card.Text>
              {
                tasks.filter((task) => task.status == 'completed')
                  .map((task, index) => (
                    <Task
                      key={index}
                      index={index}
                      title={task.title}
                      description={task.description}
                      status={task.status}
                      deleteTask={deleteTask}
                    />
                  ))
              }
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleNewTask}>
          <Modal.Header closeButton>
            <Modal.Title>New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                placeholder='Enter task title'
                required
                value={newTaskTitle}
                onChange={handleNewTaskTitle}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Optionally include a description'
                value={newTaskDescription}
                onChange={handleNewTaskDescription}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type='submit'>
              Create Task
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default App;
