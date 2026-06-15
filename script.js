/* ==========================================================================
   1. إعدادات ومعرفات إعلانات جوجل (تعديل من مكان واحد لكل الموقع)
   ========================================================================== */
const G_ID = 'AW-xxxxx'; // استبدل xxxxx بمعرف الحساب لاحقاً (مثال: AW-123456789)
const C_L = 'xxxxx';    // استبدل xxxxx بلابل الاتصال لاحقاً (مثال: ab_cDEfGhIjK)
const W_L = 'xxxxx';    // استبدل xxxxx بلابل الواتساب لاحقاً (مثال: xy_z1234567)

/* ==========================================================================
   2. تحميل كود تتبع جوجل تلقائياً بعد اكتمال تحميل الصفحة لتسريع الـ FCP والـ LCP
   ========================================================================== */
window.addEventListener('load', function() {
    // إنشاء عنصر الـ script وحقنه ديناميكياً بعد انتهاء تحميل العناصر الحيوية للموقع
    var gScript = document.createElement('script');
    gScript.async = true;
    gScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + G_ID;
    document.head.appendChild(gScript);
});

// إعدادات الـ dataLayer الافتراضية
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', G_ID);

/* ==========================================================================
   3. مستشعر رصد النقرات التلقائي لإعلانات جوجل (اتصال وواتساب)
   ========================================================================== */
document.addEventListener('click', function(e) {
    // البحث عن أقرب عنصر رابط تم النقر عليه
    var a = e.target.closest('a');
    if (!a) return;
    
    var href = a.href || '';
    
    // رصد نقرة الاتصال الهاتفي وإرسال التحويل لجوجل
    if (href.startsWith('tel:')) {
        gtag('event', 'conversion', {
            'send_to': G_ID + '/' + C_L,
            'value': 50.0,
            'currency': 'SAR'
        });
    }
    
    // رصد نقرة الواتساب وإرسال التحويل لجوجل
    if (href.includes('wa.me') || href.includes('whatsapp')) {
        gtag('event', 'conversion', {
            'send_to': G_ID + '/' + W_L,
            'value': 40.0,
            'currency': 'SAR'
        });
    }
}, true);

/* ==========================================================================
   4. تفعيل وإغلاق قائمة الجوال (Hamburger Menu)
   ========================================================================== */
// فحص المعرفين لضمان العمل على أي هيكلية HTML في الهيدر
const menuToggle = document.getElementById('menuToggle') || document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // منع انتقال النقرة لإبقاء القائمة مستقرة
        navMenu.classList.toggle('open');
    });

    // إغلاق القائمة تلقائياً عند النقر خارجها لتسهيل تصفح الزائر
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('open');
        }
    });
}

/* ==========================================================================
   5. تشغيل حركة زر الصعود للأعلى (Back To Top) بمرونة وسلاسة
   ========================================================================== */
const backToTopBtn = document.getElementById('backToTop');

// نضمن وجود الزر في الصفحة أولاً لتفادي الأخطاء البرمجية
if (backToTopBtn) {
    // إخفاء مبدئي برمجي لتجنب أي مشاكل مع ملفات CSS القديمة في ذاكرة التصفح
    backToTopBtn.style.display = 'none'; 

    let isScrolling = false;

    // استخدام مستمع حدث خفيف لمنع اهتزاز الشاشة وتخفيف الحمل على المعالج بالجوال
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                if (window.scrollY > 300) {
                    backToTopBtn.style.display = 'flex'; // إظهار الزر فوراً كـ flex
                    setTimeout(function() {
                        backToTopBtn.classList.add('show');
                    }, 10);
                } else {
                    backToTopBtn.classList.remove('show'); // بدء تأثير الاختفاء
                    setTimeout(function() {
                        if (!backToTopBtn.classList.contains('show')) {
                            backToTopBtn.style.display = 'none';
                        }
                    }, 250);
                }
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true }); // passive: true تسرع تمرير الصفحة على الجوال بشكل ملحوظ

    // تنفيذ حركة الصعود الناعمة عند النقر
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
