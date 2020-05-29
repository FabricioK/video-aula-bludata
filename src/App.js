import React, { Component } from "react";

import "./App.css";
import { ZoomMtg } from "@zoomus/websdk";
import WebcamCapture from "./WebcamCapture";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingLaunched: false,
      meetingNumber: 97675040896,
      leaveUrl: "http://localhost:3000/",
      userName: "teste",
      userEmail: "fabricio.antunes@bludata.com.br",
      passWord: "",
      role: 1
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.launchMeeting = this.launchMeeting.bind(this);
    this.getSignature = this.getSignature.bind(this);
  }

  componentDidMount() {
    console.log('checkSystemRequirements');
    console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));
    ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.2/lib', '/av');
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  launchMeeting() {
    const apiKey = "CHAVE_EXEMPLO";
    const meetConfig = {
      meetingNumber: this.state.meetingNumber,
      leaveUrl: this.state.leaveUrl,
      userName: this.state.userName,
      userEmail: this.state.userEmail,
      passWord: this.state.passWord,
      role: this.state.role
    };
    this.setState({ meetingLaunched: true });
    this.getSignature(meetConfig, apiKey);
  }

  getSignature(meetConfig, apiKey) {
    //Api que vamos disponibilizar
    fetch("https://zoomsignaturebludata.herokuapp.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meetConfig )
    })
      .then(result => result.json())
      .then(response => {
        ZoomMtg.init({
          leaveUrl: meetConfig.leaveUrl,
          isSupportAV: true,
          success: function () {
            ZoomMtg.join({
              signature: response.signature,
              apiKey: apiKey,
              meetingNumber: meetConfig.meetingNumber, // required
              userName: meetConfig.userName, // required
              userEmail: "fabricio.antunes@bludata.com.br",
              passWord: meetConfig.passWord, // If required; set by host
              success() {
                console.log("join meeting success");
              },
              error(res) {
             //   console.log(res);
              }
            });
          },
          error(res) {
           // console.log(res);
          }
        });
      });
  }

  render() {
    const { meetingNumber, userName, passWord, meetingLaunched } = this.state;
    return (
      <div className="App">
        {!meetingLaunched ? (
          <nav className="app-nav">
            <form className="form">
              <label>
                <span>MeetingID:</span>
                <input
                  className="form__input"
                  type="text"
                  name="meetingNumber"
                  placeholder="Meeting #"
                  value={meetingNumber}
                  onChange={this.handleInputChange}
                />
              </label>
              <label>
                <span>Username:</span>
                <input
                  className="form__input"
                  type="text"
                  name="userName"
                  placeholder="Username"
                  value={userName}
                  onChange={this.handleInputChange}
                />
              </label>
              <label>
                <span>Password:</span>
                <input
                  className="form__input"
                  type="text"
                  name="passWord"
                  placeholder="Password"
                  value={passWord}
                  onChange={this.handleInputChange}
                />
              </label>
            </form>
            <div className="button-wrap">
              <button onClick={this.launchMeeting} className="button">
               Entrar
              </button>
            </div>
          </nav>
        ) : (
            <>
            <WebcamCapture tempo={15} />
            </>
          )}
      </div>
    );
  }
}

export default App;