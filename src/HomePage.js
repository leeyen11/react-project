import "./HomePage.css"
import FoodBankOutlinedIcon from '@mui/icons-material/FoodBankOutlined';
import React,{useEffect} from 'react'
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import { Breadcrumb, Layout } from 'antd';
import Recipes, {RecipeDetail} from "./Recipes";
import Main from "./Main";
const { Header, Content } = Layout;


function HomePage ()
{   
  useEffect(() => {
      document.body.classList.add('theme')
  }, [])

    return <Layout className="layout" >
    <Header>
      <div className="logo" />
        <div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            fontSize:'28px',
            color: 'white'
        }}>
            <FoodBankOutlinedIcon style={{fontSize: '28px',color: 'var(--gray-800)'}}/>
            <span>Recipe Apps</span>
        </div>  

    </Header>
    <Content style={{ padding: '0 50px'}}>
    <BrowserRouter>
    <Breadcrumb style={{margin: '16px 0'}}> 
      <Breadcrumb.Item> <NavLink to='/'> Home </NavLink></Breadcrumb.Item>
      <Breadcrumb.Item> <NavLink to='/Recipes'> Recipes </NavLink></Breadcrumb.Item>
      </Breadcrumb> 

      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/Recipes/" element={<Recipes/>}>             
        </Route>
        <Route path="/Recipes/:recipeID" element={<RecipeDetail />} />
        <Route path="*" element={<p>Page Not found</p>}/>
      </Routes>
    </BrowserRouter>  
    </Content>   
  </Layout>
 
}
export default HomePage