import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { setLogoutState } from "../../redux/reducers/loginState";

import search from "../../assets/img/search.svg";
import * as API from "../../services/api";
import LanguageSelector from "../LanguageSelector";

import signIn from "../../assets/img/sign-in.svg";
import signUp from "../../assets/img/sign-up.svg";
import logo from "../../assets/img/teslla_logo2.png";

import Update from "../../assets/update.svg";

import LuckygaoLogo from "../../assets/img/Logo/emma-logo.jpg";
import LuckygaoLogoSmall from "../../assets/img/luckygao_logo_small.png";

import Login from "../signs/Login";
import ResetPassword from "../signs/ResetPassword";
import RegisterEmail from "../signs/RegisterEmail";
import RegisterPhone from "../signs/RegisterPhone";
import GameUpload from "../GameUpload";
import { RollingNumber } from "../RollingNumber";

import TletterLogo from "../../assets/img/t_letter_logo.png";
import MenuExpander from "../../assets/img/menu.svg";
import ThaiIcon from "../../assets/img/aside/chicken-Active.svg";
import CasinoIcon from "../../assets/img/aside/tabs/Live casino_hover.svg";
import BingoIcon from "../../assets/img/aside/tabs/SportsActive.svg";
import SportsIcon from "../../assets/img/svg/soccer.svg";
import HorseIcon from "../../assets/img/svg/horse.svg";
import LotteryIcon from "../../assets/img/svg/lottery.svg";
import TranslationIcon from "../../assets/img/svg/translation.svg";
import SearchIcon from "../../assets/img/svg/search.svg";
import WorldIcon from "../../assets/img/svg/world.svg";

import SoccerBall from "../../assets/img/new_design/soccer_ball.svg";
import Horse from "../../assets/img/new_design/horse.svg";
import EventTicket from "../../assets/img/new_design/event_ticket.svg";
import Cards from "../../assets/img/new_design/cards.svg";

