import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    FormOutlined,
    ContainerOutlined,
    UserOutlined,
    LogoutOutlined,
    ShoppingCartOutlined,
  } from '@ant-design/icons';
  import { Layout, Menu } from 'antd';
  import React, { useEffect, useState } from 'react';
  import '../Resources/Layout.css'
  import {Link,useNavigate} from 'react-router-dom'
  import {useSelector} from 'react-redux'
  const { Header, Sider, Content } = Layout;
  
  const App = (props) => {
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const {cartItems,loading} = useSelector(state => state.rootReducer)
    const toggle = () => {
      setCollapsed(!collapsed)
    };

    useEffect(() => {
      localStorage.setItem("cartItems",JSON.stringify(cartItems))
    }, [cartItems])

    return (

      <Layout className='main-layout'>
        {loading && (
          <div className='spinner'></div>>
          <div className="spinner-grow text-primary" role="status">
          </div>
        )}

        <Sider className ="sider-layout" trigger={null} collapsible collapsed={collapsed}>
          <div className="logo"><h3>{collapsed ? 'G' : 'GARAGE'}</h3></div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={window.location.pathname}>
            
            <Menu.Item key= "/home" icon={<HomeOutlined />}>
                     <Link to='/home'>HOME</Link>
            </Menu.Item>
            <Menu.Item key= "/cart" icon={<ShoppingCartOutlined />}>
                     <Link to='/cart'>CART</Link>
            </Menu.Item>
            <Menu.Item key= "/bills" icon={<FormOutlined />}>
                     <Link to='/bills'>BILLs</Link>

            </Menu.Item>
            <Menu.Item key= "/items" icon={<ContainerOutlined />}>
                     <Link to='/items'>ITEMS</Link>
            </Menu.Item>
            <Menu.Item key= "/customers" icon={<UserOutlined />}>
                     <Link to='/customers'>CUSTOMERS</Link>

            </Menu.Item>
            <Menu.Item key= "/logout" icon={<LogoutOutlined />} onClick={()=>{
              localStorage.removeItem('pos-user')
              navigate('/login')
            }}>
              LOGOUT
                     
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 10
            }}
          >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              classNameName: 'trigger',
              onClick: toggle,
            })}

            <div className='cart-count d-flex align-items-center' onClick={() => navigate('/cart')}>
              <b><p className='mt-3 mr-2'>{cartItems.length}</p></b>
              <ShoppingCartOutlined />

            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "10px",
              padding: 24,
              minHeight: "80vh"
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    );
  };
  
  export default App;