import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useScrollAnimation } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { Camera, Upload, Check, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const JobSubmission = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ref, isVisible] = useScrollAnimation(0.1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setAddressLine1('');
      setCity('');
      setState('');
      setZipCode('');
      setDescription('');
      setImage(null);
      setImagePreview(null);
      
      toast({
        title: "Job submitted successfully!",
        description: "We'll contact you shortly to discuss your project.",
      });
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 deep-panel">
      <div className="container px-4 md:px-6 mx-auto">
        <div 
          ref={ref}
          className={cn(
            "flex flex-col lg:flex-row gap-12 items-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          )}
        >
          <div className="flex-1 w-full lg:w-1/2">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold mb-6 text-balance">Submit Your Project</h2>
              <p className="text-muted-foreground mb-8">
                Tell us about your repair needs and upload a photo of the job. Our team will review your request and get back to you with a quote.
              </p>
              
              <div className="space-y-6 md:space-y-10">
                <div className="flex items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20 ring-1 ring-primary/30">
                    <Camera className="h-5 w-5 text-gold" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Upload Job Photos</h3>
                    <p className="text-sm text-muted-foreground">
                      Share photos of what needs to be fixed to help us prepare an accurate quote.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20 ring-1 ring-primary/30">
                    <Check className="h-5 w-5 text-gold" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Detailed Assessment</h3>
                    <p className="text-sm text-muted-foreground">
                      Provide a description of what needs to be fixed and any relevant details.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20 ring-1 ring-primary/30">
                    <Check className="h-5 w-5 text-gold" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">20 Minutes Quick Response</h3>
                    <p className="text-sm text-muted-foreground">
                      Our team will review your job and contact you within 20 minutes to discuss next steps.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full lg:w-1/2">
            <div className="deep-glass rounded-2xl p-8 text-left">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone</label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 123-4567"
                      className="w-full"
                    />
                  </div>
                  
                  {/* Address Section */}
                  <div>
                    <span className="block text-sm font-medium mb-2">Address</span>
                    <div className="space-y-3">
                      <label htmlFor="job-address-line1" className="sr-only">Address line 1</label>
                      <Input
                        id="job-address-line1"
                        type="text"
                        placeholder="Address Line 1"
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        className="w-full"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="job-city" className="sr-only">City</label>
                          <Input
                            id="job-city"
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label htmlFor="job-state" className="sr-only">State</label>
                          <Input
                            id="job-state"
                            type="text"
                            placeholder="State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="w-full"
                          />
                        </div>
                      </div>
                      <label htmlFor="job-zip" className="sr-only">Zip code</label>
                      <Input
                        id="job-zip"
                        type="text"
                        placeholder="Zip Code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-2">Project Description</label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please describe what needs to be fixed..."
                      required
                      className="w-full min-h-[120px]"
                    />
                  </div>
                  
                  <div>
                    <span className="block text-sm font-medium mb-2">Upload Photo</span>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gold/50 rounded-lg bg-foreground/[0.04]">
                      <div className="space-y-1 text-center">
                        {imagePreview ? (
                          <div className="relative mx-auto">
                            <img 
                              src={imagePreview} 
                              alt="Job preview" 
                              className="mx-auto max-h-48 rounded-lg object-cover"
                            />
                            <button 
                              type="button"
                              aria-label="Clear image"
                              onClick={handleClearImage}
                              className="absolute -top-2 -right-2 bg-card rounded-full p-1 shadow-md ring-1 ring-border"
                            >
                              <X className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                            <div className="flex text-sm text-muted-foreground">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/90 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  accept="image/*"
                                  className="sr-only"
                                  onChange={handleImageChange}
                                  ref={fileInputRef}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-foreground/75">PNG, JPG, GIF up to 10MB</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full shadow-glow"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Job Request"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobSubmission;
