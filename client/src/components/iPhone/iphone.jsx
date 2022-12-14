import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './iphone.css';
import Product from '../Product/Product';
import { Spin } from 'antd';
import Axios from 'axios';
function Iphone() {
    const [cv_products, setCv_products] = useState([]);
    useEffect(() => {
        Axios.get('/api/iphone').then((data) => {
            setCv_products(data.data);
        });
    }, []);
    const show1 = () => {
        if (cv_products.length > 0) {
            let result = Array.from(cv_products)
                .slice(0, 6)
                .map((item, index) => {
                    return (
                        <Product
                            key={index}
                            name={item.name}
                            url={item.url}
                            id={item._id}
                            price={item.price}
                            type={item.type}
                        />
                    );
                });
            return result;
        } else {
            return;
        }
    };
    const show2 = () => {
        if (cv_products.length > 0) {
            let result = Array.from(cv_products)
                .slice(6, 12)
                .map((item, index) => {
                    return (
                        <Product
                            key={index}
                            name={item.name}
                            url={item.url}
                            id={item._id}
                            price={item.price}
                            type={item.type}
                        />
                    );
                });
            return result;
        } else {
            return;
        }
    };
    return (
        <div className="awe-section-4">
            <div className="container">
                <div className="title">
                    <div className="tile-name">
                        <span>iphone</span>
                    </div>
                    <div className="btn_menu">
                        <ul>
                            <li style={{ fontWeight: '600' }}>
                                <Link className="menu_item" to="/iphone">
                                    Xem t???t c???
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="btn-left btn-left-cv">
                        <i className="fas fa-chevron-left"></i>
                    </div>
                    <div className="btn-right btn-right-cv">
                        <i className="fas fa-chevron-right"></i>
                    </div>
                </div>
                <div className="list_products">
                    {/* <div className="logo_product">
            <img src={converse_logo1} alt="" />
            <img src={converse_logo2} alt="" />
          </div> */}
                    <div className="owls">
                        {/* Owl-item */}
                        {cv_products.length === 0 ? (
                            <div className="spin">
                                <Spin size="large" />
                            </div>
                        ) : (
                            ''
                        )}
                        <div className="list_items list_items-cv">{show1()}</div>
                        <div className="list_items list_items-cv">{show2()}</div>
                        {/* End owl */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Iphone;
