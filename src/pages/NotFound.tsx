import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <Helmet>
        <title>Page Not Found — Truckee Meadows Handyman</title>
        <meta
          name="description"
          content="This page doesn't exist. Head back to Truckee Meadows Handyman for home repairs and maintenance in Reno and Sparks, Nevada."
        />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="Page Not Found — Truckee Meadows Handyman" />
        <meta
          property="og:description"
          content="This page doesn't exist. Return home to request a handyman quote in Reno and Sparks."
        />
      </Helmet>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Oops! Page not found</p>
        <a href="/" className="text-primary hover:text-primary/80 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
