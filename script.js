/* ==========================================================
   DouFun 豆坊 × 伊甸基金會 企業合作提案網站 - 互動邏輯
   採用 Lenis 平滑滾動與 GSAP ScrollTrigger 動畫引擎
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. 初始化 Lenis 平滑滾動
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. 頂部滾動進度條更新
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const currentScroll = window.scrollY;
        const progressPercentage = (currentScroll / totalHeight) * 100;
        document.getElementById('scrollProgress').style.width = progressPercentage + '%';
    });

    // 3. 註冊 GSAP ScrollTrigger 插件
    gsap.registerPlugin(ScrollTrigger);

    // 4. Hero 區塊元素 Parallax 與淡入動畫
    gsap.from(".hero-content > *", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    gsap.to(".hero-bg-elements", {
        y: 150,
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // 5. 通用區塊標題與卡片 Scroll Reveal 浮現動畫
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const cards = section.querySelectorAll('.glass-card, .angel-card, .channel-card, .guardian-card');
        if (cards.length > 0) {
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out"
            });
        }
    });

    // 6. 數字遞增動畫 (Count Up Animation)
    const statNumbers = document.querySelectorAll('.stat-number, .target-amount span');
    let animated = false;

    window.addEventListener('scroll', () => {
        const forewordSection = document.getElementById('foreword');
        const rect = forewordSection.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && !animated) {
            statNumbers.forEach(num => {
                const target = +num.getAttribute('data-target');
                let count = 0;
                const speed = target / 50; // 調整計數速度

                const updateCount = () => {
                    count += speed;
                    if (count < target) {
                        num.innerText = Math.ceil(count).toLocaleString();
                        setTimeout(updateCount, 30);
                    } else {
                        num.innerText = target.toLocaleString();
                    }
                };
                updateCount();
            });
            animated = true;
        }
    });

    // 7. 守護商店水平滾動區滑鼠互動優化
    const scrollTrack = document.querySelector('.horizontal-scroll-container');
    if (scrollTrack) {
        let isDown = false;
        let startX;
        let scrollLeft;

        scrollTrack.addEventListener('mousedown', (e) => {
            isDown = true;
            scrollTrack.classList.add('active');
            startX = e.pageX - scrollTrack.offsetLeft;
            scrollLeft = scrollTrack.scrollLeft;
        });

        scrollTrack.addEventListener('mouseleave', () => {
            isDown = false;
        });

        scrollTrack.addEventListener('mouseup', () => {
            isDown = false;
        });

        scrollTrack.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollTrack.offsetLeft;
            const walk = (x - startX) * 2;
            scrollTrack.scrollLeft = scrollLeft - walk;
        });
    }

    // 8. Ending 區塊情感元素淡入動畫
    gsap.from(".ending-container > *", {
        scrollTrigger: {
            trigger: "#ending",
            start: "top 70%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out"
    });
});
