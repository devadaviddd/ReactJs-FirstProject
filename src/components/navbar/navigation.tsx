import React, {ReactElement, useEffect} from "react";
import {MenuProps, Menu} from "antd";
import {Header} from "antd/es/layout/layout";
import {Link} from "react-router-dom";
import {getAccessToken} from "../../config";

const navigationItems1 = [
  { name: "Home", href: "/", current: false },
  { name: "Login", href: "/signin", current: false },
  { name: "Signup", href: "/signup", current: false },
];

const navigationItems2 = [
  { name: "Home", href: "/", current: false },
  { name: "Profile", href: "/profile", current: false },
  { name: "Logout", href: "/logout", current: false,  },
];


interface NavigationProps{
  currentNavPathIndex: number
}

export const Navigation: React.FC<NavigationProps> = (props , context):ReactElement => {
  useEffect(() => {
    navigationItems1[props.currentNavPathIndex].current  = true;
    return () => {
    }
  }, [props.currentNavPathIndex])

  const tokens: string | null = getAccessToken();

  const items1: MenuProps['items'] = ['Home', 'Login', 'Signup'].map((key, index) => ({
    key,
    label: (
      <Link to={navigationItems1[index].href} style={{ textDecoration: 'none' }}>{key}</Link>
    ),
  }));

  const items2: MenuProps['items'] = ['Home', 'Profile', 'Logout'].map((key, index) => ({
    key,
    label: (
      <Link to={navigationItems2[index].href} style={{ textDecoration: 'none' }}>{key}</Link>
    ),
  }));

  const renderNavHandle = () => {
    if(!tokens) {
      return <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
    }
    return <Menu theme="dark" mode="horizontal" items={items2} />
  }

  return (
    <div>
      <Header className="header">
        <nav>
          {renderNavHandle()}
        </nav>
      </Header>
    </div>
  );
}