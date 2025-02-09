import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdsSection = () => {
  useEffect(() => {
    // Dynamically load the Google Ads script
    const script = document.createElement("script");
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7725766784418263";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    // Initialize adsbygoogle after the script is loaded
    script.onload = () => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("Adsbygoogle error:", e);
      }
    };

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="ads-container">
      {/* Google AdSense ad container */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-7725766784418263"
        data-ad-slot="6016059684"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    </div>
  );
};

export default AdsSection;
