import { Alert, Button } from 'react-bootstrap';

function DataError() {
  return (
    <Alert variant='danger'>
      <Alert.Heading>Oh snap! There appears to be a problem!</Alert.Heading>
      <p>
        This might be an intermittent error. Please try logging out and logging back in or try again later.
      </p>
    </Alert>
  );
}

export default DataError;
