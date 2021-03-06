import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Task = (props) => {
    const { index, title, description, status, deleteTask } = props;

    const setBackgroundColor = (status) => {
        switch (status) {
            case 'planned':
                return 'secondary';
            case 'in progress':
                return 'primary';
            case 'completed':
                return 'success';
            default:
                return 'secondary';
        }
    }
    const handleDragStart = (e) => {
        // set the task index in the dataTransfer object
        e.dataTransfer.setData('taskIndex', index);
    }

    const handleDelete = () => {
        deleteTask(index);
    }

    return (
        <Card
            bg={setBackgroundColor(status)}
            text='white'
            draggable
            onDragStart={(e) => handleDragStart(e)}
        >
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Button variant='danger' onClick={handleDelete}>Delete</Button>
            </Card.Body>
        </Card>
    );
}

export default Task;