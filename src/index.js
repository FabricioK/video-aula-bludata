import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '@zoomus/websdk/dist/css/bootstrap.css';
import '@zoomus/websdk/dist/css/react-select.css';

const dados = document.getElementById('video-aula-bludata');
ReactDOM.render(
  <React.StrictMode>
    <App
      meetingNumber={dados.getAttribute('data-meet-id')}
      userName={dados.getAttribute('data-nome')}
      userEmail={dados.getAttribute('data-email')}
      role={dados.getAttribute('data-role')}
      apiKey={dados.getAttribute('data-apikey')}
      leaveUrl={dados.getAttribute('data-leave-url')}
      signatureUrl={dados.getAttribute('data-signature-url')}
      uploadImageUrl={dados.getAttribute('data-upload-image-url')}
      uploadImageTime={dados.getAttribute('data-upload-image-time')}
      password={dados.getAttribute('data-password')}
    />
  </React.StrictMode>,
  dados
);