import React, { useEffect } from "react";

const HubSpotForm: React.FC = () => {
  useEffect(() => {
    // Function to load the script
    const loadScript = (src: string, id: string) => {
      if (document.getElementById(id)) {
        return;
      }
      const script = document.createElement("script");
      script.id = id;
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    };

    // Load the HubSpot script
    loadScript("//js-eu1.hsforms.net/forms/embed/v2.js", "hs-script");

    // Initialize the form once the script is loaded
    const initForm = () => {
      if ((window as any).hbspt) {
        (window as any).hbspt.forms.create({
          region: "eu1",
          portalId: "25329660",
          formId: "1e3d25e4-af3c-46f0-ab85-997a1216b5b6",
          target: "#hubspotForm",
        });
      } else {
        // Retry if the script isn't loaded yet
        setTimeout(initForm, 500);
      }
    };

    initForm();

    // Clean-up function to remove the script
    return () => {
      const script = document.getElementById("hs-script");
      if (script) {
        script.remove();
      }
    };
  }, []);

  return <div id="hubspotForm"></div>;
};

export default HubSpotForm;
