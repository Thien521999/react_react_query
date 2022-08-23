import React, { useRef } from "react";
import { createProduct, handleError, updateProduct } from "../api/productAPI";
// import useMutation from '../hooks/useMutation';
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const ProductForm = ({ btnTxt, data }) => {
  const multiRef = useRef();

  const queryClient = useQueryClient();
  const keys = queryClient.getQueryData("keys");

  // ghi dai
  // const create = useMutation((data) => createProduct(data));
  //optimazation
  const create = useMutation(createProduct, {
    onSuccess: (data) => toast.success("Create Product Success!!"),
    onError: (err) => handleError(err),
    onSettled: () =>
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.startsWith("/products"),
      }),
  });

  const update = useMutation(updateProduct, {
    // dc thuc thi khi kick hoat su kien click update
    onMutate: (data) => {
      console.log(data);
      if (!keys?.k1) return;

      queryClient.setQueryData(keys?.k1, (oldData) => {
        const products = oldData?.products.map((product) =>
          product._id === data.id ? { ...product, ...data.newData } : product
        );
        console.log({ oldData, products });
        return { ...oldData, products };
      });
    },
    // 3 thang con lai dc thuc thi server phan hoi
    onSuccess: (data) => toast.success("Update Product Success!!"),
    onError: (err) => handleError(err),
    onSettled: () => {
      if (keys?.k2) queryClient.invalidateQueries(keys?.k2);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const children = multiRef.current.children;

    const newData = [...children].reduce((obj, child) => {
      if (!child.name) return obj;
      return { ...obj, [child.name]: child.value };
    }, {});

    if (data) {
      const newArr = { ...newData, price: Number(newData.price) };
      const result = shallowEqual(newArr, data);
      if (result) return;
      // mutate(() => updateProduct({id: data._id, newData}))
      update.mutate({ id: data._id, newData });
    } else {
      // mutate(() => createProduct(newData))
      create.mutate(newData);
    }
  };

  function shallowEqual(obj1, obj2) {
    const keys = Object.keys(obj1);

    for (let key of keys) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  }

  return (
    <div className="product_form">
      <form ref={multiRef} onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Product title"
          required
          defaultValue={data?.title}
        />

        <input
          type="text"
          name="description"
          placeholder="Product description"
          required
          defaultValue={data?.description}
        />

        <input
          type="text"
          name="price"
          placeholder="Product price"
          required
          defaultValue={data?.price}
        />

        <input
          type="text"
          name="category"
          placeholder="Product category"
          required
          defaultValue={data?.category}
        />

        <input
          type="text"
          name="image"
          placeholder="Product image"
          required
          defaultValue={data?.image}
        />

        <button disabled={create.isLoading || update.isLoading}>
          {create.isLoading || update.isLoading ? "Loading.." : btnTxt}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
