import React, { useRef } from "react";
import DefaultLayout from "../Components/DefaultLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import { Table, Modal } from "antd";
import { Button, Form, Input, message, Select } from "antd";
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';

export default function Customers() {
  const componentRef = useRef()
  const [billsData, setBillsData] = useState([]);
  
  const dispatch = useDispatch();
  const getAllBills = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("./api/bills/get-all-bills")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        const data = response.data
        data.reverse(data)
        setBillsData(response.data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  const columns = [
    {
      title: "Customer",
      dataIndex: "customerName",
    },
    {
      title: "Phone Number",
      dataIndex: "customerPhoneNumber",
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      render : (value)=><span>{value.toString().substring(0,10)}</span>
    },
  ];


  useEffect(() => {
    getAllBills();
  }, []);

  return (
    <div>
      <DefaultLayout>
        <div className="d-flex justify-content-between">
          <h3>Customers</h3>
    
        </div>
        <Table columns={columns} dataSource={billsData} bordered />

        
      </DefaultLayout>
    </div>
  );
}
