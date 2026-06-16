const productionData = [
    {
        category: "차체/하부 구조",
        id: "structure",
        icon: "01",
        traditional: {
            title: "모노코크 바디",
            desc: "상·하부 구분이 모호하며 차체 뼈대에 순차적으로 부품을 조립합니다. 높은 강성과 일관된 품질을 자랑하지만, 베이스 섀시의 구조적 변경이 매우 어렵습니다."
        },
        pbv: {
            title: "스케이트보드 플랫폼",
            desc: "표준화된 하부 섀시 모듈 위에 목적에 맞는 상부 어퍼 바디를 결합하는 구조입니다. 용도(여객, 화물, 특수목적)에 따른 무한한 폼팩터 확장이 가능합니다."
        }
    },
    {
        category: "공정 레이아웃",
        id: "layout",
        icon: "02",
        traditional: {
            title: "일자형(Line) 흐름",
            desc: "공정이 순서대로 고정되어 대규모 생산에 극도로 효율적입니다. 하지만 특정 구간에 설비 문제가 생기면 라인 전체가 멈추는 경직성을 내포합니다."
        },
        pbv: {
            title: "모듈별 셀(Island) 흐름",
            desc: "독립된 작업 스테이션(Cell) 형태로 구성됩니다. 특정 셀에 병목이 생겨도 제어 시스템 판단 하에 다른 셀로 우회하여 독립적 가동이 가능합니다."
        }
    },
    {
        category: "물류 및 이동",
        id: "logistics",
        icon: "03",
        traditional: {
            title: "고정형 컨베이어 레일",
            desc: "차체가 체인이나 모터 구동 레일을 타고 일정한 속도로 이동합니다. 초기 투자비용이 높으며 한 번 구축된 동선을 변경하기 매우 어렵습니다."
        },
        pbv: {
            title: "AGV/AMR 무인운반시스템",
            desc: "자율주행 로봇이 차체를 실어 필요한 셀로 스스로 이동합니다. 불필요한 공정을 유연하게 건너뛰거나 공정 순서를 소프트웨어적으로 즉시 변경합니다."
        }
    },
    {
        category: "택트 타임(Takt Time)",
        id: "takt",
        icon: "04",
        traditional: {
            title: "고정 및 동기화 (Sync)",
            desc: "라인 전체가 동일한 작업 주기를 공유합니다. 작업량 편차가 큰 다양한 사양의 차량을 혼류 생산할 경우 심각한 병목현상과 비효율이 발생합니다."
        },
        pbv: {
            title: "유동 및 비동기화 (Async)",
            desc: "차종 및 옵션에 따라 셀(Cell) 체류 시간을 독립적으로 가져갑니다. 복잡도 높은 맞춤형 특수 작업도 라인 정체 없이 유연하게 처리할 수 있습니다."
        }
    },
    {
        category: "생산 유연성",
        id: "flexibility",
        icon: "05",
        traditional: {
            title: "소품종 대량생산 최적화",
            desc: "정해진 소수 모델을 대규모로 균일하게 찍어내는 데 최적화되었습니다. 신차 라인 변경 및 추가 시 막대한 설비 개조 투자와 셧다운 시간이 소요됩니다."
        },
        pbv: {
            title: "다품종 유연생산 극대화",
            desc: "다양한 고객 니즈에 맞춘 다품종 소량 생산에 특화됩니다. 하드웨어 설비 교체 없이 소프트웨어 제어만으로 즉각적인 생산 차종 변경이 가능합니다."
        }
    },
    {
        category: "엔지니어링 무결성",
        id: "safety",
        icon: "06",
        traditional: {
            title: "기계적 체결 및 하드웨어",
            desc: "부품을 빠르고 정확하게 체결하는 기구적 효율에 집중합니다. 단순 반복 작업에 대한 작업자 피로도 및 품질 산포 관리가 가장 중요합니다."
        },
        pbv: {
            title: "전장 통합 및 로봇 관제",
            desc: "상·하부 결합 시 전기/통신 연결의 데이터 무결성 확보가 핵심입니다. AGV와 작업자의 동선이 혼재하므로 고도화된 소프트웨어 인터락이 필수입니다."
        }
    }
];

