import React from 'react'
// hooks
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import Back_image from "../images/image_1.jpg"
import "../login/Login.css"
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { MenuItem } from '@mui/material'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@mui/material';
import { Area_type, land_area } from '../actions/nutrientaction'


export default function  FertilizerCalculator () {

    const [district, setdistrict] = useState([])
    const [crop_name ,setcrop_name] = useState('')
    const [Land_area ,setLand_area] = useState('')
    const [nitrogen, setnitrogen] = useState(0)
    const [phosporus, setphospours] = useState(0)
    const [potash, setpotash] = useState(0)
    const [area_type,setarea_type] = useState("kg/hectare")
    const [urea, seturea] = useState(0)
    const [amountofcrop, setamountofcrop] = useState(0)
    const [showfertilizer, setshowfertilizer] = useState(false)
    const [fertilizerlist, setfertilizerlist] = useState([])
    const [total_data , settotal_data] = useState([])
    const [cal_done, setcal_done] = useState(false)
    const ipaddr = useSelector(state => state.ipreducer)
    const innerhtml = useSelector(state => state.innerhtmlcontroller)

    const dispatch = useDispatch();
    const language = useSelector(state => state.languagereducer)

    useEffect(() => {
        console.log("thisis is thasd kfj")
        setshowfertilizer(true) 
    }, [potash])

    const history = useHistory();

  const navigate = (routepath) => {
    if (routepath) {
      history.push(routepath);
    } else {
      alert("Route path not available for this item yet");
    }
  };


    async function calculate() {

        console.log("dasf")
        console.log(language)
        var resp = await fetch(`http://${ipaddr}/crop/filter`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ language: language, crop: crop_name.toUpperCase(), district: "" })
        })
            .then((response) =>{
                
                 return response.json()
            })
            .then(json => json)
            .catch((error)=>{
                console.log(error)
            })

        settotal_data(resp[0])
        setcal_done(true);
        console.log(resp)
        
    }

    const area_type_red = useSelector((state)=> state.Area_type_reducer)  
    const land_area_red = useSelector((state)=> state.land_area_reducer)  
    
    function upload(){

        dispatch(Area_type(area_type))
        dispatch(land_area(Land_area))        
        
        navigate("/NutrientsDetails")        
        
        // console.log(area_type_red)
        // console.log(land_area_red)
    
    }
        
    return (       
        <div>
          <div className='Login'>        

        <div class="fill-screen">
            <img class="make-it-fit" src = {Back_image}/>
            
            <div className='form_1'>
                
                <Container component="main"  className="form_man">
                    <div className="sign_in">
                        {/* {innerhtml.fertilizercalculator} */}
                        Fertilizer Calculator
                    </div>
                    
                    <form style={{width :"100%"}}   >
                        
                        <Grid container spacing={2}  >                            
                            <Grid item xs={12} sm={12} >                                                                            
                                <TextField                                
                                    id="outlined-error-helper-text"
                                    defaultValue={area_type}
                                    fullWidth                                    
                                    onChange={(e)=>{setarea_type(e.target.value) }}                                    
                                    variant="outlined"
                                    select
                                    
                                >  
                                <MenuItem value ="kg/hectare">kg/hectare</MenuItem>                                        
                                <MenuItem value = "kg/acre" >kg/acre</MenuItem>
                                <MenuItem value ="lb/hectare">lb/hectare</MenuItem>                                        
                                <MenuItem value = "lb/acre" >lb/acre</MenuItem>
                                
                                </TextField>


                            </Grid>                                
                                                        
                            <Grid item xs={12} sm={12} >                                                                            
                                <TextField                                
                                    id="outlined-error-helper-text"
                                    label = {`Enter area in ${area_type.substring(3)}`}
                                    fullWidth           
                                    required
                                    onChange={(e)=>{setLand_area(e.target.value)}}                                    
                                    variant="outlined"
                                    type = "number" 
                                />                                          
                            </Grid>        

                            <Grid item xs={12} sm={12} >                                                                            
                                <TextField                                
                                    id="outlined-error-helper-text"
                                    label = {`Enter crop name`}
                                    fullWidth           
                                    required
                                    onChange={(e)=>{setcrop_name(e.target.value)}}                                    
                                    variant="outlined"
                                    
                                />                                          
                            </Grid>        

                        </Grid>

                        <Button variant='contained' color ="primary" style ={{width :"100%", marginTop :"20px" , marginBottom :"20px" }} onClick={upload} >
                            Next
                        </Button>
                        
                        {/* <input type = "submit"/> */}

                        
                     </form>     
                    {/* <form action=''>
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username" required></input>
                        <input type="submit" />
                    </form> */}

                    
                        
                    
                
                </Container>
            </div>
        </div>

        </div>

    </div>
    )
}
