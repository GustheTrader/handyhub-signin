
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EmailForm from "@/components/EmailForm";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Hammer, Bath, Sofa, Ruler, DoorOpen, Zap } from "lucide-react";

const Index = () => {
  // Add smooth scrolling for hash links
  useEffect(() => {
    // Check if there's a hash in the URL when the page loads
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.scrollBy(0, -100); // Offset for navbar
        }
      }, 100); // Small delay to ensure the DOM is fully loaded
    }
    
    // This handles any anchor links within the page
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.scrollBy(0, -100); // Offset for navbar
          }
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        {/* About Company Section */}
        <section id="about" className="py-20 bg-background relative page-bands band-1">
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">About Our Company</h2>
              <div className="prose prose-lg mx-auto">
                <p className="text-muted-foreground mb-4">
                  Truckee Meadows Handyman has been serving the Reno/Sparks area with quality repair and maintenance services since 2010. Our team of skilled professionals is committed to providing exceptional workmanship and customer service.
                </p>
                <p className="text-muted-foreground mb-4">
                  We specialize in a wide range of home repair services, from minor fixes to major renovations. Our goal is to make your home maintenance experience as smooth and stress-free as possible.
                </p>
                <p className="text-muted-foreground">
                  Whether you need help with plumbing, electrical work, carpentry, or general repairs, you can count on us to deliver reliable and professional service every time.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <div className="py-20 bg-secondary relative page-bands band-2">
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 animate-blur-in">Why Choose Truckee Meadows Handyman?</h2>
              <p className="text-muted-foreground mb-12 animate-blur-in animation-delay-200">
                Truckee Meadows Metro Area Reno/Sparks. We provide professional, reliable and affordable handyman services throughout the Truckee Meadows area.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-card p-6 rounded-xl animate-fade-in-up animation-delay-200">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Quality Workmanship</h3>
                  <p className="text-sm text-muted-foreground">
                    Our skilled professionals take pride in delivering high-quality work that meets your expectations.
                  </p>
                </div>
                
                <div className="glass-card p-6 rounded-xl animate-fade-in-up animation-delay-400">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Fast Response</h3>
                  <p className="text-sm text-muted-foreground">
                    We respond quickly to your requests and strive to provide timely service to address your needs.
                  </p>
                </div>
                
                <div className="glass-card p-6 rounded-xl animate-fade-in-up animation-delay-600">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Affordable Rates</h3>
                  <p className="text-sm text-muted-foreground">
                    We offer competitive pricing and transparent quotes with no hidden fees or surprises.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <section id="how-it-works" className="py-24 bg-background fancy-blur-bg relative page-bands band-3">
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6">How It Works</h2>
              <p className="text-muted-foreground">
                Getting your repairs done is easy with our simple process
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div className="text-center pt-10 px-4">
                  <h3 className="text-xl font-medium mb-4">Submit Your Request</h3>
                  <p className="text-muted-foreground">
                    Fill out our simple form with details about your project and upload photos of what needs to be fixed.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div className="text-center pt-10 px-4">
                  <h3 className="text-xl font-medium mb-4">Get a Quote</h3>
                  <p className="text-muted-foreground">
                    Our team will review your request and provide you with a detailed quote for the work needed.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div className="text-center pt-10 px-4">
                  <h3 className="text-xl font-medium mb-4">20 Minutes Quick Response</h3>
                  <p className="text-muted-foreground">
                    Our team will review your job and contact you within 20 minutes to discuss next steps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section id="services" className="py-20 bg-background relative page-bands band-4">
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Services</h2>
              <p className="text-muted-foreground">
                Professional handyman services for all your home improvement needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Handyman Services */}
              <div className="group relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-all z-10"></div>
                <img 
                  src="/lovable-uploads/dfdef18e-66f7-4321-bd84-07a98d35a40e.png" 
                  alt="Handyman tools" 
                  className="w-full h-64 object-cover object-left"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Hammer className="h-6 w-6 text-white" />
                    <h3 className="text-xl font-bold text-white uppercase">Handyman</h3>
                  </div>
                  <Button variant="outline" className="mt-4 bg-transparent text-white border-white hover:bg-white hover:text-black">
                    Get it done!
                  </Button>
                </div>
              </div>
              
              {/* Kitchen and Bath */}
              <div className="group relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-all z-10"></div>
                <img 
                  src="/lovable-uploads/dfdef18e-66f7-4321-bd84-07a98d35a40e.png" 
                  alt="Kitchen and bath" 
                  className="w-full h-64 object-cover object-center"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Bath className="h-6 w-6 text-white" />
                    <h3 className="text-xl font-bold text-white uppercase">Kitchen and Bath</h3>
                  </div>
                  <Button variant="outline" className="mt-4 bg-transparent text-white border-white hover:bg-white hover:text-black">
                    Let's Do This!
                  </Button>
                </div>
              </div>
              
              {/* Assembly */}
              <div className="group relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-all z-10"></div>
                <img 
                  src="/lovable-uploads/dfdef18e-66f7-4321-bd84-07a98d35a40e.png" 
                  alt="Assembly" 
                  className="w-full h-64 object-cover object-right"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Sofa className="h-6 w-6 text-white" />
                    <h3 className="text-xl font-bold text-white uppercase">Assembly</h3>
                  </div>
                  <Button variant="outline" className="mt-4 bg-transparent text-white border-white hover:bg-white hover:text-black">
                    I'm Ready!
                  </Button>
                </div>
              </div>
              
              {/* Flooring */}
              <div className="group relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-all z-10"></div>
                <img 
                  src="/lovable-uploads/dfdef18e-66f7-4321-bd84-07a98d35a40e.png" 
                  alt="Flooring" 
                  className="w-full h-64 object-cover object-left-bottom"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Ruler className="h-6 w-6 text-white" />
                    <h3 className="text-xl font-bold text-white uppercase">Flooring</h3>
                  </div>
                  <Button variant="outline" className="mt-4 bg-transparent text-white border-white hover:bg-white hover:text-black">
                    Make it So
                  </Button>
                </div>
              </div>
              
              {/* Doors */}
              <div className="group relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-all z-10"></div>
                <img 
                  src="/lovable-uploads/dfdef18e-66f7-4321-bd84-07a98d35a40e.png" 
                  alt="Doors" 
                  className="w-full h-64 object-cover object-center-bottom"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <DoorOpen className="h-6 w-6 text-white" />
                    <h3 className="text-xl font-bold text-white uppercase">Doors</h3>
                  </div>
                  <Button variant="outline" className="mt-4 bg-transparent text-white border-white hover:bg-white hover:text-black">
                    Request a quote
                  </Button>
                </div>
              </div>
              
              {/* Electrical */}
              <div className="group relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-all z-10"></div>
                <img 
                  src="/lovable-uploads/dfdef18e-66f7-4321-bd84-07a98d35a40e.png" 
                  alt="Electrical" 
                  className="w-full h-64 object-cover object-right-bottom"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-6 w-6 text-white" />
                    <h3 className="text-xl font-bold text-white uppercase">Electrical</h3>
                  </div>
                  <Button variant="outline" className="mt-4 bg-transparent text-white border-white hover:bg-white hover:text-black">
                    In a Zap!
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="relative page-bands band-5">
          <EmailForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
