document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // 更新URL哈希（无页面跳转）
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });

    // 下载许可证文本
    const downloadButtons = document.querySelectorAll('#downloadBtn, #downloadLicenseBtn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取许可证文本
            const licenseContent = document.querySelector('.license-content').innerText;
            
            // 创建Blob对象
            const blob = new Blob([licenseContent], { type: 'text/plain' });
            
            // 创建下载链接
            const downloadUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'AFN-LICENSE-2.0.txt';
            
            // 触发下载
            document.body.appendChild(a);
            a.click();
            
            // 清理
            setTimeout(() => {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(downloadUrl);
            }, 100);
            
            // 添加下载反馈
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="bi bi-check-circle me-2"></i>已下载';
            this.classList.add('btn-success');
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.classList.remove('btn-success');
            }, 2000);
        });
    });

    // 滚动动画
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .table, .license-content');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('fade-in-up');
            }
        });
    };

    // 初始加载时触发一次
    animateOnScroll();
    
    // 滚动时触发
    window.addEventListener('scroll', animateOnScroll);

    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // 向下滚动
            navbar.classList.remove('scrolled-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // 向上滚动
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scrolled-up');
        }
        
        lastScroll = currentScroll;
    });

    // 导航栏高亮当前部分
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    const highlightNav = () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', highlightNav);
    
    // 页面加载时检查URL哈希
    if (window.location.hash) {
        const hash = window.location.hash;
        const targetElement = document.querySelector(hash);
        
        if (targetElement) {
            setTimeout(() => {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});
