import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import $ from 'jquery';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      textBox: '',
      fbData: [
        {
          user: 0,
          message: "Hi I'm the Chaka Bot!"
        }
      ]
    };
  
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  Send = () => {
    var messages = this.state.fbData;
    messages.push({
      user: 1,
      message: this.state.textBox
    });

    $.ajax({
      type: 'POST',
      url: `https://140.186.90.91:5000/prediction`, // asp connection
      data: JSON.stringify({message: this.state.textBox}),
      contentType: "application/json; charset=utf-8", //asp requirement
      dataType: "json" //asp requirement
    }).done((data) => {
      var messages = this.state.fbData;
      messages.push({
        user: 0,
        message: data.responseText
      });
      this.setState({
        fbData: messages
      });
    }).fail((data) => {
      var messages = this.state.fbData;
      messages.push({
        user: 0,
        message: data.responseText
      });
      this.setState({
        fbData: messages
      });
    });


    this.setState({
      textBox: '',
      fbData: messages
    });
  }

  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.Send();
    }
  }

  render() {
    //const data = JSON.parse(fbData);
    return (
      <Container style={{ paddingTop: 20 }}>
        <header>
          <h1><i className="icon heart is-large"></i>Tyler Bot</h1>
          <p>Talk with Chaka without the hassle of actually bothering him!</p>
        </header>

        <Row>
          <Col md={12}>
            <div className="nes-container">
              <h2 className="title"></h2>
            {this.state.fbData.map((item,i) => {
              return( 
                <section className={item.user === 0 ? "message -left":"message -right"}  style={{textAlign: item.user === 0 ? "left":"right"}}>
                  <div className={item.user === 0 ? "nes-balloon from-left":"nes-balloon from-right"}>
                    <p>{item.message}</p>
                  </div>
                </section>
            )              
            })}

            <label for="name_field">Your message</label>
            <div class="nes-field is-inline">
              <input type="text" id="textBox" class="nes-input" onChange={this.onChange} value={this.state.textBox} onKeyDown={this._handleKeyDown}></input>
              <button type="button" class="nes-btn is-primary" onClick={this.Send}>Send</button>
            </div>
            </div>
            <footer className="footer">
              <p>
                <a href="https://github.com/nostalgic-css/NES.css">Theme by B.C.Rikko</a>
              </p>
            </footer>
          </Col>
        </Row>
      </Container>
      
    );
  }
}

export default App;
