const productionData = [
    {
        category: "차체/하부 구조",
        id: "structure",
        icon: "🏗️",
        traditional: {
            title: "모노코크 바디 위주",
            desc: "상·하부 구분이 모호하며 차체 뼈대에 순차적으로 부품을 덧붙이는 구조입니다. 높은 강성과 일관된 품질을 자랑하지만, 베이스 변경이 어렵습니다."
        },
        pbv: {
            title: "스케이트보드 플랫폼",
            desc: "표준화된 하부 플랫폼 위에 목적에 맞는 상부 모듈(어퍼 바디)을 레고처럼 결합하는 구조입니다. 용도에 따른 무한한 확장이 가능합니다."
        }
    },
    {
        category: "공정 레이아웃",
        id: "layout",
        icon: "🗺️",
        traditional: {
            title: "일자형(Line) 흐름",
            desc: "공정이 순서대로 고정되어 있어 효율적입니다. 하지만 특정 구간에 문제가 생기면 라인 전체가 멈추는(Line-stop) 경직된 구조입니다."
        },
        pbv: {
            title: "모듈별 셀(Island) 흐름",
            desc: "독립된 스테이션 형태로 구성됩니다. 특정 셀에 병목이 생겨도 다른 셀로 우회하여 독립적 가동이 가능해 가동률을 극대화합니다."
        }
    },
    {
        category: "물류 및 이동",
        id: "logistics",
        icon: "🚚",
        traditional: {
            title: "고정형 컨베이어 벨트",
            desc: "차체가 체인이나 모터 구동 레일을 타고 일정한 속도로 이동합니다. 대량 생산에 유리하나 동선 변경이 매우 비쌉니다."
        },
        pbv: {
            title: "AGV/AMR 무인운반차",
            desc: "자율주행 로봇이 차체를 실어 필요한 셀로만 스스로 이동합니다. 불필요한 공정을 건너뛰거나 순서를 즉시 변경할 수 있습니다."
        }
    },
    {
        category: "택트 타임(Takt)",
        id: "takt",
        icon: "⏱️",
        traditional: {
            title: "고정 / 동기화(Sync)",
            desc: "라인 전체가 동일한 작업 시간을 공유합니다. 작업량 편차가 큰 다양한 차종을 혼류 생산하기에는 비효율적입니다."
        },
        pbv: {
            title: "유동 / 비동기화(Async)",
            desc: "차종 및 목적에 따라 셀 체류 시간을 다르게 가져갈 수 있습니다. 복잡한 특수 작업도 라인 정체 없이 유연하게 처리합니다."
        }
    },
    {
        category: "생산 유연성",
        id: "flexibility",
        icon: "⚙️",
        traditional: {
            title: "소품종 대량생산",
            desc: "정해진 모델을 대규모로 찍어내는 데 최적화되었습니다. 신차 라인 변경 시 막대한 설비 투자와 시간이 소요됩니다."
        },
        pbv: {
            title: "다품종 유연생산",
            desc: "고객 니즈에 맞춘 다품종 생산에 특화됩니다. 소프트웨어와 상부 모듈 교체만으로 즉각적인 차종 변경이 가능합니다."
        }
    },
    {
        category: "엔지니어링/안전",
        id: "safety",
        icon: "🛡️",
        traditional: {
            title: "기계적 조립 효율",
            desc: "부품을 빠르고 정확하게 체결하는 하드웨어적 효율에 집중합니다. 단순 반복 작업에 대한 작업자 피로도 관리가 중요합니다."
        },
        pbv: {
            title: "전기적 체결 및 로봇 안전",
            desc: "상·하부 결합 시 전기/통신 연결의 무결성 확보가 핵심입니다. AGV와 작업자의 동선이 겹치므로 고도화된 인터락이 필수입니다."
        }
    }
];

let currentCategoryId = "structure";
let chartInstance = null;

function renderTabs() {
    const container = document.getElementById('tabContainer');
    productionData.forEach(item => {
        const btn = document.createElement('button');
        btn.className = `tab-btn ${currentCategoryId === item.id ? 'tab-active' : ''}`;
        btn.innerHTML = `<span>${item.icon}</span> <span>${item.category}</span>`;
        btn.onclick = () => updateContent(item.id);
        container.appendChild(btn);
    });
}

