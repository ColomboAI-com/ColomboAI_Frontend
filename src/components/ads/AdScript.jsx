import { useEffect } from 'react';
import Head from 'next/head';
const AdScript = () => {
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
                 
                  window.googletag.defineSlot('/23102803892/Test_display_allsizes2', [[200, 200], [320, 100], [125, 125], [180, 150], [970, 250], [168, 28], [216, 36], [216, 54], [234, 60], [300, 250], [970, 90], [160, 600], [300, 100], [88, 31], [320, 480], [168, 42], [320, 50], [250, 250], [336, 280], [120, 20], [120, 30], [468, 60], [120, 60], [300, 50]],
                     'div-gpt-ad-1713946694761-0')
                  .addService(window.googletag.pubads());
                  
                  console.log('Enabling single request mode...');
                  window.googletag.pubads().enableSingleRequest();
                  
                  console.log('Collapsing empty divs...');
                  window.googletag.pubads().collapseEmptyDivs();
                  
                  console.log('Enabling services...');
                  window.googletag.enableServices();
                  
                  console.log('Displaying ad...');
                  

                  window.googletag.display('div-gpt-ad-1713946694761-0');
                  
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
   
    <div id='div-gpt-ad-1713946694761-0' style={{  minWidth: '800px', minHeight: '100px' }}>
   
    </div> 
   
    </>
  );
};

export default AdScript;
