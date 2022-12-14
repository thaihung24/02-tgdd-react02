import React,{useState,useEffect} from 'react'

import MenuTop from './MenuTop'
import ListProduct from './ListProduct'
import { menuSpeaker } from './data'
import banner from '../../assets/images/accessories/speaker.png'
import productHandler from "../../features/product/function";
import { Link } from 'react-router-dom'


const Speaker = () => {
  const [listProduct,setListProduct] = useState()
  const [showSub,setShowSub] = useState({
    manufacturerId: 0,
    categoryId: 4,
    subCategoryId: 9,
    page: 1,
    size: 10,
  });
  useEffect(() => {
    const fetchProduct = async () => {
      let res = await productHandler.getProductList(showSub);
      try {
        setListProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [showSub]);
  return (
    <div className='speaker list-product-same'>
      
        <div className="banner"><img src={banner} alt="" /></div>

        <MenuTop menuTop={menuSpeaker} />


        <ListProduct listProduct={listProduct}
                    quantityShow={10} />

        <button className='btnViewMore'><Link to='/loa-laptop'>XEM TẤT CẢ CÁC LOA CHÍNH HÃNG</Link></button>
    </div>
  )
}

export default Speaker
