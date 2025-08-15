import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { MyCv } from '@shared/cv-management-data';
import { 
  FileText, 
  Check,
  Calendar,
  HardDrive,
  Eye
} from 'lucide-react';

interface SwapCvModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newCvId: string) => void;
  currentCvId: string;
  availableCvs: MyCv[];
}

export default function SwapCvModal({
  isOpen,
  onClose,
  onConfirm,
  currentCvId,
  availableCvs
}: SwapCvModalProps) {
  const [selectedCvId, setSelectedCvId] = useState(currentCvId);

  const handleConfirm = () => {
    if (selectedCvId && selectedCvId !== currentCvId) {
      onConfirm(selectedCvId);
      onClose();
    }
  };

  const handleViewCv = (cvId: string, cvTitle: string) => {
    // Mock CV view functionality
    console.log('Viewing CV:', cvTitle);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Thay đổi CV ứng tuyển</DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            Chọn CV khác từ thư viện của bạn để thay thế CV hiện tại.
          </p>
        </DialogHeader>

        <div className="py-4">
          <RadioGroup value={selectedCvId} onValueChange={setSelectedCvId}>
            <div className="space-y-3">
              {availableCvs.map((cv) => (
                <Card 
                  key={cv.id} 
                  className={`cursor-pointer transition-colors ${
                    selectedCvId === cv.id 
                      ? 'ring-2 ring-primary bg-blue-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedCvId(cv.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <RadioGroupItem value={cv.id} id={cv.id} />
                      <div className="flex-1 min-w-0">
                        <Label 
                          htmlFor={cv.id} 
                          className="cursor-pointer flex items-start justify-between w-full"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <FileText className="w-5 h-5 text-blue-600" />
                              <h4 className="font-semibold text-gray-900 truncate">
                                {cv.title}
                              </h4>
                              {cv.isDefault && (
                                <Badge variant="default" className="text-xs">
                                  Mặc định
                                </Badge>
                              )}
                              {cv.id === currentCvId && (
                                <Badge variant="outline" className="text-xs">
                                  Hiện tại
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {cv.uploadDate}
                              </span>
                              <span className="flex items-center">
                                <HardDrive className="w-3 h-3 mr-1" />
                                {cv.size}
                              </span>
                            </div>
                            
                            <p className="text-xs text-gray-600 mt-1 truncate">
                              {cv.fileName}
                            </p>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewCv(cv.id, cv.title);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </RadioGroup>
        </div>

        {availableCvs.length === 0 && (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Không có CV nào
            </h3>
            <p className="text-gray-600 mb-4">
              Bạn cần tải lên ít nhất một CV để có thể thay đổi.
            </p>
            <Button variant="outline">
              Tải CV mới
            </Button>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!selectedCvId || selectedCvId === currentCvId}
          >
            <Check className="w-4 h-4 mr-2" />
            Xác nhận thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
