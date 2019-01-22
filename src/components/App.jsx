import React, { Component } from 'react';


class App extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                name: '',
                message: ''
            },
            loading: false,
            errors: {}
        },
        this.serverResponse = null,
        this.onChange = this.onChange.bind(this),
        this.onClick = this.onClick.bind(this)
    };

    onChange(e) {
        this.setState({
            ...this.state,
            data: { ...this.state.data, [e.target.name]: e.target.value }
        })
    };

    onClick(e) {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        fetch('http://ec2-13-57-25-101.us-west-1.compute.amazonaws.com:3000/api/hrsf111/greeting', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.data)
        })
            .then(res => res.text())
            .then(text => {
                this.setState({ serverResponse: text })
            })
            .catch(console.log)
    }

    validate(data) {
        const errors = {};
        if (!data.name || !data.message ) errors.err = "Can't leave any field blank";
        return errors;
    }

    render() {
        const { data, errors, serverResponse } = this.state;
        return (
            <div>
                <form>
                    Server Response: <br />
                    <div>
                        <span><em>{serverResponse}</em></span>
                    </div>
                    <br />
                    <br />
                    Name:<br />
                    <input 
                        type="text"
                        id="name" 
                        name="name"
                        placeholder="Your name"
                        value={data.name}
                        onChange={this.onChange} 
                    />
                    <br />
                    Message:<br />
                    <textarea 
                        type="text"
                        id="message" 
                        name="message"
                        placeholder="What's up?"
                        value={data.message}
                        onChange={this.onChange} 
                    />
                    <br/>
                    {errors.err ? <div>!! {errors.err}</div> : <div></div>}
                    <button onClick={this.onClick}>Send</button>
                </form>
            </div>

        )
    };
}

export default App;