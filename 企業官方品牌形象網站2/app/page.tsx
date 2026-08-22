'use client';

import { useState, useEffect } from 'react';

// 精選案例資料庫
interface CaseStudy {
  id: string;
  title: string;
  category: 'brand' | 'rwd' | 'ecommerce' | 'system';
  categoryName: string;
  image: string;
  summary: string;
  description: string;
  client: string;
  tech: string;
  highlight: string;
  tagBadge: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    title: '現代綠能科技官方網站重塑',
    category: 'rwd',
    categoryName: '響應式官網 / 綠能科技',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    summary: '客製化互動碳足跡計算器與全裝置流暢響應',
    description: '針對全球綠能趨勢進行品牌官網重新定位，以現代極簡的深綠與暖灰色調，搭配流體柵格佈局與互動式綠能節電計算功能，成功吸引多家跨國綠能投資法人洽談。',
    client: '現代綠能科技股份有限公司',
    tech: 'Semantic HTML5, Bootstrap 5, Vanilla JS, CSS3 Variables',
    highlight: '網站總瀏覽量成長 280%，詢價轉換率提升 45%',
    tagBadge: '+280% 流量',
  },
  {
    id: 'case-2',
    title: '頂級精品傢俱電商旗艦平台',
    category: 'ecommerce',
    categoryName: '電商系統 / 家居設計',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
    summary: '流暢結帳體驗與高解析度情境空間預覽',
    description: '專為高端實木傢俱量身打造的沉浸式線上旗艦店，導入多元篩選條件、高解析度材質放大鏡預覽與直覺式單頁結帳流程，大幅降低結帳放棄率。',
    client: '維諾亞家居美學設計',
    tech: 'Bootstrap 5, Responsive Grid, Vanilla JS Cart, Payment Gateway',
    highlight: '客單價提升 35%，行動裝置結帳完成率提升 60%',
    tagBadge: '+60% 結帳率',
  },
  {
    id: 'case-3',
    title: '睿智生技醫療科研入口網',
    category: 'brand',
    categoryName: '品牌形象 / 生技醫療',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
    summary: '專業學術文獻檢索與國際權威形象架構',
    description: '整合生物醫學科研成果發布、臨床試驗進度追蹤與國際期刊專區。通過嚴格的醫療無障礙標準與資安規範，樹立國際級生技研發典範。',
    client: '睿智全球生技研發中心',
    tech: 'HTML5 Semantic, Bootstrap 5 UI Kit, Clean Vanilla JS',
    highlight: '國際臨床合作諮詢量大幅增長 150%',
    tagBadge: '國際認證',
  },
  {
    id: 'case-4',
    title: '極簡旅宿連鎖預約官網',
    category: 'rwd',
    categoryName: '響應式官網 / 觀光休閒',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    summary: '直覺式房型導覽與多語系即時預訂',
    description: '為文青精品連鎖旅店打造的沈浸式訂房網站。強調高質感大圖背景與無縫日期選擇器，讓房客在手機上於 3 步驟內輕鬆完成訂房確認。',
    client: '森沐旅宿管理集團',
    tech: 'Bootstrap 5, Responsive Grid, Vanilla JS Booking Engine',
    highlight: '直接訂房比例由 18% 提升至 52%',
    tagBadge: '直接訂房 52%',
  },
  {
    id: 'case-5',
    title: '都會精品咖啡品牌數位升級',
    category: 'brand',
    categoryName: '品牌形象 / 餐飲生活',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=80',
    summary: '產地履歷溯源故事與門市地圖指引',
    description: '透過微距手沖影像與手繪插畫風格，訴說每一顆莊園豆的背後故事。結合門市即時庫存與線上豆單下載，成功擴展實體與數位會員圈。',
    client: 'COFFEE ORIGIN 莊園咖啡',
    tech: 'Bootstrap 5, CSS3 Transitions, Mobile Touch Navigation',
    highlight: '門市來客率提升 38%，會員綁定率破 8 萬人',
    tagBadge: '+38% 來客',
  },
  {
    id: 'case-6',
    title: '智慧物流雲端管理儀表板',
    category: 'system',
    categoryName: '系統開發 / 智慧物流',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80',
    summary: '即時車隊追蹤與出貨動態視覺化監控',
    description: '專為千輛規模物流車隊打造的響應式管理後台。司機與調度員可隨時在平板或手機上查詢即時派單、路徑規劃及異常回報，全面告別紙本作業。',
    client: '快捷全球智慧物流',
    tech: 'Bootstrap 5, Vanilla JS Charts, Responsive Tables, Web APIs',
    highlight: '調度處理時間縮短 65%，零紙本作業',
    tagBadge: '-65% 處理時間',
  },
];

export default function HomePage() {
  // 狀態管理
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'brand' | 'rwd' | 'ecommerce' | 'system'>('all');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // 表單狀態
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    service: '企業形象與官方網站',
    budget: '10萬~20萬',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ name: string; service: string; phone: string; email: string } | null>(null);
  const [formValidated, setFormValidated] = useState(false);

  // 滾動監聽
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      const sections = ['home', 'about', 'services', 'cases', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 輪播圖自動切換
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 篩選案例
  const filteredCases = activeFilter === 'all' 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter((item) => item.category === activeFilter);

  // 預約特定服務按鈕點擊
  const handleSelectService = (serviceName: string) => {
    setFormState((prev) => ({ ...prev, service: serviceName }));
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 表單送出處理
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormValidated(true);

    if (!formState.name || !formState.phone || !formState.email || !formState.message) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({
        name: formState.name,
        service: formState.service,
        phone: formState.phone,
        email: formState.email,
      });
      setFormState({
        name: '',
        phone: '',
        email: '',
        service: '企業形象與官方網站',
        budget: '10萬~20萬',
        message: '',
      });
      setFormValidated(false);
    }, 800);
  };

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 導覽列 (Navbar) */}
      <nav 
        id="mainNavbar" 
        className={`navbar navbar-expand-lg fixed-top custom-navbar ${scrolled ? 'scrolled' : ''}`}
        aria-label="主要導覽選單"
      >
        <div className="container">
          {/* 左側 LOGO */}
          <button 
            type="button" 
            onClick={() => scrollToSection('home')} 
            className="navbar-brand d-flex align-items-center btn btn-link text-decoration-none p-0 text-primary"
            id="navBrandLogo"
          >
            <i className="bi bi-layers-fill text-primary me-2 fs-4"></i>
            <span className="fw-bold">睿智創新設計<span className="text-secondary opacity-75 fw-normal ms-1 fs-6">WISE DESIGN</span></span>
          </button>

          {/* 手機版漢堡選單切換按鈕 */}
          <button 
            className="navbar-toggler border-0" 
            type="button" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="切換導覽選單"
            id="navTogglerBtn"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* 選單連結 */}
          <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item">
                <button 
                  type="button" 
                  onClick={() => scrollToSection('home')} 
                  className={`nav-link btn btn-link text-start text-decoration-none ${activeSection === 'home' ? 'active' : ''}`}
                  id="navLinkHome"
                >
                  <i className="bi bi-house-door me-1"></i>首頁
                </button>
              </li>
              <li className="nav-item">
                <button 
                  type="button" 
                  onClick={() => scrollToSection('about')} 
                  className={`nav-link btn btn-link text-start text-decoration-none ${activeSection === 'about' ? 'active' : ''}`}
                  id="navLinkAbout"
                >
                  <i className="bi bi-building me-1"></i>關於我們
                </button>
              </li>
              <li className="nav-item">
                <button 
                  type="button" 
                  onClick={() => scrollToSection('services')} 
                  className={`nav-link btn btn-link text-start text-decoration-none ${activeSection === 'services' ? 'active' : ''}`}
                  id="navLinkServices"
                >
                  <i className="bi bi-grid-fill me-1"></i>服務項目
                </button>
              </li>
              <li className="nav-item">
                <button 
                  type="button" 
                  onClick={() => scrollToSection('cases')} 
                  className={`nav-link btn btn-link text-start text-decoration-none ${activeSection === 'cases' ? 'active' : ''}`}
                  id="navLinkCases"
                >
                  <i className="bi bi-briefcase-fill me-1"></i>精選案例
                </button>
              </li>
              <li className="nav-item">
                <button 
                  type="button" 
                  onClick={() => scrollToSection('contact')} 
                  className={`nav-link btn btn-link text-start text-decoration-none ${activeSection === 'contact' ? 'active' : ''}`}
                  id="navLinkContact"
                >
                  <i className="bi bi-envelope-fill me-1"></i>聯絡我們
                </button>
              </li>
              <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                <button 
                  type="button" 
                  onClick={() => scrollToSection('contact')} 
                  className="btn btn-primary rounded px-4 py-2 text-white fw-bold shadow-sm d-inline-flex align-items-center"
                  id="navConsultBtn"
                >
                  <i className="bi bi-telephone-fill me-2"></i>預約諮詢
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* 1. 首頁輪播圖 (Hero Carousel) */}
      <header id="home" className="hero-carousel position-relative">
        <div id="heroCarousel" className="carousel slide carousel-fade">
          {/* 輪播指示點 */}
          <div className="carousel-indicators">
            <button 
              type="button" 
              onClick={() => setActiveSlide(0)} 
              className={activeSlide === 0 ? 'active' : ''} 
              aria-label="投影片 1"
            ></button>
            <button 
              type="button" 
              onClick={() => setActiveSlide(1)} 
              className={activeSlide === 1 ? 'active' : ''} 
              aria-label="投影片 2"
            ></button>
            <button 
              type="button" 
              onClick={() => setActiveSlide(2)} 
              className={activeSlide === 2 ? 'active' : ''} 
              aria-label="投影片 3"
            ></button>
          </div>

          {/* 輪播內容 */}
          <div className="carousel-inner">
            {/* Slide 1 */}
            <div className={`carousel-item ${activeSlide === 0 ? 'active' : ''}`}>
              <img 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80" 
                className="d-block w-100" 
                alt="現代辦公環境與數位品牌重塑" 
              />
              <div className="carousel-caption text-center">
                <span className="badge bg-primary px-3 py-2 mb-3 rounded-pill fw-normal text-uppercase tracking-wider">
                  全方位數位品牌塑造
                </span>
                <h1 className="display-4 fw-bolder text-white mb-3">打造兼具極致美學與轉換率的官方網站</h1>
                <p className="lead text-light mb-4 d-none d-md-block">
                  結合語意化 HTML5、Bootstrap 5 柵格系統與原生效能，為您的企業提供卓越的跨裝置數位體驗。
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <button 
                    type="button" 
                    onClick={() => scrollToSection('services')} 
                    className="btn btn-primary btn-lg px-4 rounded-pill fw-bold"
                    id="heroBtnServices"
                  >
                    探索服務項目
                  </button>
                  <button 
                    type="button" 
                    onClick={() => scrollToSection('cases')} 
                    className="btn btn-outline-light btn-lg px-4 rounded-pill fw-bold"
                    id="heroBtnCases"
                  >
                    瀏覽精選案例
                  </button>
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className={`carousel-item ${activeSlide === 1 ? 'active' : ''}`}>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80" 
                className="d-block w-100" 
                alt="專業開發團隊協作" 
              />
              <div className="carousel-caption text-center">
                <span className="badge bg-info text-dark px-3 py-2 mb-3 rounded-pill fw-bold text-uppercase">
                  行動優先 RWD 響應式架構
                </span>
                <h1 className="display-4 fw-bolder text-white mb-3">跨平台流暢體驗，手機到桌機完美適配</h1>
                <p className="lead text-light mb-4 d-none d-md-block">
                  以 Mobile-First 為核心哲學，確保任何螢幕尺寸下皆能呈現極致精準的圖文動線與載入速度。
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <button 
                    type="button" 
                    onClick={() => scrollToSection('contact')} 
                    className="btn btn-primary btn-lg px-4 rounded-pill fw-bold"
                    id="heroBtnConsult"
                  >
                    立即洽詢合作
                  </button>
                  <button 
                    type="button" 
                    onClick={() => scrollToSection('about')} 
                    className="btn btn-outline-light btn-lg px-4 rounded-pill fw-bold"
                    id="heroBtnAbout"
                  >
                    關於我們團隊
                  </button>
                </div>
              </div>
            </div>

            {/* Slide 3 */}
            <div className={`carousel-item ${activeSlide === 2 ? 'active' : ''}`}>
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80" 
                className="d-block w-100" 
                alt="數據分析與 SEO 優化" 
              />
              <div className="carousel-caption text-center">
                <span className="badge bg-success px-3 py-2 mb-3 rounded-pill fw-normal text-uppercase">
                  數據導向與 SEO 搜尋優化
                </span>
                <h1 className="display-4 fw-bolder text-white mb-3">高搜尋曝光度，讓目標客群第一時間看見您</h1>
                <p className="lead text-light mb-4 d-none d-md-block">
                  完整的結構化資料、Core Web Vitals 指標調校與現代化無障礙設計，全面提昇品牌競爭力。
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <button 
                    type="button" 
                    onClick={() => scrollToSection('contact')} 
                    className="btn btn-success btn-lg px-4 rounded-pill fw-bold"
                    id="heroBtnAudit"
                  >
                    免費網站健檢
                  </button>
                  <button 
                    type="button" 
                    onClick={() => scrollToSection('services')} 
                    className="btn btn-outline-light btn-lg px-4 rounded-pill fw-bold"
                  >
                    查看服務細節
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 控制按鈕 */}
          <button 
            className="carousel-control-prev" 
            type="button" 
            onClick={() => setActiveSlide((prev) => (prev === 0 ? 2 : prev - 1))}
            aria-label="上一張"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button 
            className="carousel-control-next" 
            type="button" 
            onClick={() => setActiveSlide((prev) => (prev + 1) % 3)}
            aria-label="下一張"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </header>

      {/* 2. 關於我們區塊 (About Us) */}
      <section id="about" className="py-5 bg-light">
        <div className="container py-lg-4">
          <div className="row align-items-center g-5">
            {/* 左側圖文展示 */}
            <div className="col-lg-6">
              <div className="position-relative">
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80" 
                  className="img-fluid rounded-4 shadow-lg w-100" 
                  alt="專業網站顧問諮詢" 
                />
                <div className="position-absolute bottom-0 start-0 translate-middle-y bg-white p-3 rounded-3 shadow-md border ms-3 d-none d-sm-block">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary text-white p-2 rounded-circle me-3">
                      <i className="bi bi-shield-check fs-3"></i>
                    </div>
                    <div>
                      <div className="fw-bold text-dark">100% 準時交付</div>
                      <small className="text-muted">業界公認的高品質口碑</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 右側文字介紹 */}
            <div className="col-lg-6">
              <div className="section-badge"><i className="bi bi-stars me-1"></i>關於創曜數位</div>
              <h2 className="h1 fw-bold mb-3 text-dark">融合極致美學與技術實力<br />打造高效轉換的數位載體</h2>
              <p className="text-secondary mb-3">
                我們是一家坐落於台北大安區的專業數位品牌建置團隊。我們深信，一個優秀的企業官網不只是精美的視覺呈現，更是品牌信任度、使用者體驗與商業目標的交會點。
              </p>
              <p className="text-secondary mb-4">
                堅持採用標準語意化 HTML5 與 Bootstrap 5 柵格系統，去除繁重龐雜的無謂架構，確保網頁載入速度達到極致，讓每一位訪客在手機或電腦上都能感受流暢自如的瀏覽體驗。
              </p>

              {/* 四大核心特點 */}
              <div className="row g-3">
                <div className="col-sm-6">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-check-circle-fill text-primary fs-5 me-2 mt-1"></i>
                    <div>
                      <h6 className="fw-bold mb-1 text-dark">輕量高效零負擔</h6>
                      <small className="text-muted">純粹原生架構，載入速度小於 1 秒。</small>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-check-circle-fill text-primary fs-5 me-2 mt-1"></i>
                    <div>
                      <h6 className="fw-bold mb-1 text-dark">全裝置完美自適應</h6>
                      <small className="text-muted">RWD 響應式規範，手機瀏覽順暢。</small>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-check-circle-fill text-primary fs-5 me-2 mt-1"></i>
                    <div>
                      <h6 className="fw-bold mb-1 text-dark">全方位 SEO 架構</h6>
                      <small className="text-muted">結構化資料標記，搜尋排名穩固。</small>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-check-circle-fill text-primary fs-5 me-2 mt-1"></i>
                    <div>
                      <h6 className="fw-bold mb-1 text-dark">專業售後維運保固</h6>
                      <small className="text-muted">全天候安全維護與即時諮詢協助。</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 數據統計計數器 */}
          <div className="row g-4 mt-4 pt-3 text-center">
            <div className="col-6 col-md-3">
              <div className="counter-box" id="statCard1">
                <div className="counter-number">350+</div>
                <div className="counter-label">成功交付專案</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="counter-box" id="statCard2">
                <div className="counter-number">99.4%</div>
                <div className="counter-label">客戶滿意度</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="counter-box" id="statCard3">
                <div className="counter-number">10+</div>
                <div className="counter-label">年業界深耕經驗</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="counter-box" id="statCard4">
                <div className="counter-number">24hr</div>
                <div className="counter-label">快速技術支援</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 服務項目區塊 (Services) - 卡片式佈局 */}
      <section id="services" className="py-5">
        <div className="container py-lg-4">
          <div className="section-title-wrap text-center">
            <div className="section-badge"><i className="bi bi-cpu me-1"></i>OUR SERVICES</div>
            <h2 className="section-title display-6">核心服務項目</h2>
            <p className="text-secondary mt-3 mx-auto" style={{ maxWidth: '680px' }}>
              我們專注於提供全方位、高品質且結構嚴謹的數位解決方案，助您精準傳達品牌價值並創造商業營收。
            </p>
          </div>

          {/* 6 大服務卡片網格 */}
          <div className="row g-4">
            {/* 服務 1 */}
            <div className="col-md-6 col-lg-4">
              <div className="service-card" id="serviceCard1">
                <div className="card-img-wrap">
                  <img 
                    src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80" 
                    alt="響應式網頁設計 (RWD)" 
                  />
                  <div className="service-icon-badge">
                    <i className="bi bi-phone"></i>
                  </div>
                </div>
                <div className="card-body">
                  <span className="badge bg-primary-subtle text-primary mb-2 align-self-start">熱門首選</span>
                  <h3 className="card-title">響應式網頁設計 (RWD)</h3>
                  <p className="card-text text-secondary">
                    採用 Bootstrap 5 專業網格與 Mobile-First 策略，讓您的網站在智慧型手機、平板、筆電及 4K 螢幕皆有極致的視覺排版與舒適度。
                  </p>
                  <ul className="service-features">
                    <li><i className="bi bi-check-lg"></i> 彈性流體柵格系統佈局</li>
                    <li><i className="bi bi-check-lg"></i> 觸控手勢與行動選單優化</li>
                    <li><i className="bi bi-check-lg"></i> 極致壓縮與輕量載入體驗</li>
                  </ul>
                  <div className="mt-auto pt-2">
                    <button 
                      type="button" 
                      onClick={() => handleSelectService('響應式網頁設計 (RWD)')}
                      className="btn btn-outline-primary w-100 rounded-pill js-select-service-btn"
                      id="btnService1"
                    >
                      <i className="bi bi-calendar-check me-1"></i>預約此項諮詢
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 服務 2 */}
            <div className="col-md-6 col-lg-4">
              <div className="service-card" id="serviceCard2">
                <div className="card-img-wrap">
                  <img 
                    src="https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=600&q=80" 
                    alt="企業形象與官方網站" 
                  />
                  <div className="service-icon-badge">
                    <i className="bi bi-building"></i>
                  </div>
                </div>
                <div className="card-body">
                  <span className="badge bg-primary-subtle text-primary mb-2 align-self-start">權威建立</span>
                  <h3 className="card-title">企業形象與官方網站</h3>
                  <p className="card-text text-secondary">
                    量身定制符合企業願景與產業定位的形象入口，建立清晰易懂的資訊層級，有效提升合作夥伴與終端客戶的信賴感。
                  </p>
                  <ul className="service-features">
                    <li><i className="bi bi-check-lg"></i> 品牌風格調性客製規劃</li>
                    <li><i className="bi bi-check-lg"></i> 企業里程碑與願景展示</li>
                    <li><i className="bi bi-check-lg"></i> 專業證照與團隊經歷佈局</li>
                  </ul>
                  <div className="mt-auto pt-2">
                    <button 
                      type="button" 
                      onClick={() => handleSelectService('企業形象與官方網站')}
                      className="btn btn-outline-primary w-100 rounded-pill js-select-service-btn"
                      id="btnService2"
                    >
                      <i className="bi bi-calendar-check me-1"></i>預約此項諮詢
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 服務 3 */}
            <div className="col-md-6 col-lg-4">
              <div className="service-card" id="serviceCard3">
                <div className="card-img-wrap">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" 
                    alt="搜尋引擎優化 (SEO)" 
                  />
                  <div className="service-icon-badge">
                    <i className="bi bi-graph-up-arrow"></i>
                  </div>
                </div>
                <div className="card-body">
                  <span className="badge bg-primary-subtle text-primary mb-2 align-self-start">流量成長</span>
                  <h3 className="card-title">搜尋引擎優化與效能</h3>
                  <p className="card-text text-secondary">
                    落實標準語意化標籤（Semantic HTML）、Open Graph 協定、Sitemap 架構以及 Core Web Vitals 載入速度優化，穩佔 Google 搜尋前線。
                  </p>
                  <ul className="service-features">
                    <li><i className="bi bi-check-lg"></i> Schema 結構化資料標註</li>
                    <li><i className="bi bi-check-lg"></i> 圖片無損壓縮與延遲載入</li>
                    <li><i className="bi bi-check-lg"></i> 網頁無障礙 A11y 友善環境</li>
                  </ul>
                  <div className="mt-auto pt-2">
                    <button 
                      type="button" 
                      onClick={() => handleSelectService('搜尋引擎優化與效能')}
                      className="btn btn-outline-primary w-100 rounded-pill js-select-service-btn"
                      id="btnService3"
                    >
                      <i className="bi bi-calendar-check me-1"></i>預約此項諮詢
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 服務 4 */}
            <div className="col-md-6 col-lg-4">
              <div className="service-card" id="serviceCard4">
                <div className="card-img-wrap">
                  <img 
                    src="https://images.unsplash.com/photo-1556742049-0a67e557224f?auto=format&fit=crop&w=600&q=80" 
                    alt="電商購物系統與金流" 
                  />
                  <div className="service-icon-badge">
                    <i className="bi bi-cart3"></i>
                  </div>
                </div>
                <div className="card-body">
                  <span className="badge bg-primary-subtle text-primary mb-2 align-self-start">商機轉換</span>
                  <h3 className="card-title">電商購物與金流整合</h3>
                  <p className="card-text text-secondary">
                    打造高轉換率的商品展示櫥窗與零阻力的結帳流程，支援信用卡、超商代碼與多元支付，並具備訂單與庫存管理能力。
                  </p>
                  <ul className="service-features">
                    <li><i className="bi bi-check-lg"></i> 沉浸式商品卡片與篩選器</li>
                    <li><i className="bi bi-check-lg"></i> 快速結帳與訂單即時通知</li>
                    <li><i className="bi bi-check-lg"></i> 促銷代碼與會員分級機制</li>
                  </ul>
                  <div className="mt-auto pt-2">
                    <button 
                      type="button" 
                      onClick={() => handleSelectService('電商購物與金流整合')}
                      className="btn btn-outline-primary w-100 rounded-pill js-select-service-btn"
                      id="btnService4"
                    >
                      <i className="bi bi-calendar-check me-1"></i>預約此項諮詢
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 服務 5 */}
            <div className="col-md-6 col-lg-4">
              <div className="service-card" id="serviceCard5">
                <div className="card-img-wrap">
                  <img 
                    src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80" 
                    alt="UI/UX 介面體驗設計" 
                  />
                  <div className="service-icon-badge">
                    <i className="bi bi-palette"></i>
                  </div>
                </div>
                <div className="card-body">
                  <span className="badge bg-primary-subtle text-primary mb-2 align-self-start">視覺美學</span>
                  <h3 className="card-title">UI/UX 介面體驗設計</h3>
                  <p className="card-text text-secondary">
                    從使用者心理學與色彩理論出發，打造具有高辨識度、優雅排版與直覺互動的數位介面，大幅降低使用者的操作學習成本。
                  </p>
                  <ul className="service-features">
                    <li><i className="bi bi-check-lg"></i> 品牌專屬色系與字體規劃</li>
                    <li><i className="bi bi-check-lg"></i> 互動微動畫與動態反饋設計</li>
                    <li><i className="bi bi-check-lg"></i> 使用者動線與漏斗測試分析</li>
                  </ul>
                  <div className="mt-auto pt-2">
                    <button 
                      type="button" 
                      onClick={() => handleSelectService('UI/UX 介面體驗設計')}
                      className="btn btn-outline-primary w-100 rounded-pill js-select-service-btn"
                      id="btnService5"
                    >
                      <i className="bi bi-calendar-check me-1"></i>預約此項諮詢
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 服務 6 */}
            <div className="col-md-6 col-lg-4">
              <div className="service-card" id="serviceCard6">
                <div className="card-img-wrap">
                  <img 
                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80" 
                    alt="網站維護與雲端託管" 
                  />
                  <div className="service-icon-badge">
                    <i className="bi bi-shield-lock"></i>
                  </div>
                </div>
                <div className="card-body">
                  <span className="badge bg-primary-subtle text-primary mb-2 align-self-start">安心維運</span>
                  <h3 className="card-title">網站維護與資安託管</h3>
                  <p className="card-text text-secondary">
                    提供全天候伺服器監控、SSL 安全加密憑證、自動化定期備份與故障排除，讓您的線上業務全年無休穩定運作。
                  </p>
                  <ul className="service-features">
                    <li><i className="bi bi-check-lg"></i> 99.9% 高可用性伺服器環境</li>
                    <li><i className="bi bi-check-lg"></i> 每日自動異地備份與還原</li>
                    <li><i className="bi bi-check-lg"></i> 專屬工程師即時障礙排除</li>
                  </ul>
                  <div className="mt-auto pt-2">
                    <button 
                      type="button" 
                      onClick={() => handleSelectService('網站維護與資安託管')}
                      className="btn btn-outline-primary w-100 rounded-pill js-select-service-btn"
                      id="btnService6"
                    >
                      <i className="bi bi-calendar-check me-1"></i>預約此項諮詢
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 服務流程步驟 */}
          <div className="mt-5 pt-4 bg-light rounded-4 p-4 p-md-5 border">
            <h4 className="text-center fw-bold mb-4 text-dark">標準化四階段開發流程</h4>
            <div className="row text-center g-4">
              <div className="col-6 col-md-3">
                <div className="bg-white p-3 rounded-3 shadow-sm h-100 border">
                  <div className="badge bg-primary fs-6 mb-2 rounded-circle p-2 px-3">1</div>
                  <h6 className="fw-bold mb-1">需求訪談與規劃</h6>
                  <small className="text-muted">深度了解品牌目標與受眾輪廓</small>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="bg-white p-3 rounded-3 shadow-sm h-100 border">
                  <div className="badge bg-primary fs-6 mb-2 rounded-circle p-2 px-3">2</div>
                  <h6 className="fw-bold mb-1">原型與視覺設計</h6>
                  <small className="text-muted">繪製 UI/UX 頁面與風格提案確認</small>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="bg-white p-3 rounded-3 shadow-sm h-100 border">
                  <div className="badge bg-primary fs-6 mb-2 rounded-circle p-2 px-3">3</div>
                  <h6 className="fw-bold mb-1">標準化程式開發</h6>
                  <small className="text-muted">HTML5/CSS3/BS5 與跨裝置相容測試</small>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="bg-white p-3 rounded-3 shadow-sm h-100 border">
                  <div className="badge bg-primary fs-6 mb-2 rounded-circle p-2 px-3">4</div>
                  <h6 className="fw-bold mb-1">正式上線與維運</h6>
                  <small className="text-muted">SEO 提交、數據追蹤與全天保固</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 精選案例區塊 (Portfolio / Cases) */}
      <section id="cases" className="py-5 bg-light">
        <div className="container py-lg-4">
          <div className="section-title-wrap text-center">
            <div className="section-badge"><i className="bi bi-award me-1"></i>PORTFOLIO SHOWCASE</div>
            <h2 className="section-title display-6">精選客戶成功案例</h2>
            <p className="text-secondary mt-3 mx-auto" style={{ maxWidth: '680px' }}>
              探索我們為各領域知名企業與新創品牌打造的標竿作品，見證實質的數據成長與品牌躍進。
            </p>
          </div>

          {/* 分類按鈕組 */}
          <div className="text-center mb-5 filter-btn-group" role="group" aria-label="案例分類篩選">
            <button 
              type="button" 
              onClick={() => setActiveFilter('all')} 
              className={`btn btn-outline-primary filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            >
              全部專案
            </button>
            <button 
              type="button" 
              onClick={() => setActiveFilter('brand')} 
              className={`btn btn-outline-primary filter-btn ${activeFilter === 'brand' ? 'active' : ''}`}
            >
              品牌形象
            </button>
            <button 
              type="button" 
              onClick={() => setActiveFilter('rwd')} 
              className={`btn btn-outline-primary filter-btn ${activeFilter === 'rwd' ? 'active' : ''}`}
            >
              響應式官網
            </button>
            <button 
              type="button" 
              onClick={() => setActiveFilter('ecommerce')} 
              className={`btn btn-outline-primary filter-btn ${activeFilter === 'ecommerce' ? 'active' : ''}`}
            >
              電商系統
            </button>
            <button 
              type="button" 
              onClick={() => setActiveFilter('system')} 
              className={`btn btn-outline-primary filter-btn ${activeFilter === 'system' ? 'active' : ''}`}
            >
              系統開發
            </button>
          </div>

          {/* 案例網格 */}
          <div className="row g-4" id="casesContainer">
            {filteredCases.map((item) => (
              <div key={item.id} className="col-md-6 col-lg-4 case-item">
                <div className="case-card h-100" id={item.id}>
                  <div className="case-img-wrap">
                    <img src={item.image} alt={item.title} />
                    <div className="case-overlay text-white text-center">
                      <span className="badge bg-primary mb-2">{item.categoryName}</span>
                      <h5 className="fw-bold mb-2">{item.title}</h5>
                      <p className="small mb-3 text-light">{item.summary}</p>
                      <button 
                        type="button" 
                        onClick={() => setSelectedCase(item)}
                        className="btn btn-light btn-sm rounded-pill px-3 fw-bold js-view-case-btn"
                      >
                        <i className="bi bi-eye me-1"></i>查看詳細介紹
                      </button>
                    </div>
                  </div>
                  <div className="p-3 bg-white border-top">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="text-primary small fw-bold">{item.categoryName.split('/')[0]}</span>
                        <h5 className="card-title fw-bold fs-6 mb-0 mt-1">{item.title}</h5>
                      </div>
                      <span className="badge bg-light text-dark border">{item.tagBadge}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 聯絡我們區塊 (Contact Us) - 包含精準嵌入地址與諮詢表單 */}
      <section id="contact" className="py-5">
        <div className="container py-lg-4">
          <div className="section-title-wrap text-center">
            <div className="section-badge"><i className="bi bi-geo-alt-fill me-1"></i>GET IN TOUCH</div>
            <h2 className="section-title display-6">聯絡我們・開啟數位新篇章</h2>
            <p className="text-secondary mt-3 mx-auto" style={{ maxWidth: '680px' }}>
              無論您有全新專案建置需求、現有網站升級或是 SEO 健檢諮詢，歡迎隨時與我們聯繫或蒞臨參訪！
            </p>
          </div>

          {/* 表單成功提示 */}
          {submittedData && (
            <div className="alert alert-success alert-dismissible fade show shadow-sm mb-4" role="alert">
              <strong>感謝您的諮詢，{submittedData.name} 貴賓！</strong> 我們已收到您的「{submittedData.service}」專案需求，專業顧問將於 24 小時內透過電話 ({submittedData.phone}) 或 Email ({submittedData.email}) 與您接洽。
              <button type="button" className="btn-close" onClick={() => setSubmittedData(null)} aria-label="關閉"></button>
            </div>
          )}

          <div className="row g-4">
            {/* 左側：表單 */}
            <div className="col-lg-6">
              <div className="contact-info-card">
                <h4 className="fw-bold mb-3 text-dark d-flex align-items-center">
                  <i className="bi bi-chat-dots-fill text-primary me-2"></i>填寫專案需求諮詢
                </h4>
                <p className="text-muted small mb-4">請填妥下方資訊，我們的資深專案顧問將在 24 小時內與您取得聯繫並提供專案評估建議。</p>

                <form onSubmit={handleSubmit} noValidate className={formValidated ? 'was-validated' : ''}>
                  <div className="row g-3">
                    {/* 姓名 */}
                    <div className="col-md-6">
                      <label htmlFor="contactName" className="form-label fw-semibold">您的姓名 / 稱謂 <span className="text-danger">*</span></label>
                      <div className="input-group">
                        <span className="input-group-text bg-light"><i className="bi bi-person"></i></span>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="contactName" 
                          placeholder="例如：陳經理" 
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          required 
                        />
                        <div className="invalid-feedback">請輸入您的姓名或稱謂。</div>
                      </div>
                    </div>

                    {/* 電話 */}
                    <div className="col-md-6">
                      <label htmlFor="contactPhone" className="form-label fw-semibold">聯絡電話 <span className="text-danger">*</span></label>
                      <div className="input-group">
                        <span className="input-group-text bg-light"><i className="bi bi-telephone"></i></span>
                        <input 
                          type="tel" 
                          className="form-control" 
                          id="contactPhone" 
                          placeholder="例如：0912-345-678" 
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                          required 
                        />
                        <div className="invalid-feedback">請提供有效的聯絡電話。</div>
                      </div>
                    </div>

                    {/* 電子信箱 */}
                    <div className="col-12">
                      <label htmlFor="contactEmail" className="form-label fw-semibold">電子郵件 (Email) <span className="text-danger">*</span></label>
                      <div className="input-group">
                        <span className="input-group-text bg-light"><i className="bi bi-envelope"></i></span>
                        <input 
                          type="email" 
                          className="form-control" 
                          id="contactEmail" 
                          placeholder="yourname@company.com" 
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          required 
                        />
                        <div className="invalid-feedback">請輸入正確格式的電子信箱。</div>
                      </div>
                    </div>

                    {/* 需求服務項目 */}
                    <div className="col-md-6">
                      <label htmlFor="contactServiceSelect" className="form-label fw-semibold">需求服務項目</label>
                      <select 
                        className="form-select" 
                        id="contactServiceSelect"
                        value={formState.service}
                        onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      >
                        <option value="響應式網頁設計 (RWD)">響應式網頁設計 (RWD)</option>
                        <option value="企業形象與官方網站">企業形象與官方網站</option>
                        <option value="搜尋引擎優化與效能">搜尋引擎優化與效能 (SEO)</option>
                        <option value="電商購物與金流整合">電商購物與金流整合</option>
                        <option value="UI/UX 介面體驗設計">UI/UX 介面體驗設計</option>
                        <option value="網站維護與資安託管">網站維護與資安託管</option>
                        <option value="其他客製化專案">其他客製化專案</option>
                      </select>
                    </div>

                    {/* 預算範圍 */}
                    <div className="col-md-6">
                      <label htmlFor="contactBudget" className="form-label fw-semibold">預算評估範圍</label>
                      <select 
                        className="form-select" 
                        id="contactBudget"
                        value={formState.budget}
                        onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                      >
                        <option value="5萬~10萬">NT$ 50,000 ~ 100,000</option>
                        <option value="10萬~20萬">NT$ 100,000 ~ 200,000</option>
                        <option value="20萬~50萬">NT$ 200,000 ~ 500,000</option>
                        <option value="50萬以上">NT$ 500,000 以上</option>
                      </select>
                    </div>

                    {/* 專案描述 */}
                    <div className="col-12">
                      <label htmlFor="contactMessage" className="form-label fw-semibold">專案需求簡述</label>
                      <textarea 
                        className="form-control" 
                        id="contactMessage" 
                        rows={4} 
                        placeholder="請簡要描述您的專案期望、參考網站或預計上線時間..." 
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        required
                      ></textarea>
                      <div className="invalid-feedback">請填寫簡要的需求說明。</div>
                    </div>

                    {/* 送出按鈕 */}
                    <div className="col-12 mt-4">
                      <button 
                        type="submit" 
                        className="btn btn-primary btn-lg w-100 rounded-pill fw-bold shadow-sm"
                        disabled={isSubmitting}
                        id="btnSubmitContact"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            處理中...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-send-fill me-2"></i>立即送出諮詢申請
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* 右側：公司地址與 Google 地圖嵌入 */}
            <div className="col-lg-6">
              <div className="contact-info-card d-flex flex-column justify-content-between">
                <div>
                  <h4 className="fw-bold mb-3 text-dark d-flex align-items-center">
                    <i className="bi bi-pin-map-fill text-primary me-2"></i>公司據點與聯絡資訊
                  </h4>
                  
                  {/* 地址 */}
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="bi bi-building"></i>
                    </div>
                    <div>
                      <div className="fw-bold text-dark">公司地址</div>
                      <div className="text-secondary">
                        <strong>中國文化大學大安分部</strong><br />
                        106 臺北市大安區龍安里和平東路一段155號3~6樓
                      </div>
                      <small className="text-muted d-block mt-1">
                        <i className="bi bi-info-circle me-1"></i>交通指南：近捷運古亭站 5 號出口 / 科技大樓站，師大一帶公車站步行約 3 分鐘。
                      </small>
                    </div>
                  </div>

                  {/* 聯絡專線與 Email */}
                  <div className="row g-3 mb-3">
                    <div className="col-sm-6">
                      <div className="contact-item mb-0">
                        <div className="contact-icon">
                          <i className="bi bi-telephone-inbound"></i>
                        </div>
                        <div>
                          <div className="fw-bold text-dark">諮詢專線</div>
                          <a href="tel:0227005858" className="text-decoration-none text-primary fw-semibold">(02) 2700-5858</a>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="contact-item mb-0">
                        <div className="contact-icon">
                          <i className="bi bi-envelope-at"></i>
                        </div>
                        <div>
                          <div className="fw-bold text-dark">電子信箱</div>
                          <a href="mailto:service@innodigital.tw" className="text-decoration-none text-primary fw-semibold">service@innodigital.tw</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 營業時間 */}
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="bi bi-clock-history"></i>
                    </div>
                    <div>
                      <div className="fw-bold text-dark">營業服務時間</div>
                      <div className="text-secondary">週一至週五：09:00 - 18:00 (國定例假日除外)</div>
                    </div>
                  </div>
                </div>

                {/* Google 嵌入地圖 */}
                <div className="map-container mt-3">
                  <iframe 
                    title="中國文化大學大安分部 106臺北市大安區龍安里和平東路一段155號 地圖"
                    src="https://maps.google.com/maps?q=%E4%B8%AD%E5%9C%8B%E6%96%87%E5%8C%96%E5%A4%A7%E5%AD%B8%E5%A4%A7%E5%AE%89%E5%88%86%E9%83%A8%20%E5%8F%B0%E5%8C%97%E5%B8%82%E5%A4%A7%E5%AE%89%E5%88%86%E9%83%A8%20%E5%8F%B0%E5%8C%97%E5%B8%82%E5%A4%A7%E5%AE%89%E5%8D%80%E5%92%8C%E5%B9%B3%E6%9D%B1%E8%B7%AF%E4%B8%80%E6%AE%B5155%E8%99%9F&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    allowFullScreen={false}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ 區塊 */}
          <div className="mt-5 pt-4">
            <h4 className="text-center fw-bold mb-4 text-dark"><i className="bi bi-question-circle text-primary me-2"></i>客戶常見問題解答 (FAQ)</h4>
            <div className="accordion accordion-flush mx-auto shadow-sm rounded-4 overflow-hidden border" id="faqAccordion" style={{ maxWidth: '900px' }}>
              <div className="accordion-item">
                <h2 className="accordion-header" id="faqHeading1">
                  <button className="accordion-button fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse1">
                    製作一個完整的響應式官方網站大約需要多少時間？
                  </button>
                </h2>
                <div id="faqCollapse1" className="accordion-collapse collapse show">
                  <div className="accordion-body text-secondary">
                    一般標準型企業形象官方網站的建置週期約為 <strong>2 至 4 週</strong>。流程包含前期的需求訪談、視覺風格提案、HTML5/CSS3/Bootstrap 5 響應式程式切版、跨裝置測試及 SEO 上線調校。
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="faqHeading2">
                  <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse2">
                    為什麼堅持使用標準 HTML5、CSS3 與 Bootstrap 5 進行開發？
                  </button>
                </h2>
                <div id="faqCollapse2" className="accordion-collapse collapse">
                  <div className="accordion-body text-secondary">
                    原生標準架構具備<strong>極高的載入速度、極低的伺服器開銷以及卓越的搜尋引擎友善度 (SEO)</strong>。相較於龐大笨重的前端框架，原生網頁代碼結構純淨透明、易於日後維護擴充，在任何手機或瀏覽器上都能發揮 100% 的穩定效能。
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="faqHeading3">
                  <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse3">
                    網站上線後有包含後續維護與保固嗎？
                  </button>
                </h2>
                <div id="faqCollapse3" className="accordion-collapse collapse">
                  <div className="accordion-body text-secondary">
                    是的！我們所有交付的專案皆提供<strong>第一年免費技術維護保固</strong>，涵蓋系統日常安全更新、伺服器監控、定期資料異地備份與基本文字圖片微調支援。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 頁尾 (Footer) */}
      <footer className="footer-section pt-5 pb-4">
        <div className="container">
          <div className="row g-4 mb-5">
            {/* 公司簡介 */}
            <div className="col-lg-4 col-md-6">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-layers-fill text-primary fs-3 me-2"></i>
                <span className="text-white fw-bold fs-4">創曜數位科技</span>
              </div>
              <p className="small text-secondary mb-4">
                專注於結合視覺美學、語意化標準與極致效能的官方網站建置。以 Mobile-First 精神為企業量身打造無懈可擊的數位門面。
              </p>
              <div className="d-flex gap-2">
                <a href="#home" className="btn btn-outline-secondary btn-sm rounded-circle text-white" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
                <a href="#home" className="btn btn-outline-secondary btn-sm rounded-circle text-white" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
                <a href="#home" className="btn btn-outline-secondary btn-sm rounded-circle text-white" aria-label="LINE"><i className="bi bi-line"></i></a>
                <a href="#home" className="btn btn-outline-secondary btn-sm rounded-circle text-white" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>

            {/* 網站導覽 */}
            <div className="col-lg-2 col-md-6 col-6">
              <h5>網站導覽</h5>
              <ul className="footer-links">
                <li><button type="button" onClick={() => scrollToSection('home')} className="btn btn-link p-0 text-secondary text-decoration-none">首頁 Overview</button></li>
                <li><button type="button" onClick={() => scrollToSection('about')} className="btn btn-link p-0 text-secondary text-decoration-none">關於我們 About</button></li>
                <li><button type="button" onClick={() => scrollToSection('services')} className="btn btn-link p-0 text-secondary text-decoration-none">服務項目 Services</button></li>
                <li><button type="button" onClick={() => scrollToSection('cases')} className="btn btn-link p-0 text-secondary text-decoration-none">精選案例 Portfolio</button></li>
                <li><button type="button" onClick={() => scrollToSection('contact')} className="btn btn-link p-0 text-secondary text-decoration-none">聯絡諮詢 Contact</button></li>
              </ul>
            </div>

            {/* 服務列表 */}
            <div className="col-lg-3 col-md-6 col-6">
              <h5>專業服務</h5>
              <ul className="footer-links">
                <li><button type="button" onClick={() => handleSelectService('響應式網頁設計 (RWD)')} className="btn btn-link p-0 text-secondary text-decoration-none">響應式網頁 (RWD)</button></li>
                <li><button type="button" onClick={() => handleSelectService('企業形象與官方網站')} className="btn btn-link p-0 text-secondary text-decoration-none">企業品牌形象官網</button></li>
                <li><button type="button" onClick={() => handleSelectService('搜尋引擎優化與效能')} className="btn btn-link p-0 text-secondary text-decoration-none">SEO 搜尋優化與效能</button></li>
                <li><button type="button" onClick={() => handleSelectService('電商購物與金流整合')} className="btn btn-link p-0 text-secondary text-decoration-none">電商購物系統整合</button></li>
                <li><button type="button" onClick={() => handleSelectService('UI/UX 介面體驗設計')} className="btn btn-link p-0 text-secondary text-decoration-none">UI/UX 體驗設計</button></li>
                <li><button type="button" onClick={() => handleSelectService('網站維護與資安託管')} className="btn btn-link p-0 text-secondary text-decoration-none">網站資安與維運託管</button></li>
              </ul>
            </div>

            {/* 公司據點 */}
            <div className="col-lg-3 col-md-6">
              <h5>公司據點</h5>
              <p className="small text-secondary mb-2">
                <i className="bi bi-geo-alt text-primary me-2"></i>中國文化大學大安分部<br />
                106 臺北市大安區龍安里和平東路一段155號3~6樓
              </p>
              <p className="small text-secondary mb-2">
                <i className="bi bi-telephone text-primary me-2"></i>(02) 2700-5858
              </p>
              <p className="small text-secondary mb-0">
                <i className="bi bi-envelope text-primary me-2"></i>service@innodigital.tw
              </p>
            </div>
          </div>

          <hr className="border-secondary my-4" />

          {/* 版權 */}
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
              <small className="text-secondary">&copy; 2026 創曜數位科技 InnoDigital Solutions. 版權所有，轉載必究。</small>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <small className="text-secondary">純 HTML5 + CSS3 + Bootstrap 5 + Vanilla JS 原生架構建置</small>
            </div>
          </div>
        </div>
      </footer>

      {/* 精選案例詳細彈窗 (Case Detail Modal) */}
      {selectedCase && (
        <div 
          className="modal fade show d-block" 
          tabIndex={-1} 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
              <div className="modal-header bg-dark text-white border-0 py-3">
                <div>
                  <span className="badge bg-primary me-2">{selectedCase.categoryName}</span>
                  <h5 className="modal-title fw-bold d-inline">{selectedCase.title}</h5>
                </div>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setSelectedCase(null)} 
                  aria-label="關閉"
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="mb-3 rounded-3 overflow-hidden shadow-sm">
                  <img 
                    src={selectedCase.image} 
                    className="img-fluid w-100" 
                    alt={selectedCase.title} 
                    style={{ maxHeight: '380px', objectFit: 'cover' }} 
                  />
                </div>
                <h6 className="fw-bold text-dark mb-2">
                  <i className="bi bi-info-circle-fill text-primary me-2"></i>專案背景與規劃
                </h6>
                <p className="text-secondary">{selectedCase.description}</p>
                
                <div className="row g-3 mt-2 bg-light p-3 rounded-3 border">
                  <div className="col-sm-6">
                    <small className="text-muted d-block">委託客戶：</small>
                    <span className="fw-bold text-dark">{selectedCase.client}</span>
                  </div>
                  <div className="col-sm-6">
                    <small className="text-muted d-block">核心指標成果：</small>
                    <span className="fw-bold text-success">{selectedCase.highlight}</span>
                  </div>
                  <div className="col-12 mt-2">
                    <small className="text-muted d-block">採用技術棧：</small>
                    <span className="badge bg-secondary-subtle text-dark border">{selectedCase.tech}</span>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0 bg-light p-3">
                <button 
                  type="button" 
                  className="btn btn-secondary rounded-pill px-4" 
                  onClick={() => setSelectedCase(null)}
                >
                  關閉
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary rounded-pill px-4" 
                  onClick={() => {
                    setSelectedCase(null);
                    handleSelectService(`針對「${selectedCase.title}」專案合作諮詢`);
                  }}
                >
                  立即諮詢類似專案
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 回到頂部按鈕 */}
      <button 
        type="button" 
        id="backToTopBtn" 
        className={showBackToTop ? 'show' : ''}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="回到頁面頂端"
      >
        <i className="bi bi-arrow-up"></i>
      </button>
    </div>
  );
}
