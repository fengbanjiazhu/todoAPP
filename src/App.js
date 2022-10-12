import React, { Component } from 'react'
import { Input, Checkbox } from 'antd'
import "./App.css"
import "antd/dist/antd.min.css"

// create or get a list from local storage 
let todolist = localStorage.getItem("TODO") ? JSON.parse(localStorage.getItem("TODO")) : []

export default class App extends Component {
  // update data and local storage
  updateData = () =>{
    localStorage.setItem("TODO", JSON.stringify(todolist))
    this.setState(todolist)
  }
  // add a new task
  saveList = (e) =>{
    todolist.push({
      title: e.target.value,
      active: false
    })
    
    this.updateData()
  }
  // change status of tasks
  changeList = (e) => {
    todolist[e.target.index].active = !todolist[e.target.index].active
    this.updateData()
  }
  // delete the task has been finished
  delete = (e) => {
    let index = e.target.getAttribute("data-index")
    todolist.splice(index, 1)
    this.updateData() 
  }

  state = {
    todolist,
    data:""
  }
  
  render() {
    const {todolist} = this.state
    return (
      <div id='app'>
        {/* input area */}
        <div className='inputArea'>
          <Input allowClear placeholder="Add a thing" id='inputBox' onPressEnter={ this.saveList } />
        </div>

        {/* pending area */}
        <div className='box'>
          <h3>TODO</h3>
          <div className='todolist list'>
            {todolist.map((item,index) =>{
                return <div className={ item.active? 'none': 'block' } key = {index} >
                  <Checkbox 
                          checked={item.active} 
                          key = { index } 
                          index={ index } 
                          onChange= {this.changeList} 
                        > 
                          {item.title}
                  </Checkbox>
                </div>
            })}
          </div>
        </div>

        {/* done area */}
        <div className='box'>
          <h3 id='doneTitle'>DONE</h3>
          <div className='doneList list'>
            {todolist.map((items,index) =>{
                            return <div key={index} className={ items.active ? 'block': 'none' } >
                          {/* task box */}
                          <Checkbox 
                            checked={ items.active } 
                            key = { index } 
                            index={ index } 
                            onChange= {this.changeList}
                          > 
                            {items.title}
                          </Checkbox>

                          {/* delete button */}
                          <button data-index={ index } onClick={this.delete} id='delBtn'>Delete</button>
                    </div>     
              })}
          </div>
        </div>
      </div>
    )
  }
}
