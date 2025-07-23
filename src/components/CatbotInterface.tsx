import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, User, Send, Brain, Database, Zap, Info } from 'lucide-react';
import { api } from '@/lib/api';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const CatbotInterface = () => {
  const [activeTab, setActiveTab] = useState('chatbot');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m Catbot, your AI assistant trained on Reddit conversations. I\'m here to help with anything you need! ✨',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const tabs = [
    { id: 'chatbot', label: 'Chatbot', icon: Bot },
    { id: 'model', label: 'Model', icon: Brain },
    { id: 'dataset', label: 'Dataset', icon: Database },
    { id: 'training', label: 'Training', icon: Zap },
    { id: 'about', label: 'About', icon: Info }
  ];

  const handleSendMessage = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const data = await api.chat(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "Sorry, I didn't get that.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          text: 'Sorry, there was a problem connecting to the server.',
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderChatbot = () => (
    <div className="flex flex-col h-full">
      {/* Chat Display Area with Glass Effect */}
      <div className="flex-1 bg-gradient-chat backdrop-blur-glass border border-chat-border rounded-2xl p-6 mb-6 overflow-y-auto max-h-96 min-h-[400px] shadow-strong relative">
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-6 right-8 w-1 h-1 bg-secondary rounded-full animate-pulse delay-300"></div>
        
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-4 ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-glow-primary backdrop-blur-sm border border-glass-border ${
                message.sender === 'user' 
                  ? 'bg-gradient-button text-primary-foreground' 
                  : 'bg-card/60 text-foreground'
              }`}>
                {message.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className={`max-w-xs lg:max-w-md px-5 py-3 rounded-2xl backdrop-blur-sm shadow-soft border border-glass-border ${
                message.sender === 'user'
                  ? 'bg-gradient-button text-primary-foreground ml-auto shadow-glow-primary'
                  : 'bg-card/60 text-foreground'
              }`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
                <span className="text-xs opacity-70 mt-2 block">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-card/60 backdrop-blur-sm border border-glass-border flex items-center justify-center shadow-glow-primary">
                <Bot size={18} />
              </div>
              <div className="bg-card/60 backdrop-blur-sm px-5 py-3 rounded-2xl border border-glass-border shadow-soft">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce shadow-glow-primary"></div>
                  <div className="w-2 h-2 bg-secondary rounded-full animate-bounce shadow-glow-secondary" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce shadow-glow-primary" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Section with Glass Effect */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="bg-card/60 backdrop-blur-sm border-glass-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground shadow-soft focus:shadow-glow-primary transition-all duration-300"
            disabled={isTyping}
          />
        </div>
        <Button
          onClick={handleSendMessage}
          disabled={!inputText.trim() || isTyping}
          className="bg-gradient-button hover:bg-primary-dark shadow-glow-primary rounded-xl px-6 py-3 transition-all duration-300 hover:shadow-glow-secondary"
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );

  const renderModel = () => (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Brain className="w-8 h-8 text-primary" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Model Architecture
        </h2>
      </div>
      <div className="bg-gradient-card backdrop-blur-glass border border-glass-border rounded-2xl p-8 shadow-strong">
        <p className="text-foreground/90 leading-relaxed mb-6 text-lg">
          Catbot uses a sophisticated deep learning architecture optimized for conversational AI:
        </p>
        <div className="grid gap-4">
          {[
            { title: "Embedding Layer", desc: "96-dimensional word embeddings for rich semantic representation", icon: "🧠" },
            { title: "Bidirectional LSTM", desc: "256 → 128 units for context understanding", icon: "🔄" },
            { title: "LSTM Layer", desc: "64 → 32 units for sequence processing", icon: "📊" },
            { title: "TimeDistributed Dense", desc: "Output layer for word prediction", icon: "🎯" },
            { title: "Regularization", desc: "Dropout layers, BatchNormalization, and L2 regularization", icon: "🛡️" }
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-accent/50 backdrop-blur-sm rounded-xl border border-glass-border hover:shadow-glow-primary transition-all duration-300">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <h3 className="font-semibold text-primary mb-1">{item.title}</h3>
                <p className="text-foreground/80 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDataset = () => (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Database className="w-8 h-8 text-secondary" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          Training Dataset
        </h2>
      </div>
      <div className="bg-gradient-card backdrop-blur-glass border border-glass-border rounded-2xl p-8 shadow-strong">
        <p className="text-foreground/90 leading-relaxed mb-6 text-lg">
          Catbot was trained on a carefully curated dataset from Reddit conversations:
        </p>
        <div className="grid gap-4">
          {[
            { title: "Source", desc: "Reddit comments from 2008–2015", icon: "📅", stat: "7 years" },
            { title: "Quality Filter", desc: "Comments filtered by score ≥ 2 for quality", icon: "⭐", stat: "High quality" },
            { title: "Dataset Size", desc: "10M training + 250K validation samples", icon: "📊", stat: "10.25M total" },
            { title: "Sequence Length", desc: "2–15 word sequences for optimal context", icon: "📏", stat: "2-15 words" },
            { title: "Preprocessing", desc: "Lowercase, special char removal, tokenization", icon: "🔧", stat: "Clean data" },
            { title: "Vocabulary", desc: "Optimized with frequency-based filtering", icon: "📚", stat: "Optimized" }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-accent/50 backdrop-blur-sm rounded-xl border border-glass-border hover:shadow-glow-secondary transition-all duration-300">
              <div className="flex items-start gap-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-secondary mb-1">{item.title}</h3>
                  <p className="text-foreground/80 text-sm">{item.desc}</p>
                </div>
              </div>
              <div className="bg-secondary/20 px-3 py-1 rounded-lg">
                <span className="text-secondary font-medium text-sm">{item.stat}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTraining = () => (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Zap className="w-8 h-8 text-primary" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
          Training Details
        </h2>
      </div>
      <div className="bg-gradient-card backdrop-blur-glass border border-glass-border rounded-2xl p-8 shadow-strong">
        <p className="text-foreground/90 leading-relaxed mb-6 text-lg">
          Catbot underwent extensive training with carefully tuned hyperparameters:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Training Duration", desc: "5 epochs with batch size 256", icon: "⏱️", value: "5 epochs" },
            { title: "Early Stopping", desc: "Patience of 12 epochs to prevent overfitting", icon: "🛑", value: "12 patience" },
            { title: "Optimizer", desc: "Adam optimizer with adaptive learning rate", icon: "🎯", value: "Adam" },
            { title: "Performance", desc: "Achieved 67.3% validation accuracy", icon: "📈", value: "67.3%" },
            { title: "Text Generation", desc: "Temperature sampling (0.8) with top-k (10)", icon: "🎲", value: "T=0.8, K=10" },
            { title: "Infrastructure", desc: "Trained on GPU clusters for performance", icon: "💻", value: "GPU clusters" }
          ].map((item, index) => (
            <div key={index} className="p-4 bg-accent/50 backdrop-blur-sm rounded-xl border border-glass-border hover:shadow-glow-primary transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">{item.icon}</span>
                <h3 className="font-semibold text-primary">{item.title}</h3>
              </div>
              <p className="text-foreground/80 text-sm mb-2">{item.desc}</p>
              <div className="bg-primary/20 px-2 py-1 rounded text-primary font-mono text-xs">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Info className="w-8 h-8 text-secondary" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          About Catbot
        </h2>
      </div>
      <div className="space-y-6">
        <div className="bg-gradient-card backdrop-blur-glass border border-glass-border rounded-2xl p-8 shadow-strong">
          <p className="text-foreground/90 leading-relaxed text-lg mb-6">
            Catbot is an advanced deep learning chatbot designed to engage in natural, human-like conversations. 
            Trained on millions of Reddit interactions, Catbot has learned to understand context, maintain 
            conversational flow, and respond appropriately to a wide variety of topics and questions.
          </p>
          <p className="text-foreground/90 leading-relaxed text-lg">
            The model combines state-of-the-art neural network architectures with careful data curation to 
            create an AI assistant that feels natural and helpful. Whether you're looking for casual conversation, 
            brainstorming ideas, or just want to chat, Catbot is here to help.
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 backdrop-blur-glass border border-glass-border rounded-2xl p-8 shadow-glow-primary">
          <div className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
              Created by Pranav Jorvekar
            </h3>
            <p className="text-foreground/90 text-lg leading-relaxed">
              A demonstration of modern conversational AI using deep learning techniques 
              and large-scale social media data.
            </p>
            <div className="mt-6 flex justify-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse delay-150"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'chatbot':
        return renderChatbot();
      case 'model':
        return renderModel();
      case 'dataset':
        return renderDataset();
      case 'training':
        return renderTraining();
      case 'about':
        return renderAbout();
      default:
        return renderChatbot();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header with Glass Effect */}
      <header className="bg-gradient-header shadow-strong backdrop-blur-glass border-b border-glass-border">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-glass-border shadow-glow-primary">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-5xl font-bold text-primary-foreground flex items-center gap-2">
                  Catbot
                  <Info className="w-8 h-8 text-secondary animate-pulse" />
                </h1>
                <p className="text-primary-foreground/90 mt-1 text-lg">AI Chatbot trained on Reddit conversations</p>
              </div>
            </div>
            <div className="text-right bg-glass-background backdrop-blur-glass rounded-2xl p-4 border border-glass-border shadow-soft">
              <p className="text-primary-foreground/90 text-sm">Made by</p>
              <p className="text-xl font-semibold text-primary-foreground">Pranav Jorvekar</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Bar with Glass Effect */}
      <nav className="bg-card/60 backdrop-blur-glass border-b border-glass-border shadow-medium sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium transition-all duration-300 border-b-2 flex items-center gap-2 relative group ${
                    activeTab === tab.id
                      ? 'text-primary border-primary bg-primary/10 shadow-glow-primary'
                      : 'text-muted-foreground border-transparent hover:text-primary hover:border-primary/50 hover:bg-primary/5'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute inset-0 bg-primary/5 rounded-t-lg backdrop-blur-sm"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="transform transition-all duration-500 ease-out">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* Footer with Glass Effect */}
      <footer className="bg-card/40 backdrop-blur-glass border-t border-glass-border text-center py-8 mt-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Bot className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              © 2025 Catbot — Created by Pranav Jorvekar
            </span>
            <Info className="w-4 h-4 text-secondary" />
          </div>
          <p className="text-xs text-muted-foreground/70">
            Powered by deep learning and Reddit conversations
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CatbotInterface;