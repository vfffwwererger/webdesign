/**
 * ==========================================================================
 * 企業形象網站 - 原生 JavaScript 核心互動腳本 (Vanilla JS)
 * 無依賴現代前端框架，完全基於原生 ES6+ 與 Bootstrap 5 運作
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    console.log('✓ 官方網站前端腳本 (Vanilla JS + Bootstrap 5) 初始化成功');

    // 1. 導覽列滾動陰影效果 (Navbar Scroll Effect)
    const navbar = document.querySelector('.custom-navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 2. 手機版選單點擊後自動收合 (Auto Collapse Mobile Nav on Click)
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse) {
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                    // 使用 Bootstrap 的 Collapse 實例進行收合
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            });
        });
    }

    // 3. 回到頂部按鈕 (Back to Top Button)
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. 精選案例分類篩選 (Portfolio Filter)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const caseItems = document.querySelectorAll('.case-item');

    if (filterButtons.length > 0 && caseItems.length > 0) {
        filterButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                // 移除所有按鈕的 active 狀態
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                caseItems.forEach(function (item) {
                    const itemCategory = item.getAttribute('data-category');
                    if (filterValue === 'all' || itemCategory === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 250);
                    }
                });
            });
        });
    }

    // 5. 案例詳細資料彈窗 (Case Detail Modal Handler)
    const caseDetailModalElement = document.getElementById('caseDetailModal');
    if (caseDetailModalElement) {
        const modalTitle = caseDetailModalElement.querySelector('#modalCaseTitle');
        const modalCategory = caseDetailModalElement.querySelector('#modalCaseCategory');
        const modalImage = caseDetailModalElement.querySelector('#modalCaseImage');
        const modalDescription = caseDetailModalElement.querySelector('#modalCaseDescription');
        const modalClient = caseDetailModalElement.querySelector('#modalCaseClient');
        const modalTech = caseDetailModalElement.querySelector('#modalCaseTech');
        const modalHighlight = caseDetailModalElement.querySelector('#modalCaseHighlight');

        const caseTriggerButtons = document.querySelectorAll('.js-view-case-btn');
        caseTriggerButtons.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const title = this.getAttribute('data-title') || '專案案例詳情';
                const category = this.getAttribute('data-category-name') || '品牌形象';
                const image = this.getAttribute('data-image') || '';
                const desc = this.getAttribute('data-desc') || '專案完整規劃與執行成果。';
                const client = this.getAttribute('data-client') || '企業專案委託';
                const tech = this.getAttribute('data-tech') || 'HTML5 / CSS3 / Bootstrap 5 / Vanilla JS';
                const highlight = this.getAttribute('data-highlight') || '效能提升與轉換率增加';

                if (modalTitle) modalTitle.textContent = title;
                if (modalCategory) modalCategory.textContent = category;
                if (modalImage) modalImage.src = image;
                if (modalDescription) modalDescription.textContent = desc;
                if (modalClient) modalClient.textContent = client;
                if (modalTech) modalTech.textContent = tech;
                if (modalHighlight) modalHighlight.textContent = highlight;

                const bsModal = new bootstrap.Modal(caseDetailModalElement);
                bsModal.show();
            });
        });
    }

    // 6. 服務項目點擊「立即預約」帶入諮詢表單 (Service Select to Contact Form)
    const serviceConsultBtns = document.querySelectorAll('.js-select-service-btn');
    const serviceSelectDropdown = document.getElementById('contactServiceSelect');

    serviceConsultBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const serviceName = this.getAttribute('data-service-name');
            if (serviceSelectDropdown && serviceName) {
                serviceSelectDropdown.value = serviceName;
            }
            // 平滑滾動至聯絡我們區塊
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 7. 聯絡表單送出與驗證 (Contact Form Submission & Validation)
    const contactForm = document.getElementById('mainContactForm');
    const formAlertSuccess = document.getElementById('formSuccessAlert');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // 檢查 HTML5 表單驗證
            if (!contactForm.checkValidity()) {
                e.stopPropagation();
                contactForm.classList.add('was-validated');
                return;
            }

            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const phone = document.getElementById('contactPhone').value;
            const service = document.getElementById('contactServiceSelect').value;
            const message = document.getElementById('contactMessage').value;

            // 模擬送出中狀態
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>處理中...';

            setTimeout(function () {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;

                if (formAlertSuccess) {
                    formAlertSuccess.classList.remove('d-none');
                    formAlertSuccess.innerHTML = `<strong>感謝您的諮詢，${name} 貴賓！</strong> 我們已收到您的「${service || '整體規劃'}」專案需求，專業顧問將於 24 小時內透過電話 (${phone}) 或 Email (${email}) 與您接洽。`;
                    formAlertSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }

                // 重置表單
                contactForm.reset();
                contactForm.classList.remove('was-validated');
            }, 800);
        });
    }

    // 8. 動態更新頁尾版權年份 (Dynamic Footer Year)
    const currentYearElements = document.querySelectorAll('.current-year');
    const thisYear = new Date().getFullYear();
    currentYearElements.forEach(function (el) {
        el.textContent = thisYear;
    });

    // 9. 滾動監視導覽列高亮 (Scrollspy Navbar Highlighting)
    const sections = document.querySelectorAll('section[id]');
    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const targetNavLink = document.querySelector(`.navbar-nav a[href*="#${sectionId}"]`);

            if (targetNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    targetNavLink.classList.add('active');
                }
            }
        });
    }
    window.addEventListener('scroll', highlightNavOnScroll);
});
