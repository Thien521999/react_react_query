import { useMemo, useState, useEffect } from "react";
// import useQuery from '../hooks/useQuery'
import { useQuery } from "react-query";
import { getData } from "../api/productAPI";
import Pagination from "../components/Pagination";
import Products from "../components/Products";
import Sorting from "../components/Sorting";
import { useMyContext } from "../context/store";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(5);

  const { page, sort, refetching } = useMyContext();

  const key = `/products?limit=${limit}&page=${page}&sort=${sort}`;
  const { data, isFetching, error, refetch, isPreviousData } = useQuery({
    queryKey: key,
    queryFn: getData,
    keepPreviousData: true,
    cacheTime: 60 * 1000 * 10, //sau 10 phút se xoá cache đi,  defautl là 3 phút
  });
  console.log(isPreviousData);

  const totalPages = useMemo(() => {
    if (!data?.count) return 0;
    return Math.ceil(data.count / limit);
  }, [data?.count, limit]);

  // useEffect(() => {
  //   refetch();
  // }, [refetching])

  return (
    <main>
      <Sorting page={page} />
      <div className="products">
        {isPreviousData && isFetching ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : (
          data?.products && <Products products={data?.products} />
        )}
      </div>
      {/* {
        data.product && <Products products={data.products} />
      }
      { isLoading && <p style={{textAlign: 'center'}}>Loading...</p> } */}
      {error && <p style={{ textAlign: "center" }}>{error?.message}</p>}
      <Pagination totalPages={totalPages} />
    </main>
  );
};

export default Home;
