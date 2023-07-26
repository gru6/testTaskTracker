import { Component } from 'react'
import './mainContainer.css'

export default class MainContainer extends Component {
  render() {
    return (
     <>
      
     <div className='mainContainer'>

      <div className='boxContainer'>
        <div></div>
        <div>Important</div>
        <div>Less important</div>
        <div className='vertical-title'>Urgent</div>
      <div className='box' id='box-1'>
        Do it 
        </div>
      <div className='box' id='box-2'>
      Schedule
      </div>
  
      <div className='vertical-title'>Less urgent</div>
      <div className='box' id='box-3'>
        Delegate
      </div>
  
      <div className='box' id='box-4'>
        Delete
      </div>
      </div>
     
     </div>
     </>
    )
  }
}
