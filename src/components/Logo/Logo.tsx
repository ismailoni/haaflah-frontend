import logo from "../../assets/logo.svg"; 
import "./logo.css"; 

const Logo = () => {
  return (
    <div className="logo-container">
     <img src={logo} alt="Logo" className="logo-image" />
      <span className="logo-text">Haaflah</span>
    </div>
  );
};

export default Logo;
