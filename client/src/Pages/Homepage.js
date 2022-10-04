import React, { useEffect, useState } from "react";
import DefaultLayout from "../Components/DefaultLayout";
import axios from "axios";
import { Col, Row } from "antd";
import Item from "../Components/Item";
//import Col from "antd/es/grid/col";
//import "antd/dist/antd.min.css";
import '../Resources/Items.css'
import {useDispatch} from "react-redux"

export default function Homepage() {

  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory,setSelectedCategory] = useState('fruits')
  const categories = [
    {
      name : 'fruits',
      imageURL : 'https://wallpapercave.com/wp/wp6557500.jpg',
    },
    {
      name : 'spices',
      imageURL : 'https://i2.wp.com/healthylivingassociation.org/wp-content/uploads/2016/09/herbs-and-spices.jpg?ssl=1',
    },
    {
      name : 'dryfruits',
      imageURL : 'https://blog-images.pharmeasy.in/2020/10/26145600/shutterstock_601199999-1.jpg'
    },
    {
      name : 'essentials',
      imageURL : 'https://img.huffingtonpost.com/asset/5c6eb449240000bc03a29716.jpeg?ops=1778_1000',
    },
    {
      name : 'dinnerware',
      imageURL : 'https://i.pinimg.com/originals/a4/94/34/a49434320a089f412f4631036975dd8b.jpg',
    },
    {
      name : 'hygiene',
      imageURL : 'https://autoadviser.co.uk/wp-content/uploads/2021/01/Shampoo-Canva.jpg',
    },
  ]
  const dispatch = useDispatch()
  const getAllItems = () => {
    dispatch({type:'showLoading'})
    axios
      .get("./api/items/get-all-items")
      .then((response) => {
        dispatch({type:'hideLoading'})
        setItemsData(response.data);
      })
      .catch((error) => {
        dispatch({type:'hideLoading'})
        console.log(error);
      });
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <div>
      <DefaultLayout>
        <div className="d-flex cat-top">
          {categories.map((category)=>{
            return <div 
            onClick={()=> setSelectedCategory(category.name)}
            className={`d-flex category ${selectedCategory === category.name && 'selected-category'}`}>
              
              <img src={category.imageURL} height='68' width='120' />
              <div className="label">
                <h4>{category.name}</h4>
              </div>
            </div>
          })}

        </div>
        <Row gutter={20}>
          {itemsData.filter((i)=>i.category===selectedCategory).map((item) => {
            return (
              <Col span={6} xs={24} lg={6} md={12} sm={6}>
                <Item item={item} />
              </Col>
            );
          })}
        </Row>
      </DefaultLayout>
    </div>
  );
}
