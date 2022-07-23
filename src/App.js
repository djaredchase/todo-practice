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
    setNewTaskTitle(event.target.value);
  }
  const handleTaskDescriptionChange = (event) => {
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
  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    // get the task info from dataTransfer object
    // change the task status of the specific task in the tasks array
    // receive the index of the dragged task
    // edit the task at that index, set the state
    const taskIndex = e.dataTransfer.getData('taskIndex');
    const taskArray = [...tasks];
    taskArray[taskIndex].status = newStatus;
    setTasks(taskArray);
    e.dataTransfer.clearData('taskIndex');
  }
  const generateId = () => {
    // JUST ADDED THIS ID
    // remove all uses of index and switch the functionality and your drag n drop will be fixed
    const num = Math.floor(Math.random() * Math.random() * Date.now());
    console.log('unique id', num);
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
        <Card
          className='tasks-container'
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, 'in progress')}
        >
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
        <Form onSubmit={createNewTask}>
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
                onChange={handleTaskTitleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Optionally include a description'
                value={newTaskDescription}
                onChange={handleTaskDescriptionChange}
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
