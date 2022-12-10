import React,{useState,useEffect} from 'react'
import "./Recipes.css"
import {  Link, useParams } from "react-router-dom";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import RestaurantSharpIcon from '@mui/icons-material/RestaurantSharp';
import { Input, Space } from 'antd';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import RamenDiningOutlinedIcon from '@mui/icons-material/RamenDiningOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

const { Search } = Input;
export const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

  const Item = styled(Paper)(({ theme }) => ({
     padding: theme.spacing(1),
     textAlign: 'justify',
  })); 



const initial ={
  "id": '',
  "title": "",
  "image": "",
  "summary": "",
  "readyInMinutes": "",
  "servings": "",
  "extendedIngredients": [{}],    
  "analyzedInstructions": [{"name": "", "steps": [{}]}],
 
}
    export function RecipeDetail() {

      const [detail, setDetail] = useState(initial);
      let {recipeID} = useParams()
      
      const getDetail = () => {
        console.log(recipeID)        
        const url = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${API_KEY}`
        console.log(url)

         fetch(url).then(response => {
          response.json().then(data => {
            console.log("getDetail data");
            console.log(data)
            let result =  data 
            console.log("tesr")
            console.log(result)
            setDetail(result)
            console.log("tesr2")
         
          })
        })
   
      };  
    
      useEffect(() => {
        getDetail()
      }, []);

      
      return <div >
                <h1>{detail.title}</h1>
                <div className='summary'>
                    <img src={detail.image} alt="" /> 
                    <div style={{ boxShadow : '5px 5px 4px 2px rgba(0, 0, 0, 0.27)', padding:'2rem'}}>            
                        <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'end'}}><AccessAlarmOutlinedIcon/> {detail.readyInMinutes} min Duration
                        &nbsp;&nbsp;&nbsp;&nbsp;<PermIdentityOutlinedIcon/>{detail.servings} servings
                        </div>            
                        <p dangerouslySetInnerHTML={{__html: detail.summary}} />
                    </div>
                    
                </div>
                <div className='detail' >
                        <Box sx={{ width: '100%'  }}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid xs={6} >
                            <Item sx={{ boxShadow : '5px 5px 4px 2px rgba(0, 0, 0, 0.27)'}}>
                            <h3 style={{ display: 'flex', alignItems: 'center',}}><RamenDiningOutlinedIcon/>Ingredient </h3>
                            <ul>
                                {detail.extendedIngredients?.map((ingredient,index) => {
                                    return <li key={index}>{ingredient.original}</li>
                                })}
                                </ul>
                            </Item>
                        </Grid>
                        <Grid xs={6}>
                            <Item sx={{ boxShadow : '5px 5px 4px 2px rgba(0, 0, 0, 0.27)'}}> 
                            <h3 style={{ display: 'flex', alignItems: 'center',}}><MenuBookOutlinedIcon/> Instruction</h3>
                            <ul>
                                {detail.analyzedInstructions[0].steps?.map((product,index) => {
                                return <li key={index}>{product.step}</li>;
                                })}
                            </ul>
                            </Item>
                        </Grid>
                        </Grid>
                        </Box>
                    </div>  
            </div>
    }

    
function Recipes (){
  const [recipes, setRecipes] = useState([]);
  const [typeQuery, setTypeQuery] = useState("");
  const [CuisineQuery, setCuisineQuery] = useState("");

    useEffect(() => {
      getData ()
        console.log("receipt page useEffect")
        console.log(recipes)
      }, []);
    
      const getData = () => {
        const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&type=American`
        console.log(url)
        fetch(url).then(response => {
          response.json().then(jsonData => {
            console.log("getRandom jsonData");
            console.log(jsonData)
            setRecipes(jsonData.results)
          })
        })   
      };

  const getCuisine = (cuisine) => {
    console.log(cuisine)
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&type=${typeQuery}&cuisine=${cuisine}`
    console.log(url)
        fetch(url).then(response => {
          return response.json().then((jsonData) => {
            console.log(jsonData);
            setCuisineQuery(cuisine)
            setRecipes(jsonData.results);
          })
        })
        console.log(recipes);
  };

  const getType = (type) => {
    console.log(type)
    
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&type=${type}`
    console.log(url)
        fetch(url).then(response => {
          return response.json().then((jsonData) => {
            console.log(jsonData);
            setTypeQuery(type)
            setRecipes(jsonData.results);
          })
        })
        console.log(recipes);
  };

  const onSearch = (value) => 
  {
    console.log(value)
    getCuisine(value)
  };

    return (
      <div className="site-layout-content">
        <h1> Recipes</h1>
        <Stack direction="row" spacing={2}>
          <Button startIcon={<AccessTimeOutlinedIcon />} sx={{border: '1px solid rgba(0, 0, 0, 0.45)', color: 'rgba(0, 0, 0, 0.45)'}} variant="outlined"  onClick={() => {getType('main course');}}>main course</Button>
          <Button startIcon={<AccessTimeOutlinedIcon />} sx={{border: '1px solid rgba(0, 0, 0, 0.45)', color: 'rgba(0, 0, 0, 0.45)'}} variant="outlined"  onClick={() => {getType('side dish');}}>side dish</Button>
          <Button startIcon={<AccessTimeOutlinedIcon />} sx={{border: '1px solid rgba(0, 0, 0, 0.45)', color: 'rgba(0, 0, 0, 0.45)'}} variant="outlined"  onClick={() => {getType('dessert');}}>dessert </Button>
          <Button startIcon={<AccessTimeOutlinedIcon />} sx={{border: '1px solid rgba(0, 0, 0, 0.45)', color: 'rgba(0, 0, 0, 0.45)'}} variant="outlined"  onClick={() => {getType('appetizer');}}>appetizer</Button>

          <Search
            placeholder="Search By Cuisine"
            allowClear
            onSearch={onSearch}
            style={{
              width: 300,                 
            }}     
          />
        </Stack>       

        <ImageList style={{ overflow: "hidden" }}
        sx={{
          width: 'auto',
          transform: 'translateZ(0)',
          overflowY: 'none',
        }}
        rowHeight={200}
        gap={8}
      >
        {recipes.map((item) => {
          const cols = item.featured ? 2 : 1;
          const rows = item.featured ? 2 : 1;

          return (
            <Link to={`/Recipes/${item.id}`} key={item.id}>
            <ImageListItem  cols={cols} rows={rows} >
             
              <img
                {...srcset(item.image, 250, 200, rows, cols)}
                alt={item.title}
                loading="lazy" />
              <ImageListItemBar
                sx={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                }}
                title={item.title}
                position="top"
                actionIcon={<IconButton
                  sx={{ color: 'white' }}
                  aria-label={`star ${item.title}`}
                >
                  <RestaurantSharpIcon />
                </IconButton>}
                actionPosition="left" />
            </ImageListItem> </Link>
          );
        })}
      </ImageList></div>
      
    );


}

export default Recipes