import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "screens/landing_page";
import {
PaymentCreate, PaymentEdit, PaymentView, 
Products, 
CategoryCreate, CategoryEdit, CategoryView, 
OrderTiles, 
Customers, 
CategoryTiles, 
ProductCreate, ProductEdit, ProductView, 
ShoppingCartTiles, 
ShoppingCartCreate, ShoppingCartEdit, ShoppingCartView, 
OrderCreate, OrderEdit, OrderView, 
CustomerCreate, CustomerEdit, CustomerView, 
PaymentTiles
} from "screens";

const Component = (props) => {

    return (
        <Routes>
            

                                                <Route path="/EcommerceWebsite/html" element={<LandingPage {...props} title={'LandingPage'} nolistbar={true} />} />
                                                        <Route path="Payments/view/:id" element={<PaymentView {...props} title={'View Payment'} />} />
                        <Route path="Payments/edit/:id" element={<PaymentEdit {...props} title={'Edit Payment'} />} />
                        <Route path="Payments/create" element={<PaymentCreate {...props} title={'Create Payment'} />} />
                                                                                                                                                <Route path="/" element={<Products {...props} title={'Product Table'} nolistbar={true} />} />
                                                                    <Route path="Categories/view/:id" element={<CategoryView {...props} title={'View Category'} />} />
                        <Route path="Categories/edit/:id" element={<CategoryEdit {...props} title={'Edit Category'} />} />
                        <Route path="Categories/create" element={<CategoryCreate {...props} title={'Create Category'} />} />
                                            <Route path="Products/view/:id" element={<ProductView {...props} title={'View Product'} />} />
                        <Route path="Products/edit/:id" element={<ProductEdit {...props} title={'Edit Product'} />} />
                        <Route path="Products/create" element={<ProductCreate {...props} title={'Create Product'} />} />
                                            <Route path="ShoppingCarts/view/:id" element={<ShoppingCartView {...props} title={'View ShoppingCart'} />} />
                        <Route path="ShoppingCarts/edit/:id" element={<ShoppingCartEdit {...props} title={'Edit ShoppingCart'} />} />
                        <Route path="ShoppingCarts/create" element={<ShoppingCartCreate {...props} title={'Create ShoppingCart'} />} />
                                            <Route path="Orders/view/:id" element={<OrderView {...props} title={'View Order'} />} />
                        <Route path="Orders/edit/:id" element={<OrderEdit {...props} title={'Edit Order'} />} />
                        <Route path="Orders/create" element={<OrderCreate {...props} title={'Create Order'} />} />
                                            <Route path="Customers/view/:id" element={<CustomerView {...props} title={'View Customer'} />} />
                        <Route path="Customers/edit/:id" element={<CustomerEdit {...props} title={'Edit Customer'} />} />
                        <Route path="Customers/create" element={<CustomerCreate {...props} title={'Create Customer'} />} />

                <Route path="/category_tiles" element={<CategoryTiles {...props} title={'Category Tiles'} />} />
                <Route path="/customer_table" element={<Customers {...props} title={'Customer Table'} />} />
                <Route path="/payment_tiles" element={<PaymentTiles {...props} title={'Payment Tiles'} />} />
                <Route path="/order_tiles" element={<OrderTiles {...props} title={'Order Tiles'} />} />
                <Route path="/product_table" element={<Products {...props} title={'Product Table'} />} />
                <Route path="/shoppingcart_tiles" element={<ShoppingCartTiles {...props} title={'ShoppingCart Tiles'} />} />
        </Routes>
    )

};

export default Component;
