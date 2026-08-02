document.addEventListener('DOMContentLoaded', () => {
  // スムーススクロール機能
  const links = document.querySelectorAll('a[href^="#"]');
  
  for (const link of links) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      const target = document.querySelector(href);
      
      if (target) {
        const headerOffset = 70;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  }

  // カウントダウンタイマー処理
  const targetDate = new Date('2026-08-15T21:30:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');

    // 要素が存在しない場合は処理を中断
    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    // 大会開始後の表示
    if (diff <= 0) {
      document.getElementById('countdown').innerHTML = '<span style="color:var(--neon-pink); font-size:1.5rem; font-weight:bold;">大会開催中！</span>';
      return;
    }

    // 日・時間・分・秒の計算
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    // 2桁揃え（01, 02...）で画面にセット
    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(mins).padStart(2, '0');
    secsEl.textContent = String(secs).padStart(2, '0');
  }

  // 初回実行と1秒ごとのループ実行
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

// --- スクロールアニメーションの監視処理 ---
document.addEventListener('DOMContentLoaded', () => {
  // 監視対象の要素を取得
  const fadeElements = document.querySelectorAll('.js-fade');

  // IntersectionObserverのオプション設定（画面の20%の位置にきたら発動）
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -20% 0px',
    threshold: 0
  };

  // 画面に入ったかチェックする監視機能
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 画面に入ったら .is-show クラスを追加
        entry.target.classList.add('is-show');
        // 一度表示されたら監視を解除（一度きりのアニメーションにする場合）
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 各要素の監視を開始
  fadeElements.forEach(el => observer.observe(el));
});


  const hamburger = document.getElementById('js-hamburger');
  const nav = document.getElementById('js-nav');
  const navLinks = nav.querySelectorAll('a');

  // ボタンタップで開閉切り替え
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
    nav.classList.toggle('is-open');
  });

  // メニュー内のリンクをタップしたらメニューを閉じる
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-active');
      nav.classList.remove('is-open');
    });
  });
