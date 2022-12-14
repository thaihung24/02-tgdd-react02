import React,{useState,useEffect} from 'react'
import banner from '../../assets/images/accessories/backup-battery.png'

import { menuBackupBattery } from './data'
import { Link } from 'react-router-dom'
import MenuTop from './MenuTop'
import productHandler from "../../features/product/function";
import ListProduct from './ListProduct'

const BackupBattery = () => {

  const [listProduct,setListProduct] = useState()
  const [showSub,setShowSub] = useState({
    manufacturerId: 0,
    categoryId: 4,
    subCategoryId: 5,
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
    <div className='backup-battery list-product-same'
          id='battery'>
      
      <div className='banner'><img src={banner} alt="" /></div>

        <MenuTop menuTop={menuBackupBattery} />


        <ListProduct listProduct={listProduct}
                      quantityShow={10} />
      
        <button className='btnViewMore'><Link to='/sac-dtdd'>XEM TẤT CẢ CÁC SẠC DỰ PHÒNG</Link></button>
    </div>
  )
}

export default BackupBattery
