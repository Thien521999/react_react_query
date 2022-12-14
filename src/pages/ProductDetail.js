import React from 'react'
import { useParams } from 'react-router-dom'
import ProductInfo from '../components/ProductInfo'
// import useQuery from '../hooks/useQuery'
import {  useQueryClient } from "react-query";
import {useQuery} from "react-query";
import { getData } from '../api/productAPI';

const ProductDetail = () => {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const keys = queryClient.getQueryData('keys');

  const key = `/products/${id}`;
  const {data: product, isLoading, error} = useQuery(key, getData, {
    enabled: !!id,
    cacheTime: 0, // tat save data in cache
    initialData: () => {
      if(keys?.k1) {
        const data = queryClient.getQueryData(keys?.k1);
        const product = data.products.find( d => d._id === id);
        return product;
      }

      if(keys?.k2) {
        const pages = queryClient.getQueryData(keys?.k2)?.pages;

        //// cach viet 1
        // pages.map(page => {
        //   return page.products.forEach(d => {
        //     if(d._id === id) {
        //       product = d;
        //     }
        //   })
        // })

        // cach viet 2
        const products = pages.reduce((result, current)=>{
          return [...result, ...current.products];
        }, [])
        return products.find(d => d.id === id);
      }
    }
  });

  return (
    <main>
      { product && <ProductInfo product={product} /> }
      { isLoading && <p style={{textAlign: 'center'}}>Loading...</p> }
      { error && <p style={{textAlign: 'center'}}>{error.message}</p> }
    </main>
  )
}

export default ProductDetail