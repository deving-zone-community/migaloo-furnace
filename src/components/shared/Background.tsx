import React, { ReactNode } from "react";

interface BackgroundProps {
  children: ReactNode;
}

const Background = ({ children }: BackgroundProps) => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(images/bg.png)`,
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'auto 100%',
          backgroundColor: "#172113",
          height: '100vh',
          width: '100vw', 
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </>

  )
};

export default Background;
