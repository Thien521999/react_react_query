import { useMemo, useState, useEffect } from "react";
// import useQuery from '../hooks/useQuery'
import { useQuery, useQueryClient } from "react-query";
import { getData } from "../api/productAPI";
import Pagination from "../components/Pagination";
import Products from "../components/Products";
import Sorting from "../components/Sorting";
import { useMyContext } from "../context/store";

const Home = () => {
  const [limit] = useState(5);
  const {
    page,
    sort,
    // refetching
  } = useMyContext();

  const queryClient = useQueryClient();

  // const newData = {
  //   products: [
  //     {
  //       _id: "6301dc919fe0d85829b6ed64",
  //       title: "B",
  //       image:
  //         "https://images.unsplash.com/photo-1660906864957-e93f91f1f0ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
  //       description: "B",
  //       category: "BB",
  //       price: 324,
  //       createdAt: "2022-08-21T07:19:45.477Z",
  //       updatedAt: "2022-08-21T07:19:45.477Z",
  //       __v: 0,
  //     },
  //     {
  //       _id: "6301dc2e9fe0d85829b6ed56",
  //       title: "A",
  //       image:
  //         "https://images.unsplash.com/photo-1660866838668-004d510cfd3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
  //       description: "AA",
  //       category: "AA",
  //       price: 123,
  //       createdAt: "2022-08-21T07:18:06.404Z",
  //       updatedAt: "2022-08-21T07:18:06.404Z",
  //       __v: 0,
  //     },
  //     {
  //       _id: "62f7bb9a00e8a1614d9e4828",
  //       title: "DANVOUY Womens T Shirt Casual Cotton Short",
  //       image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
  //       description:
  //         "95% Cotton, 5% Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
  //       category: "women's clothing",
  //       price: 12.99,
  //       createdAt: "2022-02-07T07:13:05.120Z",
  //       updatedAt: "2022-02-07T07:13:05.120Z",
  //       __v: 0,
  //     },
  //     {
  //       _id: "62f7bb9a00e8a1614d9e4829",
  //       title: "Opna Women's Short Sleeve Moisture",
  //       image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
  //       description:
  //         "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
  //       category: "women's clothing",
  //       price: 7.95,
  //       createdAt: "2022-02-07T07:12:59.767Z",
  //       updatedAt: "2022-02-07T07:12:59.767Z",
  //       __v: 0,
  //     },
  //     {
  //       _id: "62f7bb9a00e8a1614d9e482a",
  //       title: "MBJ Women's Solid Short Sleeve Boat Neck V ",
  //       image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
  //       description:
  //         "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
  //       category: "women's clothing",
  //       price: 9.85,
  //       createdAt: "2022-02-07T07:12:53.613Z",
  //       updatedAt: "2022-02-07T07:12:53.613Z",
  //       __v: 0,
  //     },
  //   ],
  // };

  const key = `/products?limit=${limit}&page=${page}&sort=${sort}`;
  const key1 = `/products?limit=${limit}&page=${page + 1}&sort=${sort}`;

  queryClient.setQueryData("keys", { k1: key, k2: "" });

  // Prefetching thang nay dung vs NextJs la nhieu ,trong thuc te su dung rat it vi co mot so tac dung phu
  useEffect(() => {
    (async () => {
      await queryClient.prefetchQuery(key1, getData);
    })();
  }, [key1, queryClient]);

  const {
    data,
    isFetching,
    error,
    // refetch,
    isPreviousData,
  } = useQuery({
    queryKey: key,
    queryFn: getData,
    keepPreviousData: true,
    cacheTime: 60 * 1000 * 10, //sau 10 phút se xoá cache đi,  defautl là 3 phút,
    // initialData: newData, //data thật, dc save trong catch
    // placehoderData: newData, //data gia, ko dc save trong catch,
    // initialDataUpdatedAt: 10, //sau 10 ms se tim nap lai du lieu
  });

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
