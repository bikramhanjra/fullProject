import { Box, Typography } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';
import { brown } from "@mui/material/colors";
export default function Footer() {
  return (
    <Box sx={{textAlign:'center', bgcolor:brown[900], color:'white', p:3}}>
        <Box sx={{margin:2,
            "& svg" :{
                fontSize:'60px',
                cursor:'pointer',
                marginRight:'2'
            },
            "& svg:hover":{
                color:'goldenrod',
                transform:'translateX(5px)',
                transition:'all 400ms'
            }
        }}>
            <InstagramIcon/>
            <TwitterIcon/>
            <YouTubeIcon/>
            <GitHubIcon/>
        </Box>
        <Typography variant='h5' sx={{'@media (max-width:600px)':{
            fontSize:'1rem'
        }}}>
            All Right Reserved &copy; School
        </Typography>
    </Box>
  )
}
