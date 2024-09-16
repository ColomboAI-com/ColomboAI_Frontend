import React from 'react';
// import logoImage from './CommingSoon/images/taskbotimage/image.png'; 
// import logoog from './CommingSoon/images/logoimage/image.png';
import logoImage from './images/taskbotimage/image.png'
import logoog from './images/logoimage/image.png'
const App = () => {
  // Inline Styles
  const appStyle = {
    minHeight: '80vh',
    background: 'linear-gradient(to bottom, #3577eb, #1e1a8a)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '36px',
    // marginTop:'40px',
    marginBottom:'0' ,
    
    
  };

  return (
    <div style={appStyle}>
      {/* <Header /> */}
      <FeedPlaceholder />
    </div>
  );
};

const Header = () => {
  // Inline Styles for Header
  const headerStyle = {
    color: 'white',
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '20px'
  };

  const logoStyle = {
    width: '230px',
    height: '66px'
  };

  return (
    <header style={headerStyle}>
      <img 
        src={logoog.src}  // Use the imported image here
        alt="ColomboAI Logo"
        style={logoStyle}
      />
    </header>
  );
};

const FeedPlaceholder = () => {
  // Inline Styles for Feed Placeholder
  const imageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '-130px', 
    zIndex: '1',  
  };

  const imageStyle = {
    width: '220px',
    height: '220px',
    marginTop:'40px',
    zIndex: '1',  
   
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '14px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    display: 'inline-block',
    position: 'relative', 
    marginTop:'60px',
    zIndex: '0' 
  };

  const cardTextStyle = {
    fontSize: '1.125rem',
    color: '#6237FF',
    fontWeight: '600',
     zIndex: '0'
  };

  const subTextStyle = {
    marginTop: '8px',
    color: '#258EFF',
    font:'60px'
    
    
  };

  const comingSoonStyle = {
    marginTop: '32px',
    color: 'white',
    fontSize: '1.5rem',
    
  };

  return (
    <div>
      {/* Robot Image and Placeholder Text */}
      <div style={imageContainerStyle}>
        <img
          src={logoImage.src}  // Use the imported image for the robot too
          alt="Robot"
          style={imageStyle}
        />
      </div>
      <div style={cardStyle}>
        <p style={cardTextStyle}>
        Oops, it looks like this feature is still in the oven! Don't worry, we're whipping up something special.
        </p>
      <p style={subTextStyle}>Stay tuned for the grand reveal!</p>
      </div>
      {/* Coming Soon Section */}
      <div style={comingSoonStyle}>
        <p>COMING SOON</p>
      </div>
    </div>
  );
};

export default App;
