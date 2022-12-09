import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
// import { Select } from 'antd';
import itemservice1 from '../../img/item_service1.png';
import itemservice2 from '../../img/item_service2.png';
import itemservice3 from '../../img/item_service3.png';
import itemservice4 from '../../img/item_service4.png';
import ReactImageMagnify from 'react-image-magnify';
import * as cartAction from '../../action/cart.action';
import * as modalAction from '../../action/modal.action';
import 'antd/dist/antd.css';
import './details.css';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
function DetailsPage(props) {
    const dispatch = useDispatch();
    const [valueInput, setValueInput] = useState(1);
    console.log(setValueInput);
    useEffect(() => {
        window.scrollTo(0, 0);
        const btnNextSmall = document.querySelector('.btn-next-small');
        const btnPreSmall = document.querySelector('.btn-pre-small');
        const listItemsSmall = document.querySelector('.img-small-center');
        function scroll() {
            let i = 0;
            btnNextSmall.addEventListener('click', () => {
                let width = document.querySelector('.img-small-item').clientWidth;
                i++;
                if (i > 2) {
                    i = 0;
                }
                listItemsSmall.style.transform = 'translateX(' + -i * width + 'px)';
            });
            btnPreSmall.addEventListener('click', () => {
                let width = document.querySelector('.img-small-item').clientWidth;
                i--;
                if (i < 0) {
                    i = 2;
                }
                listItemsSmall.style.transform = 'translateX(' + -i * width + 'px)';
            });
        }
        scroll();
        var imgArr = [...document.querySelectorAll('.img-small-item img')];
        imgArr.forEach((item) => {
            item.addEventListener('click', () => {
                imgArr.forEach((item) => {
                    item.classList.remove('img-active');
                });
                item.classList.add('img-active');
            });
        });
    }, []);
    // const { Option } = Select;
    const [showmore, setShowmore] = useState(false);
    const [item, setItem] = useState({});
    const id = props.match.params.id;
    useEffect(() => {
        Axios.get(`/api/product/${id}`)
            .then((data) => setItem(data.data[0]))
            .catch((err) => console.log(err));
    }, [id]);
    useEffect(() => {
        if (item.url) {
            setImg_big(item.url);
        }
    }, [item]);
    const [img_big, setImg_big] = useState('');
    const showimgsmall = () => {
        let result;
        var arr = [item.url, item.url, item.url, item.url];
        result = arr.map((item, index) => {
            return (
                <div key={index} className="img-small-item">
                    <img onClick={() => setImg(item)} src={item} alt={index} />
                </div>
            );
        });
        return result;
    };
    const setImg = (img) => {
        setImg_big(img);
    };
    //POST data

    const [errAmount, setErrAmount] = useState('');

    // const handleChangeInput = (e) => {
    //     setValueInput(e);
    // };
    // const incre = () => {
    //     setValueInput(Number(valueInput) + 1);
    // };
    // const decre = () => {
    //     if (valueInput <= 1) {
    //         setValueInput(1);
    //     } else {
    //         setValueInput(Number(valueInput) - 1);
    //     }
    // };
    //Mua hang
    const buyNow = () => {
        if (valueInput < 1) {
            setErrAmount('Số lượng phải lớn hớn 1');
        } else {
            dispatch(modalAction.showModal1(id, item.url, item.name, item.price, item.type));
            dispatch(cartAction.addToCart(id, item.url, item.name, item.price, Number(valueInput), item.type));
            dispatch(modalAction.showModal2());
            setErrAmount('');
        }
    };
    return (
        <div>
            <Header />
            <div className="details_page">
                <div className="details-title">
                    <div className="container">
                        Trang chủ {'>'} <span>{item.name}</span>
                    </div>
                </div>
                <div className="container details_middle">
                    <div className="details-product">
                        {/* img */}
                        <div className="details-img">
                            <div className="img-big">
                                <ReactImageMagnify
                                    {...{
                                        smallImage: {
                                            alt: 'Wristwatch by Ted Baker London',
                                            isFluidWidth: true,
                                            src: img_big,
                                        },
                                        largeImage: {
                                            src: img_big,
                                            width: 700,
                                            height: 700,
                                            enlargedImageContainerDimensions: {
                                                width: 200,
                                                height: 100,
                                            },
                                            enlargedImageContainerClassName: 'img-big',
                                        },
                                        isHintEnabled: true,
                                        shouldHideHintAfterFirstActivation: false,
                                        enlargedImagePosition: 'beside',
                                    }}
                                />
                            </div>
                            <div className="img-small">
                                <div className="btn-pre btn-pre-small">
                                    <i className="fas fa-chevron-left"></i>
                                </div>
                                <div className="img-small-mid">
                                    <div className="img-small-center">{showimgsmall()}</div>
                                </div>
                                <div className="btn-next btn-next-small">
                                    <i className="fas fa-chevron-right"></i>
                                </div>
                            </div>
                        </div>

                        {/* end img */}

                        {/* reviews */}
                        <div className="reviews-product">
                            <p className="reviewsname">{item.name}</p>
                            <div className="star">
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                            </div>
                            <p className="rev-price">{item.price ? item.price.toLocaleString() : ''}₫</p>
                            <div className="more-product">
                                <span>{item.name}</span> hihihi <span>{item.price}</span>
                            </div>
                            <div className="promotion">
                                <div className="promotion-item">
                                    <i className="fas fa-check-circle"></i>
                                    <span style={{ fontSize: '16px', fontWeight: '600' }}>
                                        Tặng thêm tai nghe + Freeship với đơn hàng từ 3.000.000đ
                                    </span>
                                </div>
                            </div>
                            {item.type !== 'accessories' ? (
                                <div className="size">
                                    <span style={{ fontSize: '1.1rem', marginRight: '0.9rem' }}>Kích thước</span>
                                </div>
                            ) : (
                                ''
                            )}
                            <p style={{ color: 'red' }}>{errAmount}</p>
                            <div className="buy">
                                <button className="btn-buynow" onClick={buyNow}>
                                    <p>mua ngay</p>
                                    <span>Giao hàng COD tận nơi</span>
                                </button>
                                <button className="btn-call">
                                    <p>Gọi đặt hàng</p>
                                    <span>Vui lòng gọi 012345678</span>
                                </button>
                            </div>
                        </div>
                        {/* End reviews */}
                        <div className="description">
                            <p className="tab_title">mô tả sản phẩm</p>
                            <div className={showmore ? 'tab_content active' : 'tab_content'}>
                                <p>
                                    <strong>thông tin sản phẩm</strong>
                                </p>
                                <table className="tab_table">
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <td>Thương hiệu</td>
                                            <td style={{ textTransform: 'uppercase' }}>{item.category}</td>
                                        </tr>
                                        <tr>
                                            <td>Xuất xứ thương hiệu</td>
                                            <td>Mỹ</td>
                                        </tr>
                                        <tr>
                                            <td>Sản xuất tại</td>
                                            <td>Việt Nam</td>
                                        </tr>
                                        <tr>
                                            <td>Model</td>
                                            <td>Sắp ra mắt</td>
                                        </tr>

                                        <tr>
                                            <td>Chế độ bảo hành</td>
                                            <td>Bảo hành chính hãng 1 tháng theo phiếu bảo hành</td>
                                        </tr>
                                        <tr>
                                            <td>Quy trình vận chuyển</td>
                                            <td>
                                                <ul>
                                                    <span>Giao hàng nhanh Express</span>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p>
                                    <strong>Mô tả sản phẩm</strong>
                                </p>
                                <p className="description-name">
                                    <span>{item.name} </span> kế thừa được những đặc điểm nổi bật
                                </p>
                                <img src={item.url} alt="" />
                                <img src={item.url} alt="" />
                                <div className={showmore ? 'show_more active' : 'show_more'}>
                                    <span onClick={() => setShowmore(true)} className="more-text">
                                        Xem đầy đủ
                                    </span>
                                    <span onClick={() => setShowmore(false)} className="less-text">
                                        Thu gọn
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item-service">
                        <div className="wrap-item">
                            <img src={itemservice1} alt="" />
                            <div className="content_service">
                                <p>Giao hàng siêu tốc</p>
                                <span>Nhận hàng trong 24-72h</span>
                            </div>
                        </div>
                        <div className="wrap-item">
                            <img src={itemservice2} alt="" />
                            <div className="content_service">
                                <p>Giao hàng siêu tốc</p>
                                <span>Nhận hàng trong 24-72h</span>
                            </div>
                        </div>
                        <div className="wrap-item">
                            <img src={itemservice3} alt="" />
                            <div className="content_service">
                                <p>Giao hàng siêu tốc</p>
                                <span>Nhận hàng trong 24-72h</span>
                            </div>
                        </div>
                        <div className="wrap-item">
                            <img src={itemservice4} alt="" />
                            <div className="content_service">
                                <p>Giao hàng siêu tốc</p>
                                <span>Nhận hàng trong 24-72h</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DetailsPage;
