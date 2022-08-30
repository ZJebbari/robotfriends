import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import errorBoundry from '../components/errorBoundry';
import '../containers/App.css'


// const state = {
//     robots:robots,
//     searchfield:''
// }

class App extends  Component {
    constructor(){
        super()
        this.state ={
            robots:[],
            searchfield:''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users').then(response => {
            return response.json();
        })
        .then(users=>{
            this.setState({robots : users});
        })
    }

    onSearchChange =(event)=>{
        this.setState({searchfield: event.target.value})
        // const filteredRobots = this.state.robots.filter(robots => {
        //     return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        // })
        // console.log(filteredRobots);
    }

    render(){
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        if (this.state.robots.lenght===0){
            return <h1>Page Loading</h1>
        }
        else {
            return (
                <div className='tc'>
                    <h1 className='f2'>RoboFriends</h1>
                    <SearchBox searchChange ={this.onSearchChange}/>
                    <Scroll>
                        <errorBoundry>
                            <CardList robots={filteredRobots} />
                        </errorBoundry>
                    </Scroll>
                </div>
            )
        }
    }
}

export default App;