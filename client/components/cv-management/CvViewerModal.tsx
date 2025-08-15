import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  ExternalLink, 
  FileText,
  X
} from 'lucide-react';

interface CvViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvTitle: string;
  cvUrl: string;
  fileName: string;
  uploadDate: string;
  fileSize: string;
}

export default function CvViewerModal({
  isOpen,
  onClose,
  cvTitle,
  cvUrl,
  fileName,
  uploadDate,
  fileSize
}: CvViewerModalProps) {
  const handleDownload = () => {
    // Mock download functionality
    console.log('Downloading CV:', fileName);
  };

  const handleOpenExternal = () => {
    // Mock external view functionality
    console.log('Opening CV in new tab:', cvUrl);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <DialogTitle className="text-xl font-semibold">{cvTitle}</DialogTitle>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center">
                  <FileText className="w-4 h-4 mr-1" />
                  {fileName}
                </span>
                <span>{uploadDate}</span>
                <Badge variant="outline" className="text-xs">
                  {fileSize}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Tải xuống
              </Button>
              <Button variant="outline" size="sm" onClick={handleOpenExternal}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Mở tab mới
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="p-6">
          {/* Mock PDF Viewer */}
          <div className="w-full h-[600px] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
            <FileText className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">PDF Viewer (Mock)</h3>
            <p className="text-gray-500 mb-4 text-center max-w-md">
              This is a mock PDF viewer. In a real application, you would integrate with a PDF viewer library like react-pdf or pdf.js.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-sm border max-w-md">
              <h4 className="font-semibold mb-2">CV Preview: {cvTitle}</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>File:</strong> {fileName}</p>
                <p><strong>Size:</strong> {fileSize}</p>
                <p><strong>Upload Date:</strong> {uploadDate}</p>
                <p><strong>URL:</strong> {cvUrl}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
