import React from "react";

export default function Guest_Dashboard(){


  return(
    <div className="GuestParentCont">
      <div className="TitleCont">
        <h3>Sparkz⚡</h3>
        <p>Daily Dress Color Suggestor</p>
      </div>

      <div className="AnchorCont">
        <a href="/Register">Signup</a>
        <span>{" "}/{" "}</span>
        <a href="/Login">Login</a>
      </div>

      <div className="Guest_ContentCont">
        <h3>About Sparkz⚡</h3>
        <p>Welcome to Sparkz⚡- Daily Dress Color Suggestor, your go-to source for stylish inspiration! Our mission is to empower women to express themselves through color, offering daily suggestions tailored to your mood, occasion, and season. Whether you're looking to elevate your everyday wardrobe or make a statement, we provide fresh ideas to help you shine. Join our vibrant community and discover the transformative power of color in your daily fashion choices!</p>
        <div className="Guest_ImageCont">
            <div className="Guest_DisplayCard">
                <h5>Suggestion by Season</h5>
                <img src="https://i.pinimg.com/736x/3b/77/3e/3b773e4e5235ff5656a6e4825bb36771.jpg" alt="DressImage"/>
                <p>Color : Blue </p>
                <p> Season : Monsoon</p>
                <p>About Color : Calming color that evokes feelings of tranquility and trust</p>
            </div>
            <div className="Guest_DisplayCard">
                <h5>Suggestion by Mood</h5>
                <img src="https://i.pinimg.com/736x/17/76/9c/17769ced673c2cc1c0e079ee07dfa4fe.jpg" alt="DressImage"/>
                <p>Color : Yellow</p>
                <p>Mood : Happy</p>
                <p>About Color : Bright, cheerful, and reminiscent of sunshine</p>
            </div>
            <div className="Guest_DisplayCard">
                <h5>Suggestion by Occasion</h5>
                <img src="https://i.pinimg.com/736x/7a/5b/21/7a5b213d93c48253874d3b52bb57959d.jpg" alt="DressImage"/>
                <p>Color : Brown</p>
                <p>Occassion : Party</p>
                <p>About Color : Warm, earthy color that symbolizes stability and comfort</p>
            </div>
        </div>
      </div>

      <div className="Guest_FooterCont">
        <div className="Foot">
          <p>&#169;All Rights Reserved@Sparkz⚡</p>
          <p>Made with 💙 Sparkz⚡ Team</p>
        </div>
      </div>
    </div>
  );
}