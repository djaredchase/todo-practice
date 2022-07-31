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
  const createNewTask = (event) => {
    event.preventDefault();
    const task = {
      id: generateId(),
      title: newTaskTitle,
      description: newTaskDescription,
      status: 'planned'
    };
    const taskArray = [...tasks, task];
    setTasks(taskArray);
    handleClose();
  }
  const handleTaskTitleChange = (event) => {
    // add code for character limit
    setNewTaskTitle(event.target.value);
  }
  const handleTaskDescriptionChange = (event) => {
    // add code for character limit
    setNewTaskDescription(event.target.value);
  }
  const deleteTask = (taskId) => {
    const taskArray = [...tasks];
    const taskIndex = taskArray.findIndex(t => t.id == taskId);
    taskArray.splice(taskIndex, 1);
    setTasks(taskArray);
  }
  const clearForm = () => {
    setNewTaskTitle('');
    setNewTaskDescription('');
  }
  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const taskArray = [...tasks];
    const taskIndex = taskArray.findIndex(t => t.id == taskId);
    taskArray[taskIndex].status = newStatus;
    setTasks(taskArray);
    e.dataTransfer.clearData('taskId');
  }
  const generateId = () => {
    const num = Math.floor(Math.random() * Math.random() * Date.now());
    return num;
  }

  return (
    <div className="App">
      <div className='my-heading'>
        <h1 className='todo-title'>Todo App</h1>
        <Button className='add-task-btn' onClick={handleShow}>Add task</Button>
      </div>
      <div className='my-container'>
        <Card
          className='tasks-container'
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, 'planned')}
        >
          <Card.Body>
            <Card.Title>Planned</Card.Title>
            <Card.Text>
              {
                tasks.filter((task) => task.status == 'planned')
                  .map((task) => (
                    <Task
                      key={task.id}
                      id={task.id}
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
        <Card
          className='tasks-container'
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, 'in-progress')}
        >
          <Card.Body>
            <Card.Title>In Progress</Card.Title>
            <Card.Text>
              {
                tasks.filter((task) => task.status == 'in-progress')
                  .map((task) => (
                    <Task
                      key={task.id}
                      id={task.id}
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
        <Card
          className='tasks-container'
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, 'completed')}
        >
          <Card.Body>
            <Card.Title>Completed</Card.Title>
            <Card.Text>
              {
                tasks.filter((task) => task.status == 'completed')
                  .map((task) => (
                    <Task
                      key={task.id}
                      id={task.id}
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
        <Form onSubmit={createNewTask}>
          <Modal.Header closeButton>
            <Modal.Title>New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                autoFocus
                placeholder='Enter task title'
                maxLength={50}
                required
                value={newTaskTitle}
                onChange={handleTaskTitleChange}
              />
              <Form.Text>
                Remaining characters: {50 - newTaskTitle.length}
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Optionally include a description'
                maxLength={150}
                value={newTaskDescription}
                onChange={handleTaskDescriptionChange}
              />
              <Form.Text>
                Remaining characters: {150 - newTaskDescription.length}
              </Form.Text>
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
