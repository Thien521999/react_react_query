import React from 'react'
import { useParams } from 'react-router-dom'
import ProductInfo from '../components/ProductInfo'
// import useQuery from '../hooks/useQuery'
import {useQuery} from "react-query";
import { getData } from '../api/productAPI';

const ProductDetail = () => {
  const { id } = useParams()
  // const { data: product, loading, error } = useQuery(
  //   `/products/${id}`,
  //   { saveCache: true, refetchInterval: 0 }
  // )

  const key = `/products/${id}`;
  const {data: product, isLoading, error} = useQuery(key, getData, {
    enabled: !!id
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