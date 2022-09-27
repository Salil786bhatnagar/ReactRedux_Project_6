import React,{useState, useEffect} from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Header/HeaderPage';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function ProductPage() {
  const classes = useStyles();
  const [getValue, setValue]=useState([]);
  const dispatch = useDispatch();

  const addToCart=(item)=>{ 
    dispatch({type:'ADD_CART',payload:[item.id,item]})
  }

  

  useEffect(()=>{
    const getData=async()=>{
      const getApi = await fetch('https://dummyjson.com/products');
      const  showData = await getApi.json();
      console.warn("productData",showData);
      setValue(showData.products);
   }
    getData();
    // fetchProductDetails()
  },[])

  const fetchProductDetails=()=>{
    return(
          getValue.map((item)=>{
            return(
            <div className='cart-main-page'>
              <div className='product-img'>
                   <span>
                       <img src={item.images[0]} width='100px' height='100px' />
                   </span>
               </div>
                   <div className='product-brand'>
                       <span>
                       <h6>Brand:{item.brand}</h6> 
                       </span>
                     </div> 
                     <div className='product-category'>
                       <span>
                       <h6>Category:{item.category}</h6> 
                       </span>
                     </div>     
                     <div className='product-price'>
                           <span>
                               <h6>Product Price:{item.price}</h6> 
                           </span>
                       </div>
                   <div className='add-cart-btn'>
                     <Button className='add_btn' onClick={()=>addToCart(item)} variant="contained" color="primary">Add to cart</Button>
                   </div> 
             </div>
      
            )
          })
       )
  }



  return (
    <div >
      <Header/>
        <h2>ProductPage</h2><br/>
         <div className='main-container-page'>
           {fetchProductDetails()}
         </div>
     </div>
  )
}
