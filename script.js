document.addEventListener("DOMContentLoaded", function () {
    const generateButton = document.getElementById("generate-button");
    generateButton.addEventListener("click", function () {
        const values = [];
        for (let i = 1; i <= 6; i++) {
            const valueInput = document.getElementById(`value${i}`);
            values.push(parseFloat(valueInput.value) || 0);
        }

        // Calculate the total sum of values
        const totalSum = values.reduce((sum, value) => sum + value, 0);

        // Calculate percentages
        const percentages = values.map(value => ((value / totalSum) * 100).toFixed(2));

        // Hide input fields and button
        const dataForm = document.getElementById("data-form");
        dataForm.style.display = "none";

        const chartContainer = document.getElementById("chart-container");
        chartContainer.style.marginTop = "20px"; // Adjust the margin as needed

        const ctx = document.getElementById('pie-chart').getContext('2d');
        ctx.canvas.style.display = 'block';
        ctx.canvas.style.width = '80%';
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [
                    'เข้าร่วมกิจกรรม',
                    'ขาดกิจกรรม',
                    'ลากิจ',
                    'มาสาย',
                    'ครูที่ปรึกษายังไม่เช็คชื่อ',
                    'ลาป่วย'
                ],
                datasets: [{
                    data: percentages,
                    backgroundColor: [
                        'rgba(72,207,131,255)',
                        'rgba(237,109,110,255)',
                        'rgba(115,201,238,255)',
                        'rgba(158,189,111,255)',
                        'rgba(145,160,179,255)',
                        'rgba(136,126,241,255)'
                    ]
                }]
            },
            options: {
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            const dataset = data.datasets[tooltipItem.datasetIndex];
                            const percent = parseFloat(dataset.data[tooltipItem.index]).toFixed(2) + "%";
                            return `${data.labels[tooltipItem.index]}: ${percent}`;
                        }
                    }
                }
            }
        });
    });
});
