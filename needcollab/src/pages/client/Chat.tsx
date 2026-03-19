import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getMessages, createMessage } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import type { Message } from '@/types';

export default function Chat() {
  const { needId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!needId) return;
    getMessages(needId)
      .then(d => setMessages(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, [needId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !needId) return;
    setSending(true);
    try {
      const msg = await createMessage({
        need_id: needId,
        sender_id: user?.id,
        content: input,
        is_vendor_channel: false,
      }) as Message;
      setMessages(prev => [...prev, msg]);
      setInput('');
    } catch {
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        need_id: needId,
        sender_id: user?.id || '',
        offer_id: null,
        content: input,
        is_vendor_channel: false,
        created_at: new Date().toISOString(),
      }]);
      setInput('');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container flex max-w-3xl flex-col py-8" style={{ height: 'calc(100vh - 8rem)' }}>
      <div className="mb-4">
        <h1 className="text-xl font-bold">{t('chat.title')}</h1>
      </div>

      <Card className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-lg px-4 py-2 ${msg.sender_id === user?.id ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {msg.sender && <p className="text-xs font-medium opacity-70">{msg.sender.full_name}</p>}
                <p className="text-sm">{msg.content}</p>
                <p className="mt-1 text-[10px] opacity-50">
                  {new Date(msg.created_at).toLocaleTimeString(i18n.language === 'fr' ? 'fr-FR' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
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
