import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getInfiniteData } from "../api/productAPI";
import Products from "../components/Products";
import Sorting from "../components/Sorting";
import { useMyContext } from "../context/store";
import useInfinityQuery from "../hooks/useInfinityQuery";

const Search = () => {
  const { value } = useParams();
  console.log(value);
  const { sort } = useMyContext();

  const [limit, setLimit] = useState(2);

  const key = `/products?search=${value}&sort=${sort}&limit=${limit}`;

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    // eslint-disable-next-line no-undef
  } = useInfiniteQuery(key, getInfiniteData, {
    getNextPageParam: (lastPage, pages) => {
      console.log({lastPage, pages});
      const {products} = lastPage;
      if(products.length >= limit) {
        return pages.length + 1;
      }else {
        return undefined;
      }
    },
  });
  console.log({ hasNextPage, isFetchingNextPage });

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
      >
        Load more
      </button>
    </>
  );
};

export default Search;
