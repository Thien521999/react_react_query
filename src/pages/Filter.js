import { useEffect, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { getInfiniteData } from "../api/productAPI";
import Products from "../components/Products";
import Sorting from "../components/Sorting";
import { useMyContext } from "../context/store";
// import {useInfinityQuery} from "../hooks/useInfinityQuery";
import { useInview } from "../hooks/useInview";

const Filter = () => {
  const { option, value } = useParams();
  const { sort } = useMyContext();

  const [limit, ] = useState(2);

  const {inview, ref} = useInview()

  const queryClient = useQueryClient();

  const key = `/products?price[${option}]=${value}&sort=${sort}&limit=${limit}`;

  queryClient.setQueryData('keys', {k1: '', k2: key});
  

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    // eslint-disable-next-line no-undef
  } = useInfiniteQuery(key, getInfiniteData, {
    getNextPageParam: (lastPage, pages) => {
      const {products} = lastPage;
      if(products.length >= limit) {
        return pages.length + 1;
      }else {
        return undefined;
      }
    },
  });
  
  // isFetchingNextPage lan dau tien no la false, tu lwn 2 tro di no moi thuc hien(excute)


  useEffect(() => {
    if(inview) {
      fetchNextPage();
    }
  }, [inview, fetchNextPage])

  return (
    <>
      <Sorting />
      <div className="products">
        {data?.pages.map((page, index) => (
          <Products key={index} products={page?.products} />
        ))}
      </div>
      {isFetching && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ textAlign: "center" }}>{error}</p>}

      <button
        className="btn-load_more"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        ref={ref}
        style={{display: (data && hasNextPage) ? 'block' : 'none'}}
      >
        Load more
      </button>
    </>
  );
};

export default Filter;
