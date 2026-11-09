
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Camera, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileTransferProps {
  className?: string;
}

const MobileTransfer = ({ className }: MobileTransferProps) => {
  const [currentUrl, setCurrentUrl] = useState('');
  
  useEffect(() => {
    // Get the current URL to generate QR code
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <div className={cn("p-6 rounded-lg border border-border flex flex-col items-center", className)}>
      <div className="flex items-center gap-2 mb-4">
        <Smartphone className="h-5 w-5 text-primary" />
        <h3 className="font-medium text-lg">Continue on Mobile</h3>
      </div>
      
      <div className="bg-card p-3 rounded-lg mb-4">
        <QRCodeSVG 
          value={currentUrl} 
          size={180}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"H"}
          includeMargin={false}
        />
      </div>
      
      <div className="text-sm text-muted-foreground text-center space-y-2">
        <p>Scan this code with your phone to continue on mobile</p>
        <div className="flex items-center justify-center gap-2">
          <Camera className="h-4 w-4" />
          <span>Take photos directly from your device</span>
        </div>
      </div>
    </div>
  );
};

export default MobileTransfer;