function updateContent(id) {
    currentCategoryId = id;
    const container = document.getElementById('tabContainer');
    Array.from(container.children).forEach((btn, idx) => {
        if (productionData[idx].id === id) {
            btn.className = "tab-btn tab-active";
        } else {
            btn.className = "tab-btn";
        }
    });

    const data = productionData.find(d => d.id === id);
    const area = document.getElementById('comparisonArea');
    
    // Animate content change
    area.style.opacity = 0;
    
    setTimeout(() => {
        area.innerHTML = `
            <div class="method-card traditional">
                <h3 class="text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">기존 생산 방식</h3>
                <h4 class="text-2xl font-bold text-slate-800 mb-4 tracking-tight">${data.traditional.title}</h4>
                <p class="text-slate-600 leading-relaxed text-lg font-medium">${data.traditional.desc}</p>
                <div class="mt-8 inline-flex items-center bg-slate-100 text-slate-600 px-4 py-2 rounded-full font-semibold text-sm">
                    <span class="mr-2">🔧</span> 고정적 효율성 최적화
                </div>
            </div>
            <div class="method-card pbv ring-1 ring-indigo-500/10">
                <h3 class="text-sm font-bold text-indigo-500 mb-3 uppercase tracking-wider">PBV 생산 방식</h3>
                <h4 class="text-2xl font-bold text-indigo-900 mb-4 tracking-tight">${data.pbv.title}</h4>
                <p class="text-slate-600 leading-relaxed text-lg font-medium">${data.pbv.desc}</p>
                <div class="mt-8 inline-flex items-center bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full font-semibold text-sm">
                    <span class="mr-2">⚡</span> 유동적 가변성 극대화
                </div>
            </div>
        `;
        area.style.transition = 'opacity 0.4s ease';
        area.style.opacity = 1;
    }, 150);
}

function initChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
    // Set global chart font
    Chart.defaults.font.family = "'Pretendard', sans-serif";
    Chart.defaults.color = '#86868b';

    chartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['대량 생산 효율', '제품 다양성', '공정 유연성', '초기 설비 단가', '통합 제어 복잡도', '작업자 안전 변수'],
            datasets: [
                {
                    label: '기존 컨베이어 방식',
                    data: [95, 40, 30, 85, 50, 40],
                    fill: true,
                    backgroundColor: 'rgba(148, 163, 184, 0.15)',
                    borderColor: 'rgb(148, 163, 184)',
                    pointBackgroundColor: '#fff',
                    pointBorderColor: 'rgb(148, 163, 184)',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverBackgroundColor: 'rgb(148, 163, 184)',
                    pointHoverBorderColor: '#fff',
                    pointHoverRadius: 6
                },
                {
                    label: 'PBV 셀 방식',
                    data: [75, 95, 95, 60, 90, 85],
                    fill: true,
                    backgroundColor: 'rgba(79, 70, 229, 0.15)',
                    borderColor: 'rgb(79, 70, 229)',
                    pointBackgroundColor: '#fff',
                    pointBorderColor: 'rgb(79, 70, 229)',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverBackgroundColor: 'rgb(79, 70, 229)',
                    pointHoverBorderColor: '#fff',
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            elements: {
                line: {
                    borderWidth: 2.5,
                    tension: 0.3
                }
            },
            scales: {
                r: {
                    angleLines: { 
                        display: true,
                        color: 'rgba(0,0,0,0.05)'
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    },
                    pointLabels: {
                        font: {
                            size: 13,
                            weight: '600'
                        },
                        color: '#1d1d1f'
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: { display: false }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: { 
                            size: 14, 
                            weight: '600' 
                        },
                        padding: 30,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#1d1d1f',
                    bodyColor: '#1d1d1f',
                    borderColor: 'rgba(0,0,0,0.05)',
                    borderWidth: 1,
                    padding: 12,
                    boxPadding: 6,
                    usePointStyle: true,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13,
                        weight: '500'
                    }
                }
            }
        }
    });
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderTabs();
    updateContent("structure");
    initChart();
});