let currentCategoryId = "structure";

function renderTabs() {
    const container = document.getElementById('tabContainer');
    productionData.forEach(item => {
        const btn = document.createElement('button');
        btn.className = `tab-btn ${currentCategoryId === item.id ? 'tab-active' : ''}`;
        btn.innerHTML = `<span class="text-xs font-bold text-gray-400 mr-2">${item.icon}</span> <span>${item.category}</span>`;
        btn.onclick = () => updateContent(item.id);
        container.appendChild(btn);
    });
}

function updateContent(id) {
    currentCategoryId = id;
    const container = document.getElementById('tabContainer');
    // Ignore the first child which is the H3 title
    Array.from(container.querySelectorAll('.tab-btn')).forEach((btn, idx) => {
        if (productionData[idx].id === id) {
            btn.className = "tab-btn tab-active";
        } else {
            btn.className = "tab-btn";
        }
    });

    const data = productionData.find(d => d.id === id);
    const area = document.getElementById('comparisonArea');
    
    area.innerHTML = `
        <div class="split-panel traditional">
            <span class="panel-label">Traditional Line</span>
            <h4 class="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">${data.traditional.title}</h4>
            <p class="text-gray-600 leading-relaxed text-lg">${data.traditional.desc}</p>
        </div>
        <div class="split-panel pbv">
            <span class="panel-label">PBV Cell</span>
            <h4 class="text-3xl font-extrabold text-[#002c5f] mb-6 tracking-tight">${data.pbv.title}</h4>
            <p class="text-gray-700 leading-relaxed text-lg">${data.pbv.desc}</p>
        </div>
    `;
    
    // Simple reset animation
    const panels = area.querySelectorAll('.split-panel');
    panels.forEach(p => {
        p.style.opacity = '0';
        setTimeout(() => {
            p.style.opacity = '1';
        }, 50);
    });
}

function initChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
    Chart.defaults.font.family = "'Pretendard', sans-serif";
    Chart.defaults.color = '#777';

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['대량 생산 효율', '제품 다양성', '공정 유연성', '초기 설비 단가', '통합 제어 복잡도', '전장 통신 중요도'],
            datasets: [
                {
                    label: '컨베이어 방식',
                    data: [95, 40, 30, 85, 50, 40],
                    fill: true,
                    backgroundColor: 'rgba(156, 163, 175, 0.2)',
                    borderColor: 'rgb(156, 163, 175)',
                    borderDash: [5, 5],
                    pointBackgroundColor: 'rgb(156, 163, 175)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 1,
                    pointRadius: 3
                },
                {
                    label: 'PBV 셀 방식',
                    data: [70, 95, 95, 60, 90, 95],
                    fill: true,
                    backgroundColor: 'rgba(0, 44, 95, 0.1)', // Hyundai Blue light
                    borderColor: '#002c5f', // Hyundai Blue
                    pointBackgroundColor: '#002c5f',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            elements: {
                line: {
                    borderWidth: 2,
                    tension: 0.1
                }
            },
            scales: {
                r: {
                    angleLines: { color: 'rgba(0,0,0,0.05)' },
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    pointLabels: {
                        font: { size: 12, weight: '700' },
                        color: '#333'
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
                        font: { size: 13, weight: '600' },
                        padding: 20,
                        usePointStyle: true,
                        boxWidth: 8
                    }
                },
                tooltip: {
                    backgroundColor: '#111',
                    titleColor: '#fff',
                    bodyColor: '#ddd',
                    padding: 12,
                    cornerRadius: 0, // Sharp corners for Hyundai style
                    titleFont: { size: 13, weight: 'bold' }
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderTabs();
    updateContent("structure");
    initChart();
});
