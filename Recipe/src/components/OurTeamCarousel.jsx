/* eslint-disable react/prop-types */
import { Box, Grid, useMediaQuery } from "@mui/material";
import AboutInfo from "./AboutInfo";
import Slider from "react-slick";
import { IconButton } from "@mui/material";
// import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { informations } from "../data/teamData"; // Import the informations array from teamData.js

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      style={{ position: "absolute", left: 0, top: "50%", zIndex: 1 }}
    >
      {/* <ChevronLeft /> */}
      <img src="https://lh3.googleusercontent.com/pw/AIL4fc_RCSTmmebeONMMS5NU9BBJUq4HUhxghoA0SVduBT-QpM-nJ8OVsXX0sOIaUlD9Y6uCF6fiuh3paL-b_BzVXhriS1Hchzk6r6THxsqMTbkBdsPjO0_wURsIYP7_C7NotlQYSg8dup4_E0AfqkGZs34KYOndBkGbJ9Cen5jzr0c_SU2OW9l3ggvigrsViBqyEVa1sNgAFCmauLO0zk_YvYTURSDWX3kDWCCJRLAw9i5C0LUUjObEGftAXICbdF2_g7Ene9HttnJrEDr6_P5rvWxaeE1l1z1Qa0zcCjRDSi-ipjHWEOU-xNTbIDjngzeELCgidtQ5nq8t0dycir2KVESMR8NNBBLoyskLO2BSwvojqTyYtDta3Od0w-qnjXEulj7-V6deufmvuqaXJ6u8z0fj7atJq5FfpiuSHmSA1K6sDYXqLzG5nJYx_cGVIHvmVWprmLfHpvfZmUxi-sAsSolNc7HbUEuIZtRfMKEjF-Oiawl_1FGJ-1lpFadDmSRFUAd61vO6kevqaKSyLZz16aDGQzX7bLXq1C-NBmfooc9afCVnrGPJnHhD6eAsN93jil1UQer0LR702CTn3gqRCnQM69GzRoyTn4_SDbcgzW54rrRcR1sQz1jjOqTxNN8G8zq8cCpG1VXRQBRY6l_-iS6lSdPMOHGwxmrKwpDRpqkbUsNG8QVSA0EQXLu-6NO8MgYE3BETSn5mBWcD1L1UdDkRpd2ykGm5WXfEBCAMLUMX-Aculrw_8RzVcrPFMBZPbR8Flms6PpW4OrAUaaWjbQLpKxDkQs3hMPx-Dgl_RXwOzPndthfUHXQOsQZ-IjM-ilmLiNPoxH4FAI6lV4bmJzqkXb-40jJU4-o4aoZfmoT7dQmpYxbhrkYauJ1vo0aBRV5xVAJ-nbds41VUOm3OOFGFMjXzv68xHRu3brefBFbWTt7XSJliSdOA3cj7=w96-h96-s-no?authuser=1" alt="previous-icon" width="30" height="30"/>
    </IconButton>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      style={{ position: "absolute", right: 0, top: "50%", zIndex: 1 }}
    >
      {/* <ChevronRight /> */}
      <img src="https://lh3.googleusercontent.com/pw/AIL4fc81hcmfU4X5lDXUj0dr8I5PRQwKi9kYyFQO8zTHdTER6IMls5BrQ0d4NbEA7Ah87pDCdJmzTrtxGm9O9xVSY59JyI-lo_p1i1BnKkGWYTVA6BpkYgwKeR3vDif3nlNy5irhhd84oABGDRsb7Mhwy1xTKU1CH67ms8ZZ8fY8C0MQaEz2bCHQlg1sA_kZXfT_N4Gvgo4ky4y3qEWkudKo0sDSc5qYxMAlblE4wdZYf-A0GtN9STkzhqzylKCDZVn0uqYL_c2AD25YIHaf2u89Y_XF19VCwePAP1--p1HOAvrcS3g4axeckfCYGtUxnK2w50s_Le2q6FTYLXh5RYSas-RIMAemj-FnmQtZ-4fm8VkBxb0QgPyoMhL3UM6EoWroSN2SE4HbjEx2us-kP5o9mvXj8zFO4I5NBJj9e1o2Wc_xLN9KbXuPpppACf3Cc_MhZXjJgnXBIFyKXxBLQmXndp3wfImVzsrfQE4_IYlYjqfbQY7oHUrSaMSUCJvqP26VqKT28Es6viYgpF9G8PqwVp-XbWXpPIdM1R7XbINf5L01LvVQBT6FtU49-krZ0gSv8q3hi-Et8s0fWtrnWlho5AuQTQ7xEV7BBSIMVIxRT9ggxFndkb0J_GkU16rP-Grke_V5jxB1rqR65wyQXgWY59qF4cy4HNaxNVvP466CAkdvMofTmJk_uMeKtUESjec0kT_iBw1QV9zg5RJKmABuHUanimFlwX6ecouByXoR1I6ILWlF78MF4hUZz7rB921HLFPhEqFGdY32io9oK7g5Gr3ZUov1Ayr5yOjBHeH1Y1e8JYKCO-80c8txlwGG0ljGmaRcjni1kL34ZeIXIUsIkeoLFyYWd1FAoxTN33Pn5YHXys9-T4uQcJxlqzZKnFtx5z3iHIQjywtRW7DX4t4MNDf8xTtTFsOBU_Zh5rTavhoYS-ogIkify2l9bA2I=w96-h96-s-no?authuser=1" alt="next-icon" width="30" height="30"/>
    </IconButton>
  );
};

export default function OurTeamCarousel() {
  const isMobileView = useMediaQuery("(max-width:959px)");
  const [infoData, setInfoData] = useState([]);

  useEffect(() => {
    getInfosData();
  }, []);

  const getInfosData = () => {
    const requiredData = informations.map((data) => ({
      id: uuidv4(),
      avatar: data.avatar,
      firstname: data.firstname,
      lastname: data.lastname,
      responsible: data.responsible,
      intro: data.intro,
    }));
    setInfoData(requiredData);
  };

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Number of slides to show at a time (adjust as needed)
    slidesToScroll: 1, // Number of slides to scroll at a time (adjust as needed)
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <>
      <Box sx={{ padding: "15px 40px" }}>
        <Slider {...settings}>
          {infoData.map((member) => (
            <Grid item key={member.id}>
              <AboutInfo info={member} isMobileView={isMobileView} />
            </Grid>
          ))}
        </Slider>
      </Box>
    </>
  );
}
