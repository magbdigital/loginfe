import React,{useContext} from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation, Routes, Route } from 'react-router-dom';
import {
  TrophyOutlined,
  ShopOutlined,

} from '@ant-design/icons';
import TeacherPage from '../pages/teacher/TeacherPage';
import CompanyPage from '../pages/company/CompanyPage';
import { AppContext } from '../context/AppContext'

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const menuItems = [
  { path: '/teacher', label: 'Tutor', icon: <TrophyOutlined />, roles:['ADMIN'] },
  { path: '/company', label: 'Empresas', icon: <ShopOutlined />, roles:['USER'] },
  { path: '/practicas', label: 'Practicas', icon: <ShopOutlined />, roles:['USER'] },

];

const SliderMenu = () => {
  const location = useLocation();
  const { role } = useContext(AppContext);
  return (
    <Layout>
      <Sider collapsible collapsed={false}>
        <div className="logo" />
        <Menu theme="dark" selectedKeys={[location.pathname]} mode="inline" defaultSelectedKeys={['0']}>
          {menuItems.filter(item => item.roles.includes(role)).map((route, index) => {
            if (route.subMenuItems) {
              return (
                <SubMenu key={index} title={<span>{route.icon}<span>{route.label}</span></span>}>
                  {route.subMenuItems.map((subItem, subIndex) => (
                    <Menu.Item key={index + '-' + subIndex}>
                      <Link to={subItem.path}>{subItem.icon}<span style={{ marginLeft: '10px' }}>{subItem.label}</span></Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item key={index}>
                  <Link to={route.path}>{route.icon}<span style={{ marginLeft: '10px' }}>{route.label}</span></Link>
                </Menu.Item>
              );
            }
          })}
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ padding: '20px' }}>
          <Routes>
            
            <Route path="/teacher" element={<TeacherPage />} />
            <Route path="/company" element={<CompanyPage/> } />
 
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SliderMenu;