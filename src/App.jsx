import React, { Component } from 'react';
import './App.css';

// Create Context
const StateContext = React.createContext()

// Create component provider
class StateProvider extends Component {

    // define state
    state = {
        body: 'Context provides a way to pass data through the component tree without having to pass props down manually at every level.',
        link: 'http://pluralsight.com',
        views: 0,
        read: false,
        color: '#721fa'
    }

    render() {
        return (
            <StateContext.Provider value={{
                state: this.state,
                incrementViews: () => this.setState(state => ({ ...state, views: this.state.views + 1 })),
                toggleRead: () => this.setState(state => ({ ...state, read: !this.state.read })),
                randomizeColor: () => this.setState(state => ({
                    ...state, color: '#' + Math.floor(Math.random() * 16777215).toString(16)
                })),
            }

            }>
                {this.props.children}
            </StateContext.Provider>
        )
    }
}

const Notification = (props) => (
    <div>
        <StateContext.Consumer>
            {({ state, incrementViews, toggleRead, randomizeColor }) => (
                <React.Fragment>
                    <div style={{backgroundColor: state.color}}>
                        <p>{state.body}</p>
                        <p>I was viewed {state.views} times</p>
                        <p>I was {state.read ? 'read' : 'not read'}</p>
                    </div>
                    <button onClick={incrementViews}>+ Increment View</button>
                    <button onClick={toggleRead}>Toggle Read</button>
                    <button onClick={randomizeColor}>Random Color</button>
                </React.Fragment>
            )}
        </StateContext.Consumer>
    </div>
)

const NotificationDropdown = (props) => (
    <div>
        <Notification />
    </div>
)

class App extends Component {
    render() {
        return (
            <div className="App">
                <StateProvider>
                    <NotificationDropdown />
                </StateProvider>
            </div>
        );
    }
}

export default App;
