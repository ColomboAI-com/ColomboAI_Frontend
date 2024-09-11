import { useEffect } from 'react';
import Head from 'next/head';
const SideTopAdComponent = () => {
    useEffect(() => {
        const loadGPTScript = () => {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
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
                 
                  window.googletag.defineSlot('/23102803892/Genai_Desktop_300v_sidebar_top', [[300, 250], [336, 280]],
                     'div-gpt-ad-1726060799394-0')
                  .addService(window.googletag.pubads());
                  
                //   console.log('Enabling single request mode...');
                //   window.googletag.pubads().enableSingleRequest();
                  
                  console.log('Collapsing empty divs...');
                  window.googletag.pubads().collapseEmptyDivs();
                  
                  console.log('Enabling services...');
                  window.googletag.enableServices();
                  
                  console.log('Displaying ad...');
                  

                  window.googletag.display('div-gpt-ad-1726060799394-0');
                  
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
   
    <div id='div-gpt-ad-1726060799394-0' style={{  border:'1px solid red',minWidth: '300px', minHeight: '250px' }}>
   
    </div> 
   
    </>
  );
};

export default SideTopAdComponent;
