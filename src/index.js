import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import './index.css';

/*
	****************** MESSAGE ******************
*/

class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Hello {this.props.name}
      </div>
    );
  }
}

/*
	****************** TIMER ******************
*/

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cicle: 59, cicleH: 23, seconds: 0, minutes: 0, hours: 0};
  }

  tick() {
    if (this.state.seconds < this.state.cicle) {
      this.setState(state => ({
        seconds: state.seconds + 1,
      }));
    }else if(this.state.minutes < this.state.cicle){
      this.setState(state => ({
        seconds: 0,
        minutes: state.minutes + 1
      }));
    }else if(this.state.hours < this.state.cicleH){
      this.setState(state => ({
        seconds: 0,
        minutes: 0,
        hours : state.hours + 1
      }));
    }else{       
      this.setState(state => ({
        seconds: 0,
        minutes: 0,
        hours : 0
      }));
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        {this.state.hours} : {this.state.minutes} : {this.state.seconds}
      </div>
    );
  }
}

/*
	****************** TIMER 2  ******************
*/

class Timer2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cicle: 9, cicleH: 23, seconds: 0, minutes: 0, hours: 0};
  }

  tick() {
    if (this.state.seconds < this.state.cicle) {
      this.setState(state => ({
        seconds: state.seconds + 1,
      }));
    }else if(this.state.minutes < this.state.cicle){
      this.setState(state => ({
        seconds: 0,
        minutes: state.minutes + 1
      }));
    }else if(this.state.hours < this.state.cicleH){
      this.setState(state => ({
        seconds: 0,
        minutes: 0,
        hours : state.hours + 1
      }));
    }else{       
      this.setState(state => ({
        seconds: 0,
        minutes: 0,
        hours : 0
      }));
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        {this.state.hours} : {this.state.minutes} : {this.state.seconds}
      </div>
    );
  }
}


/*
	****************** TODO APP ******************
*/

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            What needs to be done?
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

/*
	****************** PLUGIN COMPONENT ******************
*/

class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.md = new Remarkable();
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: 'Hello, **world**!' };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  getRawMarkup() {
    return { __html: this.md.render(this.state.value) };
  }

  render() {
    return (
      <div className="MarkdownEditor">
        <h3>Input</h3>
        <label htmlFor="markdown-content">
          Enter some markdown
        </label>
        <textarea
          id="markdown-content"
          onChange={this.handleChange}
          defaultValue={this.state.value}
        />
        <h3>Output</h3>
        <div
          className="content"
          dangerouslySetInnerHTML={this.getRawMarkup()}
        />
      </div>
    );
  }
}

class Board extends React.Component {
  render() {
    return (
      <div class="container">
        <div class="box">
          <HelloMessage name="Sean Quintero O." />
        </div>
        <div class="box">
          <Timer />
        </div>
        <div class="box">
          <Timer2 />
        </div>
        <div class="box">
          <TodoApp />
        </div>
        <div class="box">
          <MarkdownEditor/>
        </div>
      </div>
    )

  }

}

// ========================================

ReactDOM.render(
  <Board />,
  document.getElementById('root')
);
