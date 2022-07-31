import Card from 'react-bootstrap/Card';

const Task = (props) => {
    const { id, title, description, status, deleteTask } = props;

    const setBackgroundColor = (status) => {
        switch (status) {
            case 'planned':
                return 'danger';
            case 'in-progress':
                return 'warning';
            case 'completed':
                return 'success';
            default:
                return 'secondary';
        }
    }
    const handleDragStart = (e) => {
        e.dataTransfer.setData('taskId', id);
    }

    const handleDelete = () => {
        deleteTask(id);
    }

    return (
        <Card
            className='task'
            border={setBackgroundColor(status)}
            draggable
            onDragStart={(e) => handleDragStart(e)}
        >
            <Card.Header>
                {title}
                <button className='delete-button' onClick={handleDelete}>x</button>
            </Card.Header>
            {description && <Card.Body>
                <Card.Text>{description}</Card.Text>
            </Card.Body>}
        </Card>
    );
}

export default Task;