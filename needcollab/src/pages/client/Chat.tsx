import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send } from 'lucide-react';
import { mockMessages, mockCollaborations } from '@/data/mockData';
import { useTranslation } from 'react-i18next';

export default function Chat() {
  const { collaborationId } = useParams();
  const collab = mockCollaborations.find(c => c.id === collaborationId);
  const [messages, setMessages] = useState(mockMessages.filter(m => m.collaborationId === collaborationId));
  const [input, setInput] = useState('');
  const { t, i18n } = useTranslation();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: crypto.randomUUID(),
      collaborationId: collaborationId || '',
      senderId: '1',
      senderName: 'Moi',
      content: input,
      createdAt: new Date().toISOString(),
    }]);
    setInput('');
  };

  return (
    <div className="container flex max-w-3xl flex-col py-8" style={{ height: 'calc(100vh - 8rem)' }}>
      <div className="mb-4">
        <h1 className="text-xl font-bold">{collab?.needTitle || 'Chat'}</h1>
        <p className="text-sm text-muted-foreground">{t('chat.with')} {collab?.vendorName}</p>
      </div>

      <Card className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.senderId === '1' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-lg px-4 py-2 ${msg.senderId === '1' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <p className="text-xs font-medium opacity-70">{msg.senderName}</p>
                <p className="text-sm">{msg.content}</p>
                <p className="mt-1 text-[10px] opacity-50">
                  {new Date(msg.createdAt).toLocaleTimeString(i18n.language === 'fr' ? 'fr-FR' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <form onSubmit={handleSend} className="mt-4 flex gap-2">
        <Input value={input} onChange={e => setInput(e.target.value)} placeholder={t('chat.messagePlaceholder')} className="flex-1" />
        <Button type="submit" size="icon"><Send className="h-4 w-4" /></Button>
      </form>
    </div>
  );
}
