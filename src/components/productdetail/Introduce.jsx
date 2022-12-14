import React, { useState, useEffect } from "react";
import ModalVideo from "react-modal-video";
import "../../../node_modules/react-modal-video/scss/modal-video.scss";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ClickSlider from "../clickSlider/ClickSlider";
import img from "../../assets/images/phone/iphone-12-mini-1-1-org.jpg";
import AddCartModal from "./AddCartModal";
import { toast } from "react-toastify";
import { toVND } from "../../utils/format";

//state Redux
import {
  selectCurrentUser,
  selectLoginStatus,
} from "../../features/auth/authSlice";

// api
import { country } from "../../apis/countryApi";
const Introduce = ({ product }) => {
  // img arr
  const [imgArr, setImgArr] = useState([]);
  const [data, setData] = useState([]);

  //check login
  let history = useHistory();
  const status = useSelector(selectLoginStatus) || false;

  const [chooseOption, setChooseOption] = useState(0);
  console.log(product?.productOptions);
  // const imgProducts = product.img;
  // console.log(imgProducts);
  // const options = product.options;
  // console.log(options);
  // const qtOptions = options.length;
  // console.log(options[0].option);
  const [addCart, setAddCart] = useState(false);
  // Location menu
  const [lShow, setLShow] = useState(false);
  const [locationI, setLocationI] = useState("");
  // Event handler
  const locationShow = () => {
    setLShow(!lShow);
  };
  const inputLocation = (location) => {
    setLocationI(location);
    setLShow(!lShow);
  };

  useEffect(() => {
    let arr = [];
    product?.images.forEach((v) => {
      v.items.forEach((vi) => {
        arr.push(vi?.urlImage);
      });
    });
    setImgArr(arr);
  }, [product]);

  useEffect(() => {
    // Get city list
    country()
      .then((data) => {
        let raw = data.data.results.map((v) => {
          return v.name;
        });
        setData(raw);
      })
      .catch((e) => {
        console.log(`Can't get country data with ${e.message}`);
      });
    //
  }, []);

  //
  useEffect(() => {
    // ??????? scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const clickAddCart = () => {
    if (status === false) {
      toast.info("Vui l??ng ????ng nh???p tr?????c khi ?????t h??ng", {
        position: "bottom-left",
      });
      history.push("/login");
      return;
    } else {
      setAddCart(true);
    }
  };

  //Open Video Product
  const [openVideo, setOpenVideo] = useState(false);
  const [idVideo, setIDVideo] = useState("");
  const youtube_parser = () => {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = product?.video.match(regExp);
    setIDVideo(match && match[7].length == 11 ? match[7] : false);
    console.log(idVideo);
    console.log(product);
  };
  useEffect(() => {
    youtube_parser();
  }, [product]);
  const handleCloseVideo = () => {
    setOpenVideo(false);
    setIDVideo("");
  };
  return (
    <div className="flex">
      <div class="product_introduce_left box_left">
        <ClickSlider imgArr={imgArr} />
        {/* Video */}
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={openVideo}
          videoId={idVideo}
          onClose={handleCloseVideo}
        />
        <div class="product_introduce_expand flex">
          <div class="product_introduce_expand_item flex ">
            <div class="expand_item_logo flex">
              <i class="fa-solid fa-medal text-3xl"></i>
            </div>
            <span class="product_introduce_expand_item_text">??i???m n???i b???t</span>
          </div>
          <div
            class="product_introduce_expand_item flex"
            onClick={() => setOpenVideo(true)}
          >
            <div class="expand_item_logo flex">
              <i class="fa-solid fa-circle-play text-3xl"></i>
            </div>
            <span class="product_introduce_expand_item_text">Video</span>
          </div>
          <div class="product_introduce_expand_item flex">
            <div class="expand_item_logo flex">
              <i class="fa-solid fa-box-open text-3xl"></i>
            </div>
            <span class="product_introduce_expand_item_text">M??? h???p</span>
          </div>
          <div class="product_introduce_expand_item flex">
            <div class="expand_item_logo flex">
              <i class="fa-solid fa-camera text-3xl"></i>
            </div>
            <span class="product_introduce_expand_item_text">
              Ch???p t??? camera
            </span>
          </div>
          <div class="product_introduce_expand_item flex">
            <div class="expand_item_logo flex">
              <i class="fa-solid fa-arrows-spin text-3xl"></i>
            </div>
            <span class="product_introduce_expand_item_text">H??nh 360 ?????</span>
          </div>
          <div class="product_introduce_expand_item flex">
            <div class="expand_item_logo flex">
              <i class="fa-solid fa-file-signature text-3xl"></i>
            </div>
            <span class="product_introduce_expand_item_text">
              Th??ng s??? k??? thu???t
            </span>
          </div>
          <div class="product_introduce_expand_item flex">
            <div class="expand_item_logo flex">
              <i class="fa-solid fa-circle-info text-3xl"></i>
            </div>
            <span class="product_introduce_expand_item_text">
              Th??ng tin s???n ph???m
            </span>
          </div>
        </div>
      </div>
      <div class="product_introduce_right box_right">
        {/* {options.map((option, i) => (
          <div class="product_introduce_option margin_bottom_10" key={i}>
            {option.option.map((item, index) => {
              return (
                <div
                  onClick={() => setChooseOption(index)}
                  key={index}
                  className={`product_introduce_option_item border ${
                    chooseOption === index ? "active" : ""
                  }`}
                >
                  {item.option}
                </div>
              );
            })}
          </div>
        ))} */}
        <div class="product_introduce_option margin_bottom_10">
          {product?.productOptions.map((v, i) => {
            {
              console.log(v);
            }
            return (
              <div
                onClick={() => setChooseOption(i)}
                key={i}
                className={`product_introduce_option_item border ${
                  chooseOption == i ? "active" : ""
                }`}
              >
                {v?.optionName}
              </div>
            );
          })}
        </div>

        <div class="product_introduce_price_location " onClick={locationShow}>
          <div>
            <span>
              Gi?? t???i
              <Link class="product_introduce_location mg_r_5" to="#">
                {" "}
                {locationI || "H??? Ch?? Minh"}
              </Link>
              <i class="product_introduce_price_icon fa-solid fa-angle-down"></i>
            </span>
          </div>
          <ul className={`top__menu ${lShow ? "show" : ""}`}>
            {data.map((v, i) => {
              return (
                <li
                  key={i}
                  onClick={() => inputLocation(v)}
                  className="menu__item"
                >
                  {v}
                </li>
              );
            })}
          </ul>
        </div>
        <div class="product_introduce_price">
          {toVND(product?.productOptions[chooseOption]?.marketPrice)} &nbsp;
          <span className="product_introduce_price_original">
            <s>{toVND(product?.productOptions[chooseOption]?.price)}</s> -
            {product?.productOptions[chooseOption]?.promotion}%
          </span>
        </div>
        <div class="product_introduce_promotion border">
          <div class="product_introduce_promotion_title">
            <p
              style={{
                fontSize: "16px",
                fontWeight: "600",
                padding: "10px 0px",
              }}
            >
              Khuy???n m??i
            </p>
            <p style={{ padding: "0 0 5px 0" }}>
              Gi?? v?? khuy???n m??i ??p d???ng ?????n h???t 23:59 17/07
            </p>
          </div>
          <div class="product_introduce_promotion_list">
            <div class="product_introduce_promotion_item">
              <div class="promotion_circle">
                <span style={{ color: "#fff", fontSize: "10px" }}>1</span>
              </div>
              <span style={{ width: "95%", display: "block" }}>
                Tr??? g??p 0% th??? t??n d???ng
              </span>
            </div>
            <div class="product_introduce_promotion_item">
              <div class="promotion_circle">
                <span style={{ color: "#fff", fontSize: "10px" }}>2</span>
              </div>
              <span style={{ width: "95%", display: "block" }}>
                Gi???m gi?? 40% g??i B???o h??nh m??? r???ng Sasung Care + 12 th??ng
              </span>
            </div>
            <div class="product_introduce_promotion_item">
              <div class="promotion_circle">
                <span style={{ color: "#fff", fontSize: "10px" }}>3</span>
              </div>
              <span style={{ width: "95%", display: "block" }}>
                Nh???p m?? TGDD gi???m 5% t???i ??a 400.000?? cho ????n h??ng t???{" "}
              </span>
            </div>
            <div class="product_introduce_promotion_item">
              <div class="promotion_circle">
                <span style={{ color: "#fff", fontSize: "10px" }}>4</span>
              </div>
              <span style={{ width: "95%", display: "block" }}>
                Nh???p m?? TGDD gi???m 5% t???i ??a 400.000?? cho ????n h??ng t??? 500.000??
                tr??? l??n khi thanh to??n qua v?? Moca tr??n ???ng d???ng Grab
              </span>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="product_introduce_payment">
          <h1 class="product_introduce_payment_title">??u ????i khi thanh to??n</h1>
          <div class="product_introduce_payment_main">
            <div class="product_introduce_payment_tpbank border">
              <div class="">
                <input type="radio" name="bank_option" class="checkbox-round" />
                <label style={{ color: "#CC33FF", paddingLeft: "5px" }}>
                  TPBank{" "}
                </label>
              </div>
              <p style={{ padding: "5px 0" }}>Gi???m 500.000??</p>
              <p>S???n ph???m t??? 8tr</p>
            </div>
            <div class="product_introduce_payment_eximbank border">
              <div class="">
                <input type="radio" name="bank_option" class="checkbox-round" />
                <label style={{ color: "#3366CC", paddingLeft: "5px" }}>
                  Eximbank
                </label>
              </div>
              <p style={{ padding: "5px 0" }}>Gi???m 500.000??</p>
              <p>S???n ph???m t??? 5tr</p>
            </div>
          </div>
        </div>
        <button
          class="product_introduce_btn_payment btn"
          onClick={clickAddCart}
        >
          MUA NGAY
        </button>
        <div class="product_introduce_payment_expand">
          <button class="product_introduce_btn_payment_blue">
            Mua tr??? g??p 0% <br /> duy???t h??? s?? trong 5 ph??t
          </button>
          <button class="product_introduce_btn_payment_blue">
            Tr??? g??p qua th??? <br /> Visa,Mastercard,JCV,Amex
          </button>
        </div>
        <div class="flex_center">
          <span>G???i ?????t mua</span>
          <Link class="hotline" to="#">
            1800 1060
          </Link>
          <span>(7:30 - 22:00)</span>
        </div>
      </div>
      {addCart && (
        <AddCartModal
          closeModal={setAddCart}
          chooseOption={chooseOption}
          product={product}
        />
      )}
    </div>
  );
};

export default Introduce;
