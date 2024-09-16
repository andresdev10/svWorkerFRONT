import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Title from "../title/Title"
import './Home.component.css';
import { getInfo, sendCategory, getInfoScraping, sendUrl } from '../../services/info/info.js';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import AddIcon from '@mui/icons-material/Add';
import MyModal from '../modal/Modal.jsx';



const Home = () => {
  const [platform, setPlatform] = useState('');
  const [ info, setInfo ] = useState([]);
  const [ infoCategory, setInfoCategory ] = useState([]);
  const [category, setCategory] = useState('');
  const [ dataScraping, setDataScraping ] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
 
  const [newData, setNewData] = useState({ urls: [{platform:"", url:"", category:""}]});

  console.log("newData", newData)

  const handelNewData = (e, index) => {
    const { name, value } = e.target
   
    setNewData((prevState) => {
      const updatedUrls = [...prevState.urls]; // Copia del array actual
      updatedUrls[index] = { ...updatedUrls[index], [name]: value }; // Actualiza solo el campo correspondiente
  
      return { urls: updatedUrls };
    });
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const ok = () => {
    setIsModalVisible(false);
    setNewData({ urls: [{platform: "", url: "", category: ""}]});
  }

  const handleSendUrl = async (newData) => {
    try {
      await sendUrl(newData)
      Swal.fire({
        icon: "success",
        title:"Guardando Url",
        text: "Url Agregada!!!",
        timer: 2000
      })
    setNewData({ urls: [{platform: "", url: "", category: ""}]});
    setIsModalVisible(false);
    } catch (error) {
      console.log("error: ", error)
      Swal.fire({
        icon: "error",
        title:"Error",
        text: "Ocurrio Algo Inesperado",
        timer: 2000
      })
      setNewData({ urls: [{platform: "", url: "", category: ""}]});
      setIsModalVisible(false);
    }
  }

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
      <MyModal isModalVisible={isModalVisible} ok={ok}  info={info}  handelNewData={handelNewData} newData={newData} handleSendUrl={handleSendUrl}/>
      <div className='container-head'>
      <Title className="title" title={"Home"}/>
      <Button variant="contained" size="large" startIcon={<AddIcon />} onClick={showModal}>Add URL</Button>
      </div>
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
                      <p style={{fontWeight:'bolder', fontSize:'20px'}}>Followers {row.followers || 0}</p>
                      {/* <img src={row.photo} alt="photo" style={{ width: '100px', height: 'auto' }}/> */}
                      </div>
                      <div className='subContainer-posts'>
                        <h3>POST</h3>
                        {/* <img src={row.LinkPhotPosts} alt="photo Post" style={{ width: '150px', height: 'auto' }}/> */}
                        {row.LinkPhotPosts?.map((url, idx) => (
                            <img
                              key={idx}
                              src={url}
                              alt={`Photo Post ${idx + 1}`}
                              style={{ width: '150px', height: 'auto', margin: '5px' }}
                            />
                          ))}
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