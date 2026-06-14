// ==========================================================================
// 1. التحكم بفتح وإغلاق قائمة الجوال (Hamburger Menu)
// ==========================================================================
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        // تغيير شكل الأيقونة عند الفتح والإغلاق
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

// إغلاق القائمة تلقائياً عند الضغط في أي مكان خارجها
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
// 2. التحكم بأكورديون الأسئلة الشائعة (Collapse/Expand)
// ==========================================================================
const faqButtons = document.querySelectorAll('.faq-btn');

faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isActive = item.classList.contains('active');
        
        // إغلاق جميع الأسئلة الأخرى أولاً ليكون المظهر مرتباً
        document.querySelectorAll('.faq-item').forEach(el => {
            el.classList.remove('active');
            el.querySelector('i').className = "fa-solid fa-plus";
        });
        
        // فتح السؤال الذي تم الضغط عليه فقط
        if (!isActive) {
            item.classList.add('active');
            btn.querySelector('i').className = "fa-solid fa-xmark";
        }
    });
});

// ==========================================================================
// 3. إظهار وإخفاء زر الصعود للأعلى (Back to Top)
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
// 4. إرسال نموذج الاتصال وتحويل العميل مباشرة للواتساب للتحويل الإعلاني
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
            
            // تجهيز نص الرسالة التي ستصل للمقاول في الواتساب تلقائياً
            const messageText = `السلام عليكم ورحمة الله وبركاته، أرغب في طلب معاينة وسعر لمشروعي بالرياض:\n\n` +
                                `👤 الاسم الكريم: ${clientName}\n` +
                                `📞 الجوال: ${clientPhone}\n` +
                                `🛠 الخدمة المطلوبة: ${clientService}\n` +
                                `📝 ملاحظات: ${clientMessage || 'لا يوجد'}`;
                                
            const encodedText = encodeURIComponent(messageText);
            const targetWhatsappUrl = `https://wa.me/966536491079?text=${encodedText}`;
            
            // تفريغ الحقول بعد الإرسال
            contactForm.reset();
            
            // تحويل العميل للواتساب بعد ثانية واحدة
            setTimeout(() => {
                window.open(targetWhatsappUrl, '_blank');
                formSuccess.style.display = 'none';
            }, 1200);
        }
    });
}
