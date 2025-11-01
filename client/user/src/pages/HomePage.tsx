import React from "react";
import HomeNavBar from "../components/HomePage/HomeNavBar";
import ProductList from "../components/HomePage/ProductList";
import Layout from "../components/HomePage/Layout";
import PromotionBanner from "../components/HomePage/PromotionBanner";
import ShoppingDiscountBanner from "../components/HomePage/ShoppingDiscountBanner";
import TestimonialSlider from "../components/HomePage/TestimonialSlider";
import ProductRow from "../components/HomePage/ProductRow";

const HomePage = () => {
  return (
 <>
  <Layout>
  <HomeNavBar />
  <ProductList />
  <PromotionBanner/>
  <ShoppingDiscountBanner/>
  <TestimonialSlider/>
  <ProductRow/>
</Layout>

 </>
    
   
  );
};

export default HomePage;
