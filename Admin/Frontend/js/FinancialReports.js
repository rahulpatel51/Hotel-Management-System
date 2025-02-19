// Example of dynamic financial report data handling (Optional)
document.addEventListener('DOMContentLoaded', () => {
    const financialReportData = [
        { month: 'January', revenue: '$10,000', expenses: '$7,500', profit: '$2,500' },
        { month: 'February', revenue: '$12,000', expenses: '$8,200', profit: '$3,800' },
        // Add more months as needed
    ];

    const tableBody = document.querySelector('.financial-report-table tbody');
    
    financialReportData.forEach((report) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${report.month}</td>
            <td>${report.revenue}</td>
            <td>${report.expenses}</td>
            <td>${report.profit}</td>
        `;
        tableBody.appendChild(row);
    });
});
