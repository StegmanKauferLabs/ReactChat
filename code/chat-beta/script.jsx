var ExampleApplication = React.createClass({
  render: function() {
    var elapsed = Math.round(this.props.elapsed  / 100);
    var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
    var message =
      'React has been successfully running for ' + seconds + ' seconds.';

    return <p>{message}</p>;
  }
});

var MessageList = React.createClass({
  getInitialState: function() {
      return {
        recentMessages: [
          //{from: "", message: ""}
          {from: "matthew", message: "hi"},
          {from: "bob", message: "hello"}

        ]
      };
  },
  render: function(){
    var messages = [];
    for(var i=0; i < this.state.recentMessages.length; i++){
      var m = this.state.recentMessages[i]

      messages.push(<Message from={m.from} message={m.message} />);
    }
    return (
      <div>
        {messages}
      </div>
    );
  }
})

var messageList = []

var Message = React.createClass({
  getInitialState: function() {
      return {
            from: this.props.from || "Unknown",
            message: this.props.message || "..."
      };
  },

  render: function(){
    return (
      <p className="message">
        <span className="from">{this.props.from}:</span>
        <span className="message">{this.props.message}</span>
      </p>
    )
  }
})

var MessageContent = React.createClass({
  getInitialState: function() {//what the content of the text box will be at the start
    return {value: ''};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});//so html events actually update the context
  },
  sendMessage: function(event){
    event.preventDefault()//so we don't refresh the page or anything
    
    const messageValue = this.state.value

    console.log(messageValue)


    //submit to firebase
      //after the firebase callback
      this.setState({value: ""})
  },
  render: function() {
    return (
      <form
        className="chatForm"
        onSubmit={this.sendMessage}>
        <input
          type="text"
          id="chatInput"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="Your message..."
        />
      </form>
    );
  }
});

ReactDOM.render(
  <div>
    <MessageList />
    <MessageContent />
  </div>,
  document.getElementById('container')
)

// var start = new Date().getTime();
// setInterval(function() {
//   ReactDOM.render(
//     <ExampleApplication elapsed={new Date().getTime() - start} />,
//     document.getElementById('container')
//   );
// }, 50);