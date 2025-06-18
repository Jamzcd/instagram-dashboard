// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Heart, MessageCircle, Share, Eye, Hash, Calendar, Download, Filter, Target, Zap, Award, Clock, MapPin, Instagram, Play, Image, Grid3X3, Moon, Sun, Upload, FileText, Sparkles, BarChart3, Activity, Star, ArrowUp, ArrowDown, Flame, ThumbsUp, Rocket, Crown, Trophy, Diamond, X, RefreshCw, CheckCircle, Settings, Bell, Search, MoreHorizontal, Bookmark, Send, Camera, Video, TrendingDown } from 'lucide-react';

const InstagramDashboard = () => {
  // Estados
  const [isDark, setIsDark] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [username, setUsername] = useState('@hubstack_agency');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showDataModal, setShowDataModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [csvData, setCsvData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [realMetrics, setRealMetrics] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // useEffect
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const loadingTimer = setTimeout(() => setIsLoading(false), 1500);
    
    console.log('🚀 Dashboard Instagram Analytics carregado!');
    
    return () => {
      clearInterval(timer);
      clearTimeout(loadingTimer);
    };
  }, []);

  // Função única para mostrar toast
  const showToast = (message, type = 'success') => {
    const existingToast = document.getElementById('dashboard-toast');
    if (existingToast) {
      existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.id = 'dashboard-toast';
    const bgColor = type === 'success' ? 'bg-emerald-500' : type === 'error' ? 'bg-red-500' : 'bg-indigo-500';
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : '📊';
    
    toast.className = `fixed top-24 right-6 ${bgColor} text-white px-6 py-4 rounded-2xl shadow-2xl z-50 transition-all duration-500 max-w-sm backdrop-blur-lg border border-white/20`;
    toast.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-lg">${icon}</span>
        <div>
          <p class="font-semibold text-sm">${type === 'success' ? 'Sucesso!' : type === 'error' ? 'Erro!' : 'Info'}</p>
          <p class="text-xs opacity-90">${message}</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (document.body.contains(toast)) {
        toast.style.transform = 'translateX(400px)';
        toast.style.opacity = '0';
        setTimeout(() => {
          if (document.body.contains(toast)) {
            document.body.removeChild(toast);
          }
        }, 300);
      }
    }, 4000);
  };

  // Função para criar preview do arquivo
  const createFilePreview = (file) => {
    console.log('🔍 Criando preview do arquivo:', file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const lines = content.split('\n').slice(0, 5);
      setFilePreview(lines.join('\n'));
      console.log('✅ Preview criado com sucesso');
    };
    reader.onerror = () => {
      console.error('❌ Erro ao criar preview');
      showToast('❌ Erro ao visualizar arquivo', 'error');
    };
    reader.readAsText(file, 'UTF-8');
  };

  // Função para selecionar arquivo CSV
  const handleFileSelect = (event) => {
    console.log('📂 Função handleFileSelect chamada');
    const file = event.target.files[0];
    
    if (!file) {
      console.log('❌ Nenhum arquivo selecionado no input');
      return;
    }

    console.log('📁 Arquivo detectado:', {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    });

    if (!file.name.toLowerCase().endsWith('.csv')) {
      console.log('❌ Arquivo não é CSV:', file.name);
      showToast('❌ Por favor, selecione um arquivo CSV!', 'error');
      return;
    }

    console.log('✅ Arquivo CSV válido, iniciando processo...');
    
    // Atualizar estados
    setUploadedFile(file);
    setFileUploaded(true);
    
    // Criar preview
    createFilePreview(file);
    
    // Toast de sucesso
    showToast(`✅ Arquivo "${file.name}" carregado com sucesso!`, 'success');
    
    console.log('🎯 Estados atualizados - uploadedFile:', !!file, 'fileUploaded:', true);
  };

  // Função para conectar conta Instagram
  const connectInstagram = () => {
    const newUsername = prompt('Digite o @username do Instagram:', '@');
    if (newUsername && newUsername !== '@' && newUsername.length > 1) {
      setUsername(newUsername);
      showToast(`🔗 Conectado com ${newUsername}!`, 'success');
    }
  };

  // Dados de exemplo para demonstração
  const demoMetrics = [
    {
      title: 'Seguidores',
      value: '12.7K',
      change: 2.8,
      icon: Users,
      gradient: 'from-violet-500 via-purple-500 to-purple-600',
      subtitle: 'Total',
      trend: 'up',
      progress: 85,
      description: 'Crescimento orgânico'
    },
    {
      title: 'Engajamento',
      value: '9.2%',
      change: 1.4,
      icon: Heart,
      gradient: 'from-pink-500 via-rose-500 to-red-500',
      subtitle: 'Taxa média',
      trend: 'up',
      progress: 92,
      description: 'Interações por post'
    },
    {
      title: 'Alcance',
      value: '89.6K',
      change: 12.3,
      icon: Eye,
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      subtitle: 'Semanal',
      trend: 'up',
      progress: 76,
      description: 'Contas únicas alcançadas'
    },
    {
      title: 'Impressões',
      value: '156K',
      change: 8.7,
      icon: BarChart3,
      gradient: 'from-emerald-500 via-green-500 to-teal-600',
      subtitle: 'Total',
      trend: 'up',
      progress: 88,
      description: 'Visualizações totais'
    },
    {
      title: 'Stories',
      value: '7.2K',
      change: 15.2,
      icon: Clock,
      gradient: 'from-orange-500 via-amber-500 to-yellow-500',
      subtitle: 'Views',
      trend: 'up',
      progress: 94,
      description: 'Visualizações de stories'
    },
    {
      title: 'Saves',
      value: '1.8K',
      change: 22.1,
      icon: Bookmark,
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      subtitle: 'Salvamentos',
      trend: 'up',
      progress: 68,
      description: 'Posts salvos pelos usuários'
    }
  ];

  // Componente MetricCard modernizado
  const MetricCard = ({ title, value, change, icon: Icon, gradient, subtitle, trend, progress, description }) => (
    <div className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/80">
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 rounded-3xl transition-opacity duration-500 group-hover:opacity-10`}></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center gap-3">
            {/* Progress Ring */}
            <div className="relative w-14 h-14">
              <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={`${progress}, 100`}
                  className={`${trend === 'up' ? 'text-emerald-500' : 'text-red-500'} transition-all duration-1000`}
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-200"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-xs font-bold ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {progress}%
                </span>
              </div>
            </div>
            
            {/* Change indicator */}
            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
              change > 0 
                ? 'bg-emerald-100 text-emerald-700 shadow-emerald-200/50' 
                : 'bg-red-100 text-red-700 shadow-red-200/50'
            } shadow-lg`}>
              {change > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {Math.abs(change)}%
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Activity className="w-3 h-3" />
              <span>Live</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Flame className="w-3 h-3" />
              {subtitle}
            </p>
            <p className="text-xs text-gray-400">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Componente de navegação por tabs
  const TabNavigation = () => {
    const tabs = [
      { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
      { id: 'content', label: 'Conteúdo', icon: Grid3X3 },
      { id: 'audience', label: 'Audiência', icon: Users },
      { id: 'insights', label: 'Insights', icon: Target }
    ];

    return (
      <div className="flex items-center gap-2 bg-white/60 backdrop-blur-xl rounded-2xl p-2 border border-white/20 shadow-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-200'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      isDark 
        ? 'dark bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
        : 'bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50'
    }`}>
      {/* Header modernizado */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-200">
                  <Instagram className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  {username}
                </h1>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-violet-500" />
                    <span className="font-medium">Analytics Premium</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="font-mono">{currentTime.toLocaleTimeString()}</span>
                  <span className="bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 px-3 py-1 rounded-full text-xs font-semibold border border-violet-200">
                    🎭 Modo Demo
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2.5 bg-white/70 backdrop-blur-xl border border-white/20 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-lg"
              >
                <option value="7d">📅 Últimos 7 dias</option>
                <option value="30d">📅 Últimos 30 dias</option>
                <option value="90d">📅 Últimos 90 dias</option>
              </select>
              
              <button
                onClick={() => setShowDataModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 hover:scale-105"
              >
                <Upload className="w-4 h-4" />
                Carregar Dados
              </button>
              
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-3 bg-white/70 backdrop-blur-xl hover:bg-white/80 rounded-xl transition-all duration-300 border border-white/20 shadow-lg hover:scale-105"
              >
                {isDark ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-violet-600" />}
              </button>
              
              <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-violet-200 transition-all duration-300 hover:scale-105">
                <Download className="w-4 h-4" />
                Exportar PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <TabNavigation />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {demoMetrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: Camera, label: 'Novo Post', color: 'from-pink-500 to-rose-500' },
            { icon: Video, label: 'Criar Reel', color: 'from-purple-500 to-violet-500' },
            { icon: BarChart3, label: 'Relatório', color: 'from-blue-500 to-cyan-500' },
            { icon: Settings, label: 'Configurações', color: 'from-gray-500 to-slate-500' }
          ].map((action, index) => (
            <button
              key={index}
              className={`flex items-center gap-3 p-4 bg-gradient-to-r ${action.color} text-white rounded-2xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105`}
            >
              <action.icon className="w-5 h-5" />
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Modal para upload de dados - modernizado */}
      {showDataModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-lg w-full p-8 border border-white/20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Carregar Dados CSV</h3>
                <p className="text-gray-600 text-sm mt-1">Importe seus dados do Instagram</p>
              </div>
              <button
                onClick={() => setShowDataModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-violet-400 transition-colors">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="csv-upload"
                />
                <label
                  htmlFor="csv-upload"
                  className="cursor-pointer flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">
                      {uploadedFile ? uploadedFile.name : 'Clique para selecionar CSV'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {uploadedFile 
                        ? `${(uploadedFile.size / 1024).toFixed(1)} KB - Arquivo carregado!`
                        : 'Arraste e solte ou clique para selecionar'
                      }
                    </p>
                  </div>
                </label>
              </div>
              
              {fileUploaded && (
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6">
                  <div className="flex items-center gap-3 text-emerald-700">
                    <CheckCircle className="w-6 h-6" />
                    <div>
                      <span className="font-semibold">Arquivo carregado com sucesso!</span>
                      <p className="text-sm text-emerald-600 mt-1">Pronto para processar os dados</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDataModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  disabled={!fileUploaded}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Processar Dados
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstagramDashboard;

