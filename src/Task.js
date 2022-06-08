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

    const handleDelete = () => {
        deleteTask(index);
    }

    return (
        <Card bg={setBackgroundColor(status)} text='white'>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Button variant='danger' onClick={handleDelete}>Delete</Button>
            </Card.Body>
        </Card>
    );
}

export default Task;