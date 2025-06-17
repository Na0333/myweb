// 轮播图功能
document.addEventListener('DOMContentLoaded', function() {
    // 轮播图
    const slides = document.querySelectorAll('.dynamic-banner .slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        slides[0].classList.add('active');

        setInterval(function() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 3000);
    }

    // 标签页切换 - 增强版
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 获取要切换到的标签页ID
            const tabId = this.getAttribute('data-tab');
            if (!tabId) {
                console.error('标签页缺少data-tab属性');
                return;
            }
            
            // 获取对应的内容区域
            const targetContent = document.getElementById(tabId);
            if (!targetContent) {
                console.error(`未找到ID为${tabId}的内容区域`);
                return;
            }
            
            // 移除所有标签的活动状态
            tabs.forEach(t => t.classList.remove('active'));
            
            // 添加当前标签的活动状态
            this.classList.add('active');
            
            // 隐藏所有内容区域
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 显示对应的内容区域
            targetContent.classList.add('active');
            
            // 如果是认证进度标签，确保其内容正确显示
            if (tabId === 'certification') {
                // 确保认证进度内容区域可见
                targetContent.style.display = 'block';
            }
        });
    });

    // 语音搜索功能
    const voiceSearchBtn = document.getElementById('voice-search');
    if (voiceSearchBtn) {
        voiceSearchBtn.addEventListener('click', function() {
            alert('语音搜索功能即将上线，敬请期待！');
        });
    }
    
    // 初始化 - 确保默认选中的标签页内容正确显示
    const activeTab = document.querySelector('.tab.active');
    if (activeTab) {
        const defaultTabId = activeTab.getAttribute('data-tab');
        const defaultContent = document.getElementById(defaultTabId);
        if (defaultContent) {
            // 隐藏所有内容区域
            const allContents = document.querySelectorAll('.tab-content');
            allContents.forEach(content => content.classList.remove('active'));
            
            // 显示默认内容
            defaultContent.classList.add('active');
        }
    }

    // 统一导航系统 - 代替原有导航跳转代码
    initNavigation();
});

/**
 * 初始化统一导航系统
 * 处理导航链接点击事件和当前页面高亮
 */
function initNavigation() {
    // 页面映射表
    const navMap = {
        'index': 'index.html',
        'history': 'history.html',
        'custom': 'custom.html',
        'heritage': 'heritage.html',
        'music': 'music.html'
    };
    
    // 获取当前页面文件名
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // 获取所有导航链接
    const navLinks = document.querySelectorAll('.fixed-nav .nav-link');
    
    navLinks.forEach(link => {
        // 移除所有active类
        link.classList.remove('active');
        
        // 获取导航目标
        const navTarget = link.getAttribute('data-nav');
        
        // 如果链接对应当前页面，添加active类
        if (navMap[navTarget] === currentPage) {
            link.classList.add('active');
        }
        
        // 添加点击事件处理
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取目标页面
            const targetPage = navMap[navTarget];
            
            // 如果不是当前页面，则跳转
            if (targetPage && targetPage !== currentPage) {
                window.location.href = targetPage;
            }
        });
    });
    
    // 移除旧的导航处理代码（如果有）
    // 注意：如果旧代码中有ID选择器，这里不需要特别处理，因为我们现在使用data-nav属性
}

// 删除或注释掉旧的导航处理代码
/* 
var navMap = {
    'nav-home': 'index.html',
    'nav-history': 'history.html',
    'nav-custom': 'custom.html',
    'nav-heritage': 'heritage.html',
    'nav-music': 'music.html'
};
Object.keys(navMap).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = navMap[id];
        });
    }
});
*/