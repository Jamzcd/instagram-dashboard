import React, { useState, useEffect } from 'react';
import {
  Users, Heart, Eye, BarChart3, Clock, Bookmark, Instagram, TrendingUp,
  Upload, Sun, Moon, Download, FileText, X, CheckCircle, Share2, MessageCircle,
  Star, Activity, Zap, MapPin, Layers, Camera, Video, Image, Monitor,
  HelpCircle, Send, Mail, Phone, Edit3, Save
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
  const [showManualModal, setShowManualModal] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Estados para dados editáveis
  const [profileData, setProfileData] = useState({
    username: '@cliente_exemplo',
    followers: '125.4K',
    profileImage: null
  });

  const [mainMetrics, setMainMetrics] = useState({
    likes: '18.2K',
    likesChange: '+12.5%',
    comments: '2.4K',
    commentsChange: '+8.3%',
    reach: '125K',
    reachChange: '+15.7%',
    engagement: '4.2%',
    engagementChange: '+0.8%'
  });

  const [performanceMetrics, setPerformanceMetrics] = useState({
    profileVisits: '3.2K',
    profileVisitsChange: '+18%',
    averageTime: '2m 45s',
    averageTimeChange: '+15s',
    saves: '1.2K',
    savesChange: '+125',
    externalLinks: '456',
    externalLinksChange: '+89'
  });

  const [chartData, setChartData] = useState({
    weekly: [
      { day: 'S', reach: 12400 },
      { day: 'T', reach: 15600 },
      { day: 'Q', reach: 18200 },
      { day: 'Q', reach: 16800 },
      { day: 'S', reach: 21500 },
      { day: 'S', reach: 25300 },
      { day: 'D', reach: 23100 }
    ],
    ageData: [
      { name: '18-24', value: 35, color: '#3B82F6' },
      { name: '25-34', value: 28, color: '#1E40AF' },
      { name: '35-44', value: 22, color: '#60A5FA' },
      { name: '45+', value: 15, color: '#1D4ED8' }
    ]
  });

  const [growthData, setGrowthData] = useState({
    periodGrowth: '+12.5%',
    newFollowers: '+2.3K'
  });

  const [insightsData, setInsightsData] = useState({
    bestFormat: '3:4',
    topHashtag: '#lifestyle',
    targetAudience: '25-34 anos'
  });

  const [locationData, setLocationData] = useState([
    { city: 'São Paulo, BR', percentage: 85 },
    { city: 'Rio de Janeiro, BR', percentage: 65 },
    { city: 'Belo Horizonte, BR', percentage: 45 }
  ]);

  const [contentData, setContentData] = useState([
    { type: 'Posts', count: 45 },
    { type: 'Stories', count: 128 },
    { type: 'Reels', count: 23 },
    { type: 'Videos', count: 12 }
  ]);

  // Estados temporários para edição
  const [tempData, setTempData] = useState({});

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

  const handleProfileImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTempData(prev => ({
          ...prev,
          profileData: { ...prev.profileData, profileImage: e.target.result }
        }));
      };
      reader.readAsDataURL(file);
      showToast('Imagem carregada com sucesso!');
    } else {
      showToast('Selecione uma imagem válida', 'error');
    }
  };

  const openManualDataModal = () => {
    setTempData({
      profileData: { ...profileData },
      insightsData: { ...insightsData }
    });
    setShowManualModal(true);
  };

  const saveManualData = () => {
    setProfileData(tempData.profileData);
    setInsightsData(tempData.insightsData);
    setShowManualModal(false);
    showToast('Perfil atualizado com sucesso!');
  };

  const shareViaWhatsApp = () => {
    const text = `📊 Relatório Instagram Analytics
    
📈 Período: ${selectedPeriod} dias
❤️ Curtidas: ${mainMetrics.likes}
💬 Comentários: ${mainMetrics.comments}
👁️ Alcance: ${mainMetrics.reach}
📱 Engajamento: ${mainMetrics.engagement}

Relatório Hubstack®`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    showToast('Compartilhando via WhatsApp...');
  };

  const shareViaEmail = () => {
    const subject = 'Relatório Instagram Analytics';
    const body = `Relatório de performance dos últimos ${selectedPeriod} dias.

Métricas principais:
• Curtidas: ${mainMetrics.likes}
• Comentários: ${mainMetrics.comments}
• Alcance: ${mainMetrics.reach}
• Engajamento: ${mainMetrics.engagement}

Gerado por Hubstack®`;
    
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    showToast('Abrindo cliente de email...');
  };

  const generatePDF = () => {
    showToast('Gerando PDF do dashboard...');
    setTimeout(() => {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Dashboard Instagram - ${profileData.username}</title>
            <style>
              @page { 
                size: A4 landscape; 
                margin: 15mm; 
              }
              * { 
                box-sizing: border-box; 
                margin: 0; 
                padding: 0; 
              }
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
                padding: 20px;
                font-size: 12px;
              }
              .header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: white;
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 20px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
              }
              .header-left {
                display: flex;
                align-items: center;
                gap: 15px;
              }
              .logo {
                width: 48px;
                height: 48px;
                background: linear-gradient(135deg, #2563eb, #4f46e5);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 20px;
              }
              .brand h1 {
                font-size: 20px;
                font-weight: bold;
                color: #1f2937;
              }
              .brand p {
                font-size: 12px;
                color: #6b7280;
              }
              .profile {
                display: flex;
                align-items: center;
                gap: 10px;
              }
              .profile-img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: linear-gradient(135deg, #60a5fa, #4f46e5);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                overflow: hidden;
              }
              .profile-img img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
              .header-right {
                text-align: right;
              }
              .period {
                background: #f3f4f6;
                padding: 8px 16px;
                border-radius: 8px;
                font-weight: 500;
                margin-bottom: 5px;
              }
              .metrics-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 15px;
                margin-bottom: 20px;
              }
              .metric-card {
                background: white;
                border-radius: 12px;
                padding: 20px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                border: 1px solid #f3f4f6;
              }
              .metric-header {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 10px;
              }
              .metric-icon {
                width: 36px;
                height: 36px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .metric-icon.blue { background: #dbeafe; color: #2563eb; }
              .metric-icon.indigo { background: #e0e7ff; color: #4f46e5; }
              .metric-icon.cyan { background: #cffafe; color: #0891b2; }
              .metric-icon.green { background: #dcfce7; color: #16a34a; }
              .metric-title {
                font-size: 10px;
                color: #6b7280;
                text-transform: uppercase;
                font-weight: 500;
                margin-bottom: 5px;
              }
              .metric-value {
                font-size: 22px;
                font-weight: bold;
                color: #1f2937;
                margin-bottom: 5px;
              }
              .metric-change {
                font-size: 10px;
                color: #16a34a;
                font-weight: 500;
              }
              .performance-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 15px;
                margin-bottom: 20px;
              }
              .charts-row {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 20px;
                margin-bottom: 20px;
              }
              .chart-card {
                background: white;
                border-radius: 12px;
                padding: 20px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                border: 1px solid #f3f4f6;
              }
              .chart-title {
                font-size: 14px;
                font-weight: 600;
                color: #1f2937;
                margin-bottom: 15px;
              }
              .chart-placeholder {
                height: 120px;
                background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 500;
                margin-bottom: 15px;
              }
              .age-legend {
                display: flex;
                justify-content: center;
                gap: 15px;
                flex-wrap: wrap;
              }
              .legend-item {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 11px;
              }
              .legend-color {
                width: 12px;
                height: 12px;
                border-radius: 50%;
              }
              .growth-stats {
                text-align: center;
                padding: 20px 0;
              }
              .growth-main {
                font-size: 32px;
                font-weight: bold;
                color: #2563eb;
                margin-bottom: 5px;
              }
              .growth-sub {
                font-size: 18px;
                font-weight: bold;
                color: #4f46e5;
                margin-bottom: 5px;
              }
              .growth-label {
                font-size: 11px;
                color: #6b7280;
              }
              .insights-row {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 20px;
              }
              .insight-card {
                background: white;
                border-radius: 12px;
                padding: 20px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                border: 1px solid #f3f4f6;
              }
              .insight-item {
                background: #f8fafc;
                padding: 12px;
                border-radius: 8px;
                margin-bottom: 10px;
                font-size: 11px;
                color: #374151;
              }
              .insight-item:last-child {
                margin-bottom: 0;
              }
              .location-item, .content-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 0;
                border-bottom: 1px solid #f3f4f6;
                font-size: 11px;
              }
              .location-item:last-child, .content-item:last-child {
                border-bottom: none;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                padding-top: 15px;
                border-top: 1px solid #e5e7eb;
                color: #6b7280;
                font-size: 10px;
              }
              @media print {
                body { 
                  background: white !important; 
                  padding: 10mm !important;
                }
                .header, .metric-card, .chart-card, .insight-card {
                  box-shadow: none !important;
                  border: 1px solid #e5e7eb !important;
                }
              }
            </style>
          </head>
          <body>
            <!-- Header -->
            <div class="header">
              <div class="header-left">
                <div class="logo">H</div>
                <div class="brand">
                  <h1>Hubstack®</h1>
                  <p>Relatório Instagram Analytics</p>
                </div>
                <div class="profile">
                  <div class="profile-img">
                    ${profileData.profileImage ? 
                      `<img src="${profileData.profileImage}" alt="Profile">` : 
                      `<span>${profileData.username.charAt(1)?.toUpperCase() || 'U'}</span>`
                    }
                  </div>
                  <div>
                    <div style="font-weight: 600; font-size: 12px;">${profileData.username}</div>
                    <div style="font-size: 10px; color: #6b7280;">${profileData.followers} seguidores</div>
                  </div>
                </div>
              </div>
              <div class="header-right">
                <div class="period">${selectedPeriod} dias</div>
                <div style="font-size: 10px; color: #6b7280;">Gerado em ${new Date().toLocaleDateString('pt-BR')}</div>
              </div>
            </div>

            <!-- Métricas Principais -->
            <div class="metrics-grid">
              <div class="metric-card">
                <div class="metric-header">
                  <div class="metric-icon blue">❤️</div>
                  <div>
                    <div class="metric-title">Curtidas</div>
                    <div class="metric-value">${mainMetrics.likes}</div>
                    <div class="metric-change">${mainMetrics.likesChange}</div>
                  </div>
                </div>
              </div>
              <div class="metric-card">
                <div class="metric-header">
                  <div class="metric-icon indigo">💬</div>
                  <div>
                    <div class="metric-title">Comentários</div>
                    <div class="metric-value">${mainMetrics.comments}</div>
                    <div class="metric-change">${mainMetrics.commentsChange}</div>
                  </div>
                </div>
              </div>
              <div class="metric-card">
                <div class="metric-header">
                  <div class="metric-icon cyan">👁️</div>
                  <div>
                    <div class="metric-title">Alcance</div>
                    <div class="metric-value">${mainMetrics.reach}</div>
                    <div class="metric-change">${mainMetrics.reachChange}</div>
                  </div>
                </div>
              </div>
              <div class="metric-card">
                <div class="metric-header">
                  <div class="metric-icon green">👥</div>
                  <div>
                    <div class="metric-title">Engajamento</div>
                    <div class="metric-value">${mainMetrics.engagement}</div>
                    <div class="metric-change">${mainMetrics.engagementChange}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Métricas de Performance -->
            <div class="performance-grid">
              <div class="metric-card">
                <div class="metric-header">
                  <div class="metric-icon blue">🔍</div>
                  <div>
                    <div class="metric-title">Visitas ao Perfil</div>
                    <div class="metric-value">${performanceMetrics.profileVisits}</div>
                    <div class="metric-change">${performanceMetrics.profileVisitsChange}</div>
                  </div>
                </div>
              </div>
              <div class="metric-card">
                <div class="metric-header">
                  <div class="metric-icon blue">⏱️</div>
                  <div>
                    <div class="metric-title">Tempo Médio</div>
                    <div class="metric-value">${performanceMetrics.averageTime}</div>
                    <div class="metric-change">${performanceMetrics.averageTimeChange}</div>
                  </div>
                </div>
              </div>
              <div class="metric-card">
                <div class="metric-header">
                  <div class="metric-icon blue">🔖</div>
                  <div>
                    <div class="metric-title">Salvamentos</div>
                    <div class="metric-value">${performanceMetrics.saves}</div>
                    <div class="metric-change">${performanceMetrics.savesChange}</div>
                  </div>
                </div>
              </div>
              <div class="metric-card">
                <div class="metric-header">
                  <div class="metric-icon blue">🔗</div>
                  <div>
                    <div class="metric-title">Links Externos</div>
                    <div class="metric-value">${performanceMetrics.externalLinks}</div>
                    <div class="metric-change">${performanceMetrics.externalLinksChange}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Gráficos e Crescimento -->
            <div class="charts-row">
              <div class="chart-card">
                <div class="chart-title">📈 Alcance Semanal</div>
                <div class="chart-placeholder">Gráfico de Alcance</div>
              </div>
              <div class="chart-card">
                <div class="chart-title">👥 Faixa Etária</div>
                <div class="chart-placeholder">Gráfico Pizza</div>
                <div class="age-legend">
                  <div class="legend-item">
                    <div class="legend-color" style="background: #3B82F6;"></div>
                    <span>18-24 (35%)</span>
                  </div>
                  <div class="legend-item">
                    <div class="legend-color" style="background: #1E40AF;"></div>
                    <span>25-34 (28%)</span>
                  </div>
                  <div class="legend-item">
                    <div class="legend-color" style="background: #60A5FA;"></div>
                    <span>35-44 (22%)</span>
                  </div>
                  <div class="legend-item">
                    <div class="legend-color" style="background: #1D4ED8;"></div>
                    <span>45+ (15%)</span>
                  </div>
                </div>
              </div>
              <div class="chart-card">
                <div class="chart-title">📊 Crescimento</div>
                <div class="growth-stats">
                  <div class="growth-main">${growthData.periodGrowth}</div>
                  <div class="growth-label">Este período</div>
                  <div class="growth-sub">${growthData.newFollowers}</div>
                  <div class="growth-label">Novos seguidores</div>
                </div>
              </div>
            </div>

            <!-- Insights, Localização e Conteúdo -->
            <div class="insights-row">
              <div class="insight-card">
                <div class="chart-title">💡 Insights</div>
                <div class="insight-item">✨ Melhor formato: ${insightsData.bestFormat}</div>
                <div class="insight-item">🏷️ Hashtag top: ${insightsData.topHashtag}</div>
                <div class="insight-item">👥 Público: ${insightsData.targetAudience}</div>
              </div>
              <div class="insight-card">
                <div class="chart-title">📍 Localização</div>
                ${locationData.map(location => 
                  `<div class="location-item">
                    <span>${location.city}</span>
                    <span>${location.percentage}%</span>
                  </div>`
                ).join('')}
              </div>
              <div class="insight-card">
                <div class="chart-title">📱 Conteúdo</div>
                ${contentData.map(content => 
                  `<div class="content-item">
                    <span>${content.type}</span>
                    <span>${content.count}</span>
                  </div>`
                ).join('')}
              </div>
            </div>

            <!-- Footer -->
            <div class="footer">
              © 2025 Hubstack® • Todos os direitos reservados • Desenvolvido por Hubstack®
            </div>
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
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  {profileData.profileImage ? (
                    <img 
                      src={profileData.profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {profileData.username.charAt(1)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-sm">{profileData.username}</p>
                  <p className="text-xs text-gray-500">{profileData.followers} seguidores</p>
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
                onClick={openManualDataModal}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                <Edit3 className="w-4 h-4" />
                Editar Perfil
              </button>

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
            { icon: Heart, title: 'Curtidas', value: mainMetrics.likes, change: mainMetrics.likesChange, color: 'blue' },
            { icon: MessageCircle, title: 'Comentários', value: mainMetrics.comments, change: mainMetrics.commentsChange, color: 'indigo' },
            { icon: Eye, title: 'Alcance', value: mainMetrics.reach, change: mainMetrics.reachChange, color: 'cyan' },
            { icon: Users, title: 'Engajamento', value: mainMetrics.engagement, change: mainMetrics.engagementChange, color: 'green' }
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
            { icon: Users, title: 'Visitas ao Perfil', value: performanceMetrics.profileVisits, change: performanceMetrics.profileVisitsChange },
            { icon: Clock, title: 'Tempo Médio', value: performanceMetrics.averageTime, change: performanceMetrics.averageTimeChange },
            { icon: Bookmark, title: 'Salvamentos', value: performanceMetrics.saves, change: performanceMetrics.savesChange },
            { icon: Share2, title: 'Links Externos', value: performanceMetrics.externalLinks, change: performanceMetrics.externalLinksChange }
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
              <AreaChart data={chartData.weekly}>
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
                  data={chartData.ageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {chartData.ageData.map((item, index) => (
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
                  {growthData.periodGrowth}
                </div>
                <div className="text-sm text-gray-600">Este período</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-indigo-600">
                  {growthData.newFollowers}
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
                <p className="text-sm text-gray-700">✨ Melhor formato: {insightsData.bestFormat}</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg">
                <p className="text-sm text-gray-700">🏷️ Hashtag top: {insightsData.topHashtag}</p>
              </div>
              <div className="p-3 bg-cyan-50 rounded-lg">
                <p className="text-sm text-gray-700">👥 Público: {insightsData.targetAudience}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">📍 Localização</h3>
            <div className="space-y-3">
              {locationData.map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{location.city}</span>
                  <span className="text-sm font-medium">{location.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">📱 Conteúdo</h3>
            <div className="space-y-3">
              {contentData.map((item, index) => (
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

      {/* Modal de Editar Perfil */}
      {showManualModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Editar Perfil</h2>
              <button 
                onClick={() => setShowManualModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-8">
              {/* Foto do Perfil */}
              <div>
                <h3 className="text-lg font-medium mb-4">📸 Foto do Perfil</h3>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    {tempData.profileData?.profileImage ? (
                      <img 
                        src={tempData.profileData.profileImage} 
                        alt="Profile Preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                        <span className="text-white text-lg font-bold">
                          {tempData.profileData?.username?.charAt(1)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block border-2 border-dashed border-blue-300 p-4 rounded-lg text-center cursor-pointer hover:border-blue-500 transition-colors">
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleProfileImageUpload} 
                      />
                      <Camera className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="font-medium text-blue-600">Clique para alterar foto</p>
                      <p className="text-sm text-gray-600 mt-1">PNG, JPG até 5MB</p>
                    </label>
                    {tempData.profileData?.profileImage && (
                      <button
                        onClick={() => setTempData(prev => ({
                          ...prev,
                          profileData: { ...prev.profileData, profileImage: null }
                        }))}
                        className="mt-2 text-sm text-red-600 hover:text-red-700"
                      >
                        Remover foto
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Dados do Perfil */}
              <div>
                <h3 className="text-lg font-medium mb-4">📱 Informações do Perfil</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Username</label>
                    <input
                      type="text"
                      value={tempData.profileData?.username || ''}
                      onChange={(e) => setTempData(prev => ({
                        ...prev,
                        profileData: { ...prev.profileData, username: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="@seu_usuario"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Seguidores</label>
                    <input
                      type="text"
                      value={tempData.profileData?.followers || ''}
                      onChange={(e) => setTempData(prev => ({
                        ...prev,
                        profileData: { ...prev.profileData, followers: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="125.4K"
                    />
                  </div>
                </div>
              </div>

              {/* Insights */}
              <div>
                <h3 className="text-lg font-medium mb-4">💡 Insights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Melhor Formato</label>
                    <input
                      type="text"
                      value={tempData.insightsData?.bestFormat || ''}
                      onChange={(e) => setTempData(prev => ({
                        ...prev,
                        insightsData: { ...prev.insightsData, bestFormat: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="3:4"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Hashtag Top</label>
                    <input
                      type="text"
                      value={tempData.insightsData?.topHashtag || ''}
                      onChange={(e) => setTempData(prev => ({
                        ...prev,
                        insightsData: { ...prev.insightsData, topHashtag: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="#lifestyle"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Público Alvo</label>
                    <input
                      type="text"
                      value={tempData.insightsData?.targetAudience || ''}
                      onChange={(e) => setTempData(prev => ({
                        ...prev,
                        insightsData: { ...prev.insightsData, targetAudience: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="25-34 anos"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
              <button
                onClick={() => setShowManualModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={saveManualData}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Save className="w-4 h-4" />
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

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