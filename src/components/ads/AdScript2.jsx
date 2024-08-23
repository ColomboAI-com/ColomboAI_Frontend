import { useEffect } from 'react';
import Head from 'next/head';
const AdScript2 = () => {
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
                  window.googletag.defineOutOfPageSlot('/23102803892/testad3',
                     
                   'div-gpt-ad-1724329687680-0').addService(window.googletag.pubads())
                  window.googletag.pubads().collapseEmptyDivs()
                  window.googletag.enableServices()
                  window.googletag.display('div-gpt-ad-1724329687680-0')
                
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
      <div id='div-gpt-ad-1724329687680-0' > 

</div> 
  
    </>
  );
};

export default AdScript2;
