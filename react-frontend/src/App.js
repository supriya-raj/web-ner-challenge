import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { fetchNamedEntities } from './actions';

function App() {
  const [results, setResults] = useState(null);
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setIsLoading(true);
    fetchNamedEntities(inputText)
      .then(results => {
        setResults(results);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const onTextChange = (e) => {
    setError('');
    setResults(null);
    setInputText(e.target.value);
  };

  let resultsHtml = null, errorHtml = null;

  if (error) {
    errorHtml = <div className='alert alert-danger'>{error}</div>
  }
  else if (results != null) {
    if (Object.entries(results).length) {
      resultsHtml = <div>
        {Object.entries(results).map(([text, entity]) => {
          return <div class="d-inline-block m-2">
            <div class="d-inline p-2 bg-warning text-dark">{text}</div>
            <div class="d-inline p-2 bg-info text-dark">{entity}</div>
          </div>
        })}
      </div>
    } else {
      resultsHtml = <div className='alert alert-info'>
        No Named entities found!
      </div>
    }
  }

  return (
    <div className="app">
      <p className="header">
        Named Entity Recognition
      </p>
      <div className='body'>
        <Form.Group className="mb-3">
          <Form.Label>Enter your input here:</Form.Label>
          <Form.Control required as="textarea" rows={10} onChange={onTextChange} value={inputText} />
        </Form.Group>
        <Button variant="primary" onClick={onSubmit} disabled={isLoading} className="mb-3">
          Go
        </Button>
        <br />
        {errorHtml || resultsHtml}
      </div>

    </div>
  );
}

export default App;
