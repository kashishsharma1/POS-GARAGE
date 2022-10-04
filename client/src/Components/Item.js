import { Button } from 'antd'
import React from 'react'
import '../Resources/Items.css'
import {useDispatch} from 'react-redux'
function Item({item}) {
  const dispatch = useDispatch()

  function addToBag(){
    dispatch({type : 'addToBag',payload : {...item,quantity:1}})
  }

  return (
    <div className='item'>
      <h4 className='name'>
        {item.name}
      </h4>
      <img src={item.image} alt="" height='100' width= '100'/>
      <h4 className='price'><b>Price : </b>{item.price} RS/-</h4>
      <div className="d-flex justify-content-end">
        <Button onClick={()=>addToBag()}>
          Add to bag
        </Button>
      </div>
    </div>
  )
}

export default Item
