import { Typography } from '@mui/material'


// eslint-disable-next-line react/prop-types
const Title = ({title}) => {
  return (
    <div>
         <div style={{textAlign:'center'}}>
            <Typography variant='h1' color='white'>{title}</Typography>
        </div>
    </div>
  )
}

export default Title