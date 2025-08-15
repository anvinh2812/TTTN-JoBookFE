import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Save, 
  Trash2,
  StickyNote
} from 'lucide-react';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: string) => void;
  currentNote: string;
  applicationId: string;
}

export default function NoteModal({
  isOpen,
  onClose,
  onSave,
  currentNote,
  applicationId
}: NoteModalProps) {
  const [note, setNote] = useState(currentNote);

  const handleSave = () => {
    onSave(note.trim());
    onClose();
  };

  const handleClear = () => {
    setNote('');
  };

  const handleClose = () => {
    setNote(currentNote); // Reset to original value
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <StickyNote className="w-5 h-5 mr-2 text-yellow-600" />
            Ghi chú cá nhân
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-1">
            Thêm ghi chú để theo dõi tiến trình ứng tuyển của bạn.
          </p>
        </DialogHeader>

        <div className="py-4">
          <Label htmlFor="note-textarea" className="text-sm font-medium">
            Nội dung ghi chú
          </Label>
          <Textarea
            id="note-textarea"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ví dụ: Đã gọi điện với HR, họ nói sẽ phản hồi trong tuần này..."
            className="mt-2 min-h-[120px] resize-none"
            maxLength={500}
          />
          <div className="text-xs text-gray-500 mt-1 text-right">
            {note.length}/500 ký tự
          </div>
        </div>

        {/* Quick templates */}
        <div className="py-2">
          <Label className="text-xs text-gray-600 mb-2 block">
            Mẫu ghi chú nhanh:
          </Label>
          <div className="flex flex-wrap gap-2">
            {[
              'Đã gọi điện với HR',
              'Chờ phản hồi từ công ty',
              'Cần chuẩn bị phỏng vấn',
              'Đã pass vòng technical',
              'Đang đàm phán lương'
            ].map((template) => (
              <Button
                key={template}
                variant="outline"
                size="sm"
                className="text-xs h-7"
                onClick={() => setNote(prev => prev ? `${prev}. ${template}` : template)}
              >
                {template}
              </Button>
            ))}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <div className="flex w-full justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              disabled={!note}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Xóa
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleClose}>
                Hủy
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Lưu
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
