// ==========================================================================
// 1. محرك تتبع إعلانات Google الموحد (تعدله من هنا فقط وسيعمل في كل الصفحات)
// ==========================================================================
const G_ID = 'AW-xxxxxxxxxxxx'; // اكتب هنا معرف الحساب الإعلاني للعميل
const C_L  = 'xxxxxxxxxxxx';    // اكتب هنا معرف تحويل الاتصال الهاتفي
const W_L  = 'xxxxxxxxxxxx';    // اكتب هنا معرف تحويل نقرات الواتساب

// سكربت التثبيت التلقائي لـ Google Ads في المتصفح دون الحاجة لكتابته في الصفحات
(function() {
    if (G_ID && G_ID !== 'AW-xxxxxxxxxxxx') {
        // تحميل مكتبة gtag.js ديناميكياً
        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + G_ID;
        document.head.appendChild(script);

        // تهيئة دالة gtag
        window.dataLayer = window.dataLayer || [];
        window.gtag = function(){ dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', G_ID);
    }
})();

// تتبع النقرات التلقائي للاتصال والواتساب عبر جميع صفحات الموقع
document.addEventListener('click', function(e){
    var a = e.target.closest('a');
    if(!a) return;
    var href = a.href || '';
    
    // التحقق من تفعيل الـ ID قبل الإرسال لمنع الأخطاء البرمجية
    if (typeof gtag === 'function' && G_ID !== 'AW-xxxxxxxxxxxx') {
        if(href.startsWith('tel:')){
            gtag('event','conversion',{'send_to': G_ID + '/' + C_L,'value':50.0,'currency':'SAR'});
        }
        if(href.includes('wa.me') || href.includes('whatsapp')){
            gtag('event','conversion',{'send_to': G_ID + '/' + W_L,'value':40.0,'currency':'SAR'});
        }
    }
}, true);


// ==========================================================================
// 2. التحكم بفتح وإغلاق قائمة الجوال (Hamburger Menu)
// ==========================================================================
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
}

document.addEventListener('click', (event) => {
    if (navMenu && navMenu.classList.contains('open')) {
        if (!navMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
            navMenu.classList.remove('open');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    }
});


// ==========================================================================
// 3. التحكم بأكورديون الأسئلة الشائعة (Collapse/Expand)
// ==========================================================================
const faqButtons = document.querySelectorAll('.faq-btn');

faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isActive = item.classList.contains('active');
        
        document.querySelectorAll('.faq-item').forEach(el => {
            el.classList.remove('active');
            el.querySelector('i').className = "fa-solid fa-plus";
        });
        
        if (!isActive) {
            item.classList.add('active');
            btn.querySelector('i').className = "fa-solid fa-xmark";
        }
    });
});


// ==========================================================================
// 4. إظهار وإخفاء زر الصعود للأعلى (Back to Top)
// ==========================================================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        if (backToTop) backToTop.style.display = 'flex';
    } else {
        if (backToTop) backToTop.style.display = 'none';
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// ==========================================================================
// 5. إرسال نموذج الاتصال وتحويل العميل مباشرة للواتساب
// ==========================================================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const clientName = document.getElementById('name').value.trim();
        const clientPhone = document.getElementById('phone').value.trim();
        const clientService = document.getElementById('service').value;
        const clientMessage = document.getElementById('message').value.trim();
        
        if (clientName && clientPhone && clientService) {
            formSuccess.style.display = 'block';
            
            const messageText = `السلام عليكم ورحمة الله وبركاته، أرغب في طلب معاينة وسعر لمشروعي بالرياض:\n\n` +
                                `👤 الاسم الكريم: ${clientName}\n` +
                                `📞 الجوال: ${clientPhone}\n` +
                                `🛠 الخدمة المطلوبة: ${clientService}\n` +
                                `📝 ملاحظات: ${clientMessage || 'لا يوجد'}`;
                                
            const encodedText = encodeURIComponent(messageText);
            const targetWhatsappUrl = `https://wa.me/966536491079?text=${encodedText}`;
            
            contactForm.reset();
            
            setTimeout(() => {
                window.open(targetWhatsappUrl, '_blank');
                formSuccess.style.display = 'none';
            }, 1200);
        }
    });
}
