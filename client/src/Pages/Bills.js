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

export default function Bills() {
  const componentRef = useRef()
  const [billsData, setBillsData] = useState([]);
  const [printBillModalVisibility, setPrintBillModalVisibility] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
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
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Customer",
      dataIndex: "customerName",
    },
    {
      title: "SubTotal",
      dataIndex: "subTotal",
    },
    {
      title: "Tax",
      dataIndex: "tax",
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <EyeOutlined className="mx-2" onClick={() => {
            setSelectedBill(record)
            setPrintBillModalVisibility(true)
        }} />
        </div>
      ),
    },
  ];

  const cartcolumns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
         
          <b>{record.quantity}</b>
        
        </div>
      ),
    },
    {
      title: "Item Total",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
         
          <b>{record.quantity*record.price}</b>
        
        </div>
      ),
    },
    
  ];


  useEffect(() => {
    getAllBills();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });



  return (
    <div>
      <DefaultLayout>
        <div className="d-flex justify-content-between">
          <h3>Invoice</h3>
    
        </div>
        <Table columns={columns} dataSource={billsData} bordered />

        {printBillModalVisibility && (
          <Modal
            onCancel={() => {
              setPrintBillModalVisibility(false);
            }}
            visible={printBillModalVisibility}
            title='Invoice Details'
            footer={false}
            width={800}
          >
            <div className="bill-modal p-3" ref={componentRef}>
                <div className="d-flex justify-content-between bill-header pb-2">
                    <div>
                        <h1><b>GARAGE</b></h1>
                    </div>
                    <div>
                        <p>Uttar Pradesh</p>
                        <p>Aligarh 202124</p>
                        <p>9876543210</p>
                    </div>

                </div>

                <div className="bill-customer-detail mt-2">
                    <p><b>Name</b> : {selectedBill.customerName} </p>
                    <p><b>Phone Number</b> : {selectedBill.customerPhoneNumber} </p>
                    <p><b>Date</b> : {selectedBill.createdAt.toString().substring(0,10)} </p>
                </div>

                <Table dataSource={selectedBill.cartItems} columns={cartcolumns} pagination={false}/>

                <div className="dotted-border pt-2 mb-2 pb-2">
                    <p><b>Total</b> : { selectedBill.subTotal } RS/- </p>
                    <p><b>Tax</b> : { selectedBill.tax }  RS/-</p>
                </div>

                <div className=" pb-2 dotted-border">
                    <h2><b>Payable Amount : { selectedBill.totalAmount} RS/-</b></h2>
                </div>

                <div className="text-center">
                    <p>Thank You</p>
                    <p>Visit Again! :)</p>

                </div>
            </div>

            <div className="d-flex justify-content-end">
            <Button type='primary' onClick={handlePrint}>Print Bill</Button>


            </div>
          </Modal>
        )}
      </DefaultLayout>
    </div>
  );
}
