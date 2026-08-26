"use client";

import "./Footer.css";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RiInstagramLine, RiLinkedinBoxLine, RiYoutubeLine } from "react-icons/ri";

import BondureLogo from "../BondureLogo/BondureLogo";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const socialIconsRef = useRef(null);

  useGSAP(
    () => {
      if (!socialIconsRef.current) return;

      const icons = socialIconsRef.current.querySelectorAll(".icon");
      gsap.set(icons, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: socialIconsRef.current,
        start: "top 90%",
        once: true,
        animation: gsap.to(icons, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: -0.1,
          ease: "power3.out",
        }),
      });
    },
    { scope: socialIconsRef },
  );

  return (
    <div className="footer">
      <div className="footer-meta">
        <div className="container footer-socials">
          <div className="footer-meta-col">
            <div className="footer-socials-wrapper" ref={socialIconsRef}>
              <div className="icon">
                <RiLinkedinBoxLine />
              </div>
              <div className="icon">
                <RiInstagramLine />
              </div>
              <div className="icon">
                <RiYoutubeLine />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-outro">
        <div className="container">
          <div className="footer-header">
            <BondureLogo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
