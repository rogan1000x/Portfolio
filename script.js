// 포트폴리오 상호작용

// 페이지 로드 시 헤더 애니메이션
window.addEventListener('load', function() {
  const header = document.getElementById('header');
  header.style.opacity = '0';
  header.style.transform = 'translateY(-30px)';
  
  setTimeout(() => {
    header.style.transition = 'all 0.8s ease-out';
    header.style.opacity = '1';
    header.style.transform = 'translateY(0)';
  }, 100);
});

// 스크롤 시 섹션 나타나기
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// 모든 섹션에 옵저버 적용
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'all 0.6s ease-out';
  observer.observe(section);
});

// 프로젝트 카드 클릭 효과
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function(e) {
    // 링크가 아닌 카드 영역 클릭 시
    if (!e.target.classList.contains('btn')) {
      // 효과음 재생 (선택사항)
      playCardClickSound();
    }
  });
});

// 간단한 효과음
function playCardClickSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 700;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {
    // 브라우저가 Audio API를 지원하지 않으면 무시
  }
}

// 부드러운 스크롤
document.querySelectorAll('a