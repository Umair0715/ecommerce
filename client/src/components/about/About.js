import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon   from '@material-ui/icons/Facebook'

const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/umair9541";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://scontent.flhe2-2.fna.fbcdn.net/v/t1.6435-9/121240444_1270919556618327_323699303148434868_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=174925&_nc_eui2=AeGG0nqLFLL_YHd1Owe5wrS6MoWww_U9nfAyhbDD9T2d8NX27rZeZt7g24ExWfl9gLc8dzrzOnN5-zhwJ_DM8gVc&_nc_ohc=6IkUu6ED_UkAX9JFu4x&_nc_ht=scontent.flhe2-2.fna&oh=00_AT86UI0K_nM2G1IDMrLsK5gppuGSPQwVnNOSt4M-bNWTcA&oe=62819406"
              alt="Founder"
            />
            <Typography>Umair Ahmad</Typography>
            <Button onClick={visitInstagram} color="primary" style={{fontSize:'1.2rem'}}>
              Visit Instagram
            </Button>
            <span>
               Hello , Hope You are doing well , Myself Umair , And I am MERN Stack Developer. ping me if you have any problem related to web development or MERN Technologies (MONGODB , EXPRESSJS, REACTJS and NODEJS )
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.youtube.com/"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://instagram.com/umair9541" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
            <a href="https://web.facebook.com/profile.php?id=100011008835082" target="blank">
              <FacebookIcon className="facebookSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;