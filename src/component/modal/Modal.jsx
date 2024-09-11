/* eslint-disable react/prop-types */
import { Modal } from 'antd';
import './Modal.css';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
 
const MyModal = ({isModalVisible, ok, info, handelNewData, newData, handleSendUrl}) => {

    return (
        <div>
        <Modal
            title="Agrega una Nueva URL "
            open={isModalVisible}
            onOk={ok}
            centered
            width={800}
            >
            <div className='container-modal'>
                <div className='subContainer-modal'>
                    <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
                    <InputLabel id="demo-select-small-label" >Plataforma</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                         
                        value={newData.urls[0].platform}
                        label="newPlatform"
                        onChange={(e) => handelNewData(e, 0)}
                        name='platform'
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

                </div>
                <div  className='subContainer-modal'>
                 
                    <TextField id="outlined-basic" label="Url" variant="outlined" size="small" name='url' onChange={(e) => handelNewData(e, 0)}  value={newData.urls[0].url}/>
                </div>
                <div className='subContainer-modal'>
                    <TextField id="outlined-basic" label="newCategory" variant="outlined" size="small" name='category'  onChange={(e) => handelNewData(e, 0)} value={newData.urls[0].category} />
                </div>
            </div>
            <Button variant="contained" size="medium" onClick={()=>{handleSendUrl(newData)}}>Agregar</Button>
            
      </Modal>
        </div>
    )
}

export default MyModal;