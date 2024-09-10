import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Title from "../title/Title"
import './Home.component.css';
import { getInfo, sendCategory, getInfoScraping } from '../../services/info/info.js';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';


const Home = () => {
  const [platform, setPlatform] = useState('');
  const [ info, setInfo ] = useState([]);
  const [ infoCategory, setInfoCategory ] = useState([]);
  const [category, setCategory] = useState('');
  const [ dataScraping, setDataScraping ] = useState([]);

  const handleChange = (event) => {
    setPlatform(event.target.value);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  }

  const getData = async () => {
    try {
      const data = await getInfo()
      setInfo(data);
    } catch (error) {
      console.log("error: " , error)
      throw error;
    }
  }  
  useEffect(() => {
    getData()
  },[])


  const getInfoCategory = async (platform) => {
    try {
      if(platform) {
        const resp = await sendCategory(platform)
        setInfoCategory(resp)
      }
    } catch (error) {
      console.log("error: " , error)
      throw error;
    }
  }

  useEffect(()=>{
    getInfoCategory(platform)
  },[platform])

  

  const getDataScraping = async (platform, category) => {
    const swalInstance = Swal.fire({
      title: "Recolectando Datos",
      text: "Espere Por Favor",
      allowOutsideClick: false, // Deshabilita el cierre al hacer clic fuera
      showConfirmButton: false, // Oculta el botón de confirmación
      didOpen: () => {
        Swal.showLoading(); // Muestra el ícono de carga
      }
    });
    try {
      const data = await getInfoScraping(platform, category)
      Swal.close();

      swalInstance.then(() => {
        Swal.fire({
          title: 'Datos Recolectados',
          text: 'El proceso ha terminado con éxito.',
          icon: 'success',
        });
      });
      setDataScraping(data)
    } catch (error) {
      console.log("error: " , error)
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al recolectar los datos.',
        icon: 'error'
      });
      throw error;
    }
  }
  return (
    <div>
      <div><Title title={"Home"}/></div>
      <div className="container-select">
          <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
          <InputLabel id="demo-select-small-label" style={{fontWeight:'bolder'}}>Red Social</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={platform}
            label="platform"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
              info.length == 0 ?
              <MenuItem value={""}>No hay datos</MenuItem>
              :
              info.map((row, i)=>(
                <MenuItem key={i} value={row.name}>{row.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
          <InputLabel id="demo-select-small-label" style={{fontWeight:'bolder'}}>Categoria</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={category}
            label="Age"
            onChange={handleChangeCategory}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
             infoCategory.length == 0 ? 
             <MenuItem value="">No hay Datos</MenuItem>
             :
             infoCategory.map((row,i)=>(
              <MenuItem key={i} value={row}>{row}</MenuItem>
             ))  
            }
          </Select>
        </FormControl>
      </div>
      <div className='container-button'>
      <Button variant="contained" size="large" onClick={()=>{getDataScraping(platform, category)}}>
          Traer Informacion
      </Button>
      </div>
      <div className='container-data'>
          {
            dataScraping?.length == 0 ? 
            <h1>Sin Datos Aun!!!</h1> :
            dataScraping?.data?.map((info)=>(
                info.map((row,i)=>{
                  return (
                    <div className='container-posts' key={i}>
                      <div className='subContainer-img'>
                      <h1>{row.username}</h1> 
                      <p style={{fontWeight:'bolder', fontSize:'20px'}}>Followers {row.followers}</p>
                      <img src={row.photo} alt="photo" style={{ width: '100px', height: 'auto' }}/>
                      </div>
                      <div className='subContainer-posts'>
                        <h3>POST</h3>
                        <img src={row.LinkPhotPosts} alt="photo Post" style={{ width: '150px', height: 'auto' }}/>
                        <span style={{fontWeight:'bolder', fontSize:'25px'}}>{row.contentPost}</span>
                        <p style={{fontWeight:'bolder'}}>{row.date} - {row.time}</p>
                      </div>
                      <div>
                        <p>Plataforma: {row.platform}</p>
                      </div>
                    </div>
                  )
                })  
            ))
              
          
          
          }
      </div>
    </div>
  )
}

export default Home