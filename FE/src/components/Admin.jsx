import React, { Component } from 'react';
import { Tabs } from 'antd';
import Znamka from "./AdminTabs/Znamka"
import Modeli from "./AdminTabs/Modeli"
import Goriva from "./AdminTabs/Goriva"
import Menjalnik from "./AdminTabs/Menjalnik"
import Vrata from "./AdminTabs/Vrata"
import Uporabniki from "./AdminTabs/Uporabniki"

    
class Admin extends Component {
  constructor(props) {
    super(props);   
    this.state = {   }
  } 

  render() {

    const items = [
      {
        key: '1',
        label: 'Znamke',
        children: <Znamka/>,
      },
      {
        key: '2',
        label: 'Modeli',
        children: <Modeli/>,
      },
      {
        key: '3',
        label: 'Goriva',
        children: <Goriva/>,
      },
      {
        key: '4',
        label: 'Menjalniki',
        children: <Menjalnik/>,
      },
      {
        key: '5',
        label: 'Vrata',
        children: <Vrata/>,
      },
      {
        key: '6',
        label: 'Uporabniki',
        children: <Uporabniki/>,
      },
    ];

    return (
      <Tabs defaultActiveKey="1" items={items} destroyInactiveTabPane />
    )
  }
}

export default Admin;