import { reverse } from "../../redux/reducers/openMenu";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Header = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = useSelector((state) => state.loginState.isLogin);
    const dispatch = useDispatch();

    const expandMenuState = useSelector((state) => state.openMenuState.value);

    const [open, setOpen] = useState(false);
    const [type, setType] = useState("");
    const [uploadGame, setUploadGame] = useState(false);
    const [balance, setBalance] = useState(0.0);
    const [totalBetAmount, setTotalBetAmount] = useState(0.0);
    const [loadingBalance, setLoadingBalance] = useState(false);

    const [username, setUsername] = useState("");

    const fetchBalance = useCallback(async () => {
        setLoadingBalance(true);
        try {
            const res = await API.getUserBalance();
            setBalance(res.data.balance);
            setTotalBetAmount(res.data.totalBetAmount);
            // debugger
        } catch (error) {
            // Handle error appropriately (e.g., log it, show a user-friendly message)
            console.error("Error fetching balance info:", error);
        }
        setLoadingBalance(false);
    }, []);

    useEffect(() => {
        // get balance of the user
        if (isLogin) {
            fetchBalance();
        }
    }, [isLogin]);

    const validEmails = useMemo(
        () => [
            "koiescafe@gmail.com",
            "smilesun0506@gmail.com",
            "smilemars0506@gmail.com",
            "britness.gmd@gmail.com",
        ],
        [] // Empty dependency array since there are no dependencies
    );

    const fetchUser = useCallback(async () => {
        try {
            const res = await API.getUserInfo();
            setUsername(res.data.name);

            if (isLogin && validEmails.includes(res.data.email)) {
                setUploadGame(true);
            }
        } catch (error) {
            // Handle error appropriately (e.g., log it, show a user-friendly message)
            console.error("Error fetching user info:", error);
        }
    }, [isLogin, validEmails]);

    useEffect(() => {
        fetchUser();
    }, [isLogin, fetchUser]);

    function isMobileDevice() {
        const mobileWidth = 768;
        if (window.innerWidth < mobileWidth) return true;
        else return false;
    }
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const promotionNavigation = () => {
        navigate('/promotion')
    }

    return (
        <>
            <header
                className={`fixed bg-[var(--bgColorWhite)] w-full h-[70px] flex justify-center items-center ${expandMenuState ? "md:pl-[265px]" : "md:pl-[0px]"
                    } transition-width duration-[300ms] ease-in-out`}
            >
                {/* <div className="max-w-[1430px] flex w-full items-center"> */}
                <div className="flex w-full items-center">
                    {/* Hamburger Button */}
                    <div
                        className={`hidden md:flex min-w-[70px] min-h-[70px] items-center justify-center text-white cursor-pointer ml-3 ${expandMenuState ? "hidden" : ""
                            }`}
                        onClick={() => {
                            dispatch(reverse());
                        }}
                    >
                        <img src={MenuExpander} alt="menuExpander" />
                    </div>

                    <img
                        src={
                            isMobileDevice() ? LuckygaoLogo : LuckygaoLogo
                        }
                        alt="Teslla"
                        className={`w-[65px] h-[auto] ml-2 ${expandMenuState ? "hidden" : "ml:flex"
                            } logo-mobile`}
                    />
                    {/* <a href='/' className={`text-[32px] font-semibold text-[#FF0000] ml-2  hidden xl:flex ${expandMenuState ? "!hidden" : ""}`}>LuckyGao</a> */}
                    {/* <div className='input-wrapper ml-3 hidden sm:flex items-center w-72 h-10 hover:border-[#dbe7ff] hover:border-1'>
                        <input
                        type='text'
                        placeholder={t('Search...')}
                        className='flex-1 outline-none border-none '
                        />
                        <img src={search} alt='search' />
                    </div> */}

                    {/* <div className='text-white justify-end ml-6 sm:flex hidden'>
                            <RollingNumber />
                        </div> */}
                    <div className="items-center flex flex-grow justify-end gap-2">
                        {window.localStorage.getItem("token") === "" ||
                            window.localStorage.getItem("token") === undefined ||
                            window.localStorage.getItem("token") === null ||
                            !isLogin ? (
                            <>
                                <Link to={"/THAI/ALL"}>
                                    <div className="hidden lg:flex gap-2 py-[14px] px-[24px] cursor-pointer hover:bg-[var(--bgColors)]">
                                        <img
                                            width={28}
                                            height={28}
                                            src={Cards}
                                            alt="Thai"
                                        />
                                        <span className="text-[var(--secondaryColor)] leading-[28px]">
                                            {t("Thai")}
                                        </span>
                                    </div>
                                </Link>

                                <Link to={"/ESPORTS/ALL"}>
                                    <div className="hidden lg:flex gap-2 py-[14px] px-[24px] cursor-pointer hover:bg-[var(--bgColors)]">
                                        <img
                                            width={28}
                                            height={28}
                                            src={SoccerBall}
                                            alt="Sports"
                                        />
                                        <span className="text-[var(--secondaryColor)]  leading-[28px]">
                                            {t("Sports")}
                                        </span>
                                    </div>
                                </Link>

                                <Link to={"/LIVE/ALL"}>
                                    <div className="hidden lg:flex gap-2 py-[14px] px-[24px] cursor-pointer hover:bg-[var(--bgColors)]">
                                        <img
                                            width={28}
                                            height={28}
                                            src={EventTicket}
                                            alt="Casino"
                                        />
                                        <span className="text-[var(--secondaryColor)]  leading-[28px]">
                                            {t("Casino")}
                                        </span>
                                    </div>
                                </Link>

                                {/* <Link to={"/BINGO/ALL"}>
                                        <div className="hidden lg:flex gap-2 py-[14px] px-[24px] cursor-pointer hover:bg-[#7f7f7f30]">
                                            <img
                                                width={28}
                                                height={28}
                                                src={Horse}
                                                alt="Bingo"
                                            />
                                            <span className="text-[#903489] leading-[28px]">
                                                Bingo
                                            </span>
                                        </div>
                                    </Link> */}

                                <button
                                    className="bg-transparent text-[var(--secondaryColor)] flex rounded justify-center items-center leading-[28px] py-[6px] px-[15px] md:px-[38px] border-2 border-[var(--secondaryColor)] on-mobile-views-login"
                                    onClick={() => {
                                        setOpen(true);
                                        setType("login");
                                    }}
                                >
                                    {/* <img src={signUp} alt='sign Up' className='mr-2' /> */}
                                    {t("Login")}
                                </button>

                                <button
                                    className="bg-[var(--secondaryColor)] text-white flex rounded justify-center items-center leading-[28px] py-2 px-[29px] whitespace-nowrap on-mobile-views"
                                    onClick={() => {
                                        setOpen(true);
                                        setType("signup_email");
                                    }}
                                >
                                    {/* <img src={signUp} alt='sign Up' className='mr-2' /> */}
                                    {t("Sign Up")}
                                </button>

                                <button type="button" onClick={promotionNavigation} class="relative mobile-promotion inline-flex items-center p-[10px] text-sm font-medium text-center text-white bg-[#FF0100] rounded border-2 border-[#FF0100]">
                                    Promotions
                                    <div class="absolute inline-flex items-center justify-center w-7 h-7 text-xs font-bold text-white bg-transparent -top-4 -end-4 ">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="#FCDC2A"
                                            height="20px"
                                            width="20px"
                                            version="1.1"
                                            viewBox="0 0 512 512"
                                        >
                                            <g>
                                                <g>
                                                    <path d="M478.609,99.726H441.34c4.916-7.78,8.16-16.513,9.085-25.749C453.38,44.46,437.835,18,411.37,6.269 c-24.326-10.783-51.663-6.375-71.348,11.479l-47.06,42.65c-9.165-10.024-22.34-16.324-36.962-16.324 c-14.648,0-27.844,6.32-37.011,16.375l-47.12-42.706C152.152-0.111,124.826-4.502,100.511,6.275 C74.053,18.007,58.505,44.476,61.469,73.992c0.927,9.229,4.169,17.958,9.084,25.734H33.391C14.949,99.726,0,114.676,0,133.117 v50.087c0,9.22,7.475,16.696,16.696,16.696h478.609c9.22,0,16.696-7.475,16.696-16.696v-50.087 C512,114.676,497.051,99.726,478.609,99.726z M205.913,94.161v5.565H127.37c-20.752,0-37.084-19.346-31.901-40.952 c2.283-9.515,9.151-17.626,18.034-21.732c12.198-5.638,25.71-3.828,35.955,5.445l56.469,51.182 C205.924,93.834,205.913,93.996,205.913,94.161z M417.294,69.544c-1.244,17.353-16.919,30.184-34.316,30.184h-76.891v-5.565 c0-0.197-0.012-0.392-0.014-0.589c12.792-11.596,40.543-36.748,55.594-50.391c8.554-7.753,20.523-11.372,31.587-8.072 C409.131,39.847,418.455,53.349,417.294,69.544z" />
                                                </g>
                                            </g>
                                            <g>
                                                <g>
                                                    <path d="M33.391,233.291v244.87c0,18.442,14.949,33.391,33.391,33.391h155.826V233.291H33.391z" />
                                                </g>
                                            </g>
                                            <g>
                                                <g>
                                                    <path d="M289.391,233.291v278.261h155.826c18.442,0,33.391-14.949,33.391-33.391v-244.87H289.391z" />
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                </button>


                                {/* <span className="mx-4 w-8 h-8">
                                    <img
                                        className="w-full h-full"
                                        src={TranslationIcon}
                                    />
                                </span> */}
                                <div className="relative inline-block text-left">
                                    <span>
                                        <button
                                            type="button"
                                            onClick={toggleDropdown}
                                            className="inline-flex justify-center w-full py-2 text-sm font-medium border-none bg-transparent mobile-"
                                            aria-haspopup="true"
                                            aria-expanded={isOpen}
                                        >
                                            <span className="mx-4 w-8 h-8">
                                                <img
                                                    className="w-full h-full"
                                                    src={TranslationIcon}
                                                    alt="Translation Icon"
                                                />
                                            </span>
                                        </button>
                                    </span>
                                    {isOpen && (
                                        <div
                                            className="origin-top-right absolute right-0 mt-2 mr-4 w-56 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5 focus:outline-none"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="options-menu"
                                        >
                                            <div className="py-1" role="none">
                                                <LanguageSelector />
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </>
                        ) : (
                            <div className="gap-4 items-center">
                                <p className="flex items-center gap-4">
                                    {/* <p className="hidden md:flex gap-2">
                                        <Link
                                            to={"/financial-report"}
                                            className={`text-sm bg-transparent text-blue-700 font-semibold py-1 px-3 border rounded ${
                                                location.pathname ===
                                                "/financial-report"
                                                    ? "!bg-blue-500 text-white"
                                                    : "border-blue-500 hover:bg-blue-500 hover:text-white"
                                            }`}
                                        >
                                            Financial Report
                                        </Link>
                                        <Link
                                            to={"/account"}
                                            className={`text-sm bg-transparent text-blue-700 font-semibold py-1 px-3 border rounded ${
                                                location.pathname === "/account"
                                                    ? "!bg-blue-500 text-white"
                                                    : "border-blue-500 hover:bg-blue-500 hover:text-white"
                                            }`}
                                        >
                                            Account
                                        </Link>
                                        <Link
                                            to={"/mybet"}
                                            className={`text-sm bg-transparent text-blue-700 font-semibold py-1 px-3 border rounded ${
                                                location.pathname === "/mybet"
                                                    ? "!bg-blue-500 text-white"
                                                    : "border-blue-500 hover:bg-blue-500 hover:text-white"
                                            }`}
                                        >
                                            My bet list
                                        </Link>
                                        <Link
                                            to={"/announce"}
                                            className={`text-sm bg-transparent text-blue-700 font-semibold py-1 px-3 border rounded ${
                                                location.pathname ===
                                                "/announce"
                                                    ? "!bg-blue-500 text-white"
                                                    : "border-blue-500 hover:bg-blue-500 hover:text-white"
                                            }`}
                                        >
                                            Announce
                                        </Link>
                                    </p> */}

                                    <div className="flex flex-col gap-1 md:gap-4 md:flex-row">
                                        <span className="text-white text-sm md:text-lg w-auto md:px-2 ">
                                            {username}
                                        </span>

                                        <div className="flex gap-3 items-center">
                                            <span className="text-white text-sm md:text-lg">
                                                {loadingBalance
                                                    ? "..."
                                                    : balance.toFixed(2) +
                                                    "THB "}
                                                <span className="text-[var(--logoutBg)]">
                                                    {loadingBalance
                                                        ? "..."
                                                        : " ( " +
                                                        totalBetAmount.toFixed(
                                                            2
                                                        ) +
                                                        " ) "}
                                                </span>
                                            </span>

                                            <img
                                                src={Update}
                                                className="cursor-pointer w-5 h-5 md:w-6 md:h-6"
                                                onClick={() => fetchBalance()}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        className="btn-f1 flex rounded-lg justify-center login-btn deposit-button items-center h-8 !text-[var(--sixthColor) bg-[var(--logoutBg)]]"
                                        onClick={() => {
                                            window.localStorage.removeItem(
                                                "token"
                                            );
                                            setUploadGame(false);
                                            dispatch(setLogoutState());
                                        }}
                                    >
                                        {/* <img src={signIn} alt='sign out' className='mr-2' /> */}

                                        {t("Log Out")}
                                    </button>
                                    {/* <span className="text-[24px] leading-[36px] text-white whitespace-nowrap">
                                            $ USD
                                        </span> */}
                                    <div className="relative inline-block text-left">
                                        <span>
                                            <button
                                                type="button"
                                                onClick={toggleDropdown}
                                                className="inline-flex justify-center w-full py-2 text-sm font-medium border-none bg-transparent mobile-"
                                                aria-haspopup="true"
                                                aria-expanded={isOpen}
                                            >
                                                <span className="mx-4 w-8 h-8">
                                                    <img
                                                        className="w-full h-full"
                                                        src={TranslationIcon}
                                                        alt="Translation Icon"
                                                    />
                                                </span>
                                            </button>
                                        </span>
                                        {isOpen && (
                                            <div
                                                className="origin-top-right absolute right-0 mt-2 mr-4 w-56 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                role="menu"
                                                aria-orientation="vertical"
                                                aria-labelledby="options-menu"
                                            >
                                                <div className="py-1" role="none">
                                                    <LanguageSelector />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <Login
                open={open}
                setOpen={setOpen}
                type={type}
                setType={setType}
            />
            <ResetPassword
                open={open}
                setOpen={setOpen}
                type={type}
                setType={setType}
            />
            <RegisterEmail
                open={open}
                setOpen={setOpen}
                type={type}
                setType={setType}
            />
            <RegisterPhone
                open={open}
                setOpen={setOpen}
                type={type}
                setType={setType}
            />
            <GameUpload
                open={open}
                setOpen={setOpen}
                type={type}
                setType={setType}
            />
        </>
    );
};
