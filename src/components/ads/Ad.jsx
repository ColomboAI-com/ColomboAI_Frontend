import { useEffect } from 'react';
import Head from 'next/head';
const BannerAdComponent = () => {
    useEffect(() => {
        const loadGPTScript = () => {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://www.googletagservices.com/tag/js/gpt.js';
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        };
    
        loadGPTScript()
          .then(() => {
            if (window.googletag && window.googletag.cmd) {
              console.log('Initializing Google Publisher Tag...');
              window.googletag.cmd.push(() => {
                try {
                  console.log('Defining ad slot...');
                 
                  window.googletag.defineSlot('/23102803892/Genai_728v_footer', [[728, 90], [320, 50], [168, 42], [88, 31], [120, 20], [216, 36], [120, 90], [234, 60], [120, 60], [120, 30], [300, 50], [216, 54], [468, 60], [300, 75], [168, 28]],
                     'div-gpt-ad-1726060291570-0')
                  .addService(window.googletag.pubads());
                  
                //   console.log('Enabling single request mode...');
                //   window.googletag.pubads().enableSingleRequest();
                  
                  console.log('Collapsing empty divs...');
                  window.googletag.pubads().collapseEmptyDivs();
                  
                  console.log('Enabling services...');
                  window.googletag.enableServices();
                  
                  console.log('Displaying ad...');
                  

                  window.googletag.display('div-gpt-ad-1726060291570-0');
                  
                } catch (error) {
                  console.error('Error setting up Google Publisher Tag:', error);
                }
              });
            } else {
              console.error('Google Publisher Tag library is not loaded.');
            }
          })
          .catch((error) => {
            console.error('Failed to load Google Publisher Tag script:', error);
          });
      }, []);

  return (
    <>
    <Head>

        <script
          async
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        ></script>

      </Head>
   
    <div id='div-gpt-ad-1726060291570-0' style={{  minWidth: '88px', minHeight: '20px' }}>
   
    </div> 
   
    </>
  );
};

export default BannerAdComponent;
