// تحديد الرابط النشط في شريط التنقل
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    setActiveNavLink();
    // إضافة وظيفة تبديل القائمة المنسدلة
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });

    // إغلاق القائمة المنسدلة عند النقر على أي رابط
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
        });
    });

    const gameCards = document.querySelectorAll('.game-card');
    const modal = document.getElementById('game-modal');
    const modalTitle = document.getElementById('modal-game-title');
    const gameFrame = document.getElementById('game-frame');
    const closeBtn = document.querySelector('.close-btn');
    const categoryBtns = document.querySelectorAll('.category-btn');

    // فتح اللعبة في صفحة جديدة عند النقر على زر المشاهدة الحية
    gameCards.forEach(card => {
        const demoBtn = card.querySelector('.demo-btn');
        const gameId = card.getAttribute('data-game');

        demoBtn.addEventListener('click', function (e) {
            e.preventDefault();
            // فتح اللعبة في صفحة جديدة
            window.open(`https://abooelnaga.github.io/Games/${gameId}/`, '_blank');
        });
    });

    // إغلاق النافذة المنبثقة
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        gameFrame.src = '';
        document.body.style.overflow = 'auto'; // استعادة التمرير
    });

    // إغلاق النافذة المنبثقة عند النقر خارجها
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            gameFrame.src = '';
            document.body.style.overflow = 'auto';
        }
    });

    // إضافة تأثيرات حركية للبطاقات
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // وظيفة تصفية الألعاب حسب التصنيف
    function filterGamesByCategory(category) {
        gameCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // إضافة مستمعي الأحداث لأزرار التصنيف
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // إزالة الفئة النشطة من جميع الأزرار
            categoryBtns.forEach(b => b.classList.remove('active'));
            // إضافة الفئة النشطة للزر المحدد
            this.classList.add('active');

            // إضافة تأثير نقرة للزر
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // تصفية الألعاب حسب التصنيف المحدد
            const category = this.getAttribute('data-category');
            filterGamesByCategory(category);

            // إضافة تأثير انتقالي للألعاب
            gameCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 50);
                    }, 100);
                }
            });
        });
    });
});
