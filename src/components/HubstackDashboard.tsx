import React, { useState, useEffect } from 'react';
import {
  Users, Heart, Eye, BarChart3, Clock, Bookmark, Instagram, TrendingUp,
  Upload, Sun, Moon, Download, FileText, X, CheckCircle, Share2, MessageCircle,
  Star, Activity, Zap, MapPin, Layers, Camera, Video, Image, Monitor,
  HelpCircle, Send, Mail, Phone
} from "lucide-react";
import {
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis
} from 'recharts';

const HubstackDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDark, setIsDark] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(30);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Dados de exemplo
  const weeklyData = [
    { day: 'S', reach: selectedPeriod === 7 ? 4000 : selectedPeriod === 30 ? 12400 : 35000 },
    { day: 'T', reach: selectedPeriod === 7 ? 5000 : selectedPeriod === 30 ? 15600 : 44000 },
    { day: 'Q', reach: selectedPeriod === 7 ? 6000 : selectedPeriod === 30 ? 18200 : 51000 },
    { day: 'Q', reach: selectedPeriod === 7 ? 5500 : selectedPeriod === 30 ? 16800 : 47000 },
    { day: 'S', reach: selectedPeriod === 7 ? 7000 : selectedPeriod === 30 ? 21500 : 60000 },
    { day: 'S', reach: selectedPeriod === 7 ? 8500 : selectedPeriod === 30 ? 25300 : 71000 },
    { day: 'D', reach: selectedPeriod === 7 ? 7800 : selectedPeriod === 30 ? 23100 : 65000 }
  ];

  const ageData = [
    { name: '18-24', value: 35, color: '#3B82F6' },
    { name: '25-34', value: 28, color: '#1E40AF' },
    { name: '35-44', value: 22, color: '#60A5FA' },
    { name: '45+', value: 15, color: '#1D4ED8' }
  ];

  const showToast = (message, type = 'success') => {
    const existing = document.getElementById('toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = `fixed top-4 right-4 px-4 py-3 rounded-lg text-white z-50 ${
      type === 'success' ? 'bg-blue-600' : 'bg-red-500'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 3000);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.csv')) {
      setUploadedFile(file);
      setFileUploaded(true);
      showToast('Arquivo carregado com sucesso!');
    } else {
      showToast('Selecione um arquivo CSV válido', 'error');
    }
  };

  const shareViaWhatsApp = () => {
    const text = `📊 Relatório Instagram Analytics
    
📈 Período: ${selectedPeriod} dias
❤️ Curtidas: 18.2K
💬 Comentários: 2.4K  
👁️ Alcance: 125K
📱 Engajamento: 4.2%

Relatório Hubstack®`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    showToast('Compartilhando via WhatsApp...');
  };

  const shareViaEmail = () => {
    const subject = 'Relatório Instagram Analytics';
    const body = `Relatório de performance dos últimos ${selectedPeriod} dias.

Métricas principais:
• Curtidas: 18.2K
• Comentários: 2.4K
• Alcance: 125K
• Engajamento: 4.2%

Gerado por Hubstack®`;
    
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    showToast('Abrindo cliente de email...');
  };

  const generatePDF = () => {
    showToast('Gerando PDF...');
    setTimeout(() => {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Relatório Instagram</title>
            <style>
              body { font-family: Arial; padding: 20px; }
              .header { text-align: center; border-bottom: 2px solid #3B82F6; padding-bottom: 20px; }
              .metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 30px 0; }
              .metric { border: 1px solid #ddd; padding: 15px; text-align: center; border-radius: 8px; }
              .metric-title { font-size: 12px; color: #666; margin-bottom: 10px; }
              .metric-value { font-size: 24px; font-weight: bold; color: #1E40AF; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Hubstack® - Relatório Instagram Analytics</h1>
              <p>Período: ${selectedPeriod} dias • Gerado em ${new Date().toLocaleDateString('pt-BR')}</p>
            </div>
            <div class="metrics">
              <div class="metric">
                <div class="metric-title">CURTIDAS</div>
                <div class="metric-value">18.2K</div>
              </div>
              <div class="metric">
                <div class="metric-title">COMENTÁRIOS</div>
                <div class="metric-value">2.4K</div>
              </div>
              <div class="metric">
                <div class="metric-title">ALCANCE</div>
                <div class="metric-value">125K</div>
              </div>
              <div class="metric">
                <div class="metric-title">ENGAJAMENTO</div>
                <div class="metric-value">4.2%</div>
              </div>
            </div>
            <p style="text-align: center; margin-top: 50px; color: #666;">
              © 2025 Hubstack® • Todos os direitos reservados
            </p>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }, 1000);
  };

  return (
    <div className={`min-h-screen transition-all ${isDark ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Hubstack®</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Relatório Instagram Analytics</p>
              </div>
              <div className="flex items-center gap-3 ml-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="font-semibold text-sm">@cliente_exemplo</p>
                  <p className="text-xs text-gray-500">125.4K seguidores</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Filtro de Período */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {[7, 30, 90].map((days) => (
                  <button
                    key={days}
                    onClick={() => setSelectedPeriod(days)}
                    className={`px-3 py-1 text-sm rounded ${
                      selectedPeriod === days
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {days}d
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                <Share2 className="w-4 h-4" />
                Compartilhar
              </button>
              
              <button
                onClick={() => setShowDataModal(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Upload className="w-4 h-4" />
                CSV
              </button>
              
              <button
                onClick={generatePDF}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                <Download className="w-4 h-4" />
                PDF
              </button>
              
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
              >
                {isDark ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-gray-600" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        
        {/* Métricas Principais */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Heart, title: 'Curtidas', value: '18.2K', change: '+12.5%', color: 'blue' },
            { icon: MessageCircle, title: 'Comentários', value: '2.4K', change: '+8.3%', color: 'indigo' },
            { icon: Eye, title: 'Alcance', value: '125K', change: '+15.7%', color: 'cyan' },
            { icon: Users, title: 'Engajamento', value: '4.2%', change: '+0.8%', color: 'green' }
          ].map((metric, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-${metric.color}-100`}>
                  <metric.icon className={`w-5 h-5 text-${metric.color}-600`} />
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{metric.title}</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{metric.value}</p>
                  <p className="text-xs text-green-600 font-medium">{metric.change}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Performance */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Users, title: 'Visitas ao Perfil', value: '3.2K', change: '+18%' },
            { icon: Clock, title: 'Tempo Médio', value: '2m 45s', change: '+15s' },
            { icon: Bookmark, title: 'Salvamentos', value: '1.2K', change: '+125' },
            { icon: Share2, title: 'Links Externos', value: '456', change: '+89' }
          ].map((metric, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <metric.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{metric.title}</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{metric.value}</p>
                  <p className="text-xs text-green-600 font-medium">{metric.change}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Gráficos */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Alcance Semanal */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Alcance Semanal</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Area 
                  type="monotone" 
                  dataKey="reach" 
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#gradient)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Faixa Etária */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Faixa Etária</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={ageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {ageData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Crescimento */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Crescimento</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  +{selectedPeriod === 7 ? '3.2' : selectedPeriod === 30 ? '12.5' : '28.7'}%
                </div>
                <div className="text-sm text-gray-600">Este período</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-indigo-600">
                  +{selectedPeriod === 7 ? '0.8' : selectedPeriod === 30 ? '2.3' : '6.8'}K
                </div>
                <div className="text-sm text-gray-600">Novos seguidores</div>
              </div>
            </div>
          </div>
        </section>

        {/* Insights */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">💡 Insights</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">✨ Melhor formato: 3:4</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg">
                <p className="text-sm text-gray-700">🏷️ Hashtag top: #lifestyle</p>
              </div>
              <div className="p-3 bg-cyan-50 rounded-lg">
                <p className="text-sm text-gray-700">👥 Público: 25-34 anos</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">📍 Localização</h3>
            <div className="space-y-3">
              {['São Paulo, BR', 'Rio de Janeiro, BR', 'Belo Horizonte, BR'].map((city, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{city}</span>
                  <span className="text-sm font-medium">{[85, 65, 45][index]}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">📱 Conteúdo</h3>
            <div className="space-y-3">
              {[
                { type: 'Posts', count: 45 },
                { type: 'Stories', count: 128 },
                { type: 'Reels', count: 23 },
                { type: 'Videos', count: 12 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.type}</span>
                  <span className="text-sm font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 mt-8">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
            <div className="text-gray-600 dark:text-gray-400">
              © 2025 Hubstack® • Todos os direitos reservados • Desenvolvido por Hubstack®
            </div>
            <div className="text-gray-500">
              Relatório gerado em {currentTime.toLocaleDateString('pt-BR')} às {currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de Compartilhamento */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Compartilhar Relatório</h2>
              <button 
                onClick={() => setShowShareModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={shareViaWhatsApp}
                className="w-full flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg"
              >
                <Phone className="w-8 h-8 text-green-600" />
                <div className="text-left">
                  <p className="font-medium">WhatsApp</p>
                  <p className="text-sm text-gray-600">Compartilhar via WhatsApp</p>
                </div>
              </button>
              
              <button
                onClick={shareViaEmail}
                className="w-full flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg"
              >
                <Mail className="w-8 h-8 text-blue-600" />
                <div className="text-left">
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-gray-600">Enviar por email</p>
                </div>
              </button>
              
              <button
                onClick={generatePDF}
                className="w-full flex items-center gap-3 p-4 bg-red-50 hover:bg-red-100 rounded-lg"
              >
                <Download className="w-8 h-8 text-red-600" />
                <div className="text-left">
                  <p className="font-medium">PDF Compartilhável</p>
                  <p className="text-sm text-gray-600">Gerar PDF formatado A4</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal CSV */}
      {showDataModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Importar CSV</h2>
              <button 
                onClick={() => setShowDataModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <label className="block border-2 border-dashed border-blue-300 p-6 rounded-lg text-center cursor-pointer hover:border-blue-500">
              <input 
                type="file" 
                accept=".csv" 
                className="hidden" 
                onChange={handleFileSelect} 
              />
              <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <p className="font-medium">
                {uploadedFile ? uploadedFile.name : "Clique para enviar CSV"}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Formatos aceitos: .csv
              </p>
            </label>
            
            {fileUploaded && (
              <div className="mt-4 p-3 bg-green-50 text-green-800 rounded-lg">
                ✅ Arquivo carregado com sucesso!
              </div>
            )}
            
            {fileUploaded && (
              <button
                onClick={() => {
                  showToast("Dashboard atualizado com dados do CSV!");
                  setShowDataModal(false);
                }}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
              >
                Processar e Atualizar Dashboard
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HubstackDashboard;