import Card from 'react-bootstrap/Card';

export default function PageHeader(prop) {
    return (
        <>
            <Card className='bg-light'>
                <Card.Body>
                    {prop.text}
                </Card.Body>
            </Card>
            <br/>
        </>
    )
}

