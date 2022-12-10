import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import "./Main.css"
function Main()
{
    const navigate = useNavigate();

    const navigateToRecipe = () => {
      navigate('/Recipes');
    };

    return <div className="App">
              <header className="App-header">
              <p style={{fontSize: '30px',}}>
                  Cook like a chef
              </p>
              <img src='/cheft.png' className="App-logo" alt="logo" style={{boxShadow : 'none'}}/>
              <br/><br/>
              <Button sx={{border: '1px solid rgba(0, 0, 0, 0.45)', color: 'rgba(0, 0, 0, 0.45)',fontSize: '1 rem',fontWeight: 550}} className="App-link" variant="outlined" onClick={navigateToRecipe}>Get Started</Button>
            </header>
          </div>
}
export default Main