const container = document.getElementById('grades-container');

// ૧૦ રો (Rows) જનરેટ કરવા માટે
for (let i = 1; i <= 10; i++) {
    container.innerHTML += `
        <div class="grade-row">
            <span style="width:20px; font-weight:bold;">${i}</span>
            <input type="number" id="w${i}" class="w-input" placeholder="kg" oninput="updatePerKg(${i})">
            <input type="number" id="p${i}" class="p-input" placeholder="₹" oninput="updatePerKg(${i})">
            <select id="t${i}" class="t-select" onchange="updatePerKg(${i})">
                <option value="1">1 kg</option>
                <option value="20">20 kg</option>
            </select>
            <input type="text" id="perKg${i}" class="readonly-kg" placeholder="0" readonly>
        </div>
    `;
} 

function updatePerKg(id) {
    let p = parseFloat(document.getElementById(`p${id}`).value) || 0;
    let type = parseFloat(document.getElementById(`t${id}`).value);
    let perKgDisplay = document.getElementById(`perKg${id}`);
    if (type === 20) { perKgDisplay.value = (p / 20).toFixed(2); } 
    else { perKgDisplay.value = p.toFixed(2); }
} 

function setAllTypes(value) {
    const selects = document.getElementsByClassName('t-select');
    for (let i = 0; i < selects.length; i++) {
        selects[i].value = value;
        updatePerKg(i + 1);
    }
} 

function resetForm() {
    document.getElementById('calcForm').reset();
    document.getElementById('results').style.display = 'none';
    for(let i=1; i<=10; i++) { document.getElementById(`perKg${i}`).value = ''; }
    window.scrollTo(0, 0);
} 

function calculate() {
    let totalW = 0, totalS = 0;
    let gradingMode = document.getElementById('gradingMode').value;
    
    for (let i = 1; i <= 10; i++) {
        let w = parseFloat(document.getElementById(`w${i}`).value) || 0;
        let p = parseFloat(document.getElementById(`p${i}`).value) || 0;
        let type = parseFloat(document.getElementById(`t${i}`).value);
        totalW += w;
        totalS += (type === 20) ? (w / 20 * p) : (w * p);
    } 

    if (totalW === 0) { alert("વજન અને ભાવ લખો."); return; } 

    let totalCrates = totalW / 20;
    let gCharge = (gradingMode === 'mandi') ? 13 : 0;
    let lCharge = 15;
    let totalExp = totalCrates * (gCharge + lCharge);
    let mCharge = totalS * 0.03;
    let net = totalS - (totalExp + mCharge); 

    document.getElementById('results').style.display = 'block';
    document.getElementById('resW').innerText = totalW.toFixed(2) + " kg";
    document.getElementById('resS').innerText = "₹ " + totalS.toFixed(2);
    document.getElementById('resExp').innerText = "₹ " + totalExp.toFixed(2);
    document.getElementById('resM').innerText = "₹ " + mCharge.toFixed(2);
    document.getElementById('resNet').innerText = "₹ " + net.toFixed(2);
    document.getElementById('resAvg').innerText = "સરેરાશ: ₹ " + (net / totalW).toFixed(2) + " /kg";
    
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}
