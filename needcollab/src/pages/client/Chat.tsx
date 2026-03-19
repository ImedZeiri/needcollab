import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getMessages, createMessage, getCollaborations } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import type { Message, Collaboration } from '@/types';

export default function Chat() {
  const { collaborationId } = useParams();
  const { user } = useAuth();
  const [collab, setCollab] = useState<Collaboration | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!collaborationId) return;
    getCollaborations(collaborationId)
      .then(d => setCollab(Array.isArray(d) ? d[0] : d as Collaboration))
      .catch(() => {});
    getMessages(collaborationId)
      .then(d => setMessages(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, [collaborationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !collaborationId) return;
    setSending(true);
    try {
      const msg = await createMessage({
        collaborationId,
        senderId: user?.id,
        senderName: user?.name,
        content: input,
      }) as Message;
      setMessages(prev => [...prev, msg]);
      setInput('');
    } catch {
      // optimistic fallback
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        collaborationId,
        senderId: user?.id || '',
        senderName: user?.name || '',
        content: input,
        createdAt: new Date().toISOString(),
      }]);
      setInput('');
    } finally {
      setSending(false);
    }
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
            <div key={msg.id} className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-lg px-4 py-2 ${msg.senderId === user?.id ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <p className="text-xs font-medium opacity-70">{msg.senderName}</p>
                <p className="text-sm">{msg.content}</p>
                <p className="mt-1 text-[10px] opacity-50">
                  {new Date(msg.createdAt).toLocaleTimeString(i18n.language === 'fr' ? 'fr-FR' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </Card>

      <form onSubmit={handleSend} className="mt-4 flex gap-2">
        <Input value={input} onChange={e => setInput(e.target.value)} placeholder={t('chat.messagePlaceholder')} className="flex-1" />
        <Button type="submit" size="icon" disabled={sending}><Send className="h-4 w-4" /></Button>
      </form>
    </div>
  );
}
