const BASE_URL = "/.netlify/functions";
let ACCESS_TOKEN = "";
let currentFan = null;
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

async function connect() {
    const apiKey = document.getElementById('apiKey').value;
    const refreshToken = document.getElementById('refreshToken').value;
    const tokenRes = await fetch(`${BASE_URL}/get_access_token`, {
        headers: {
            'x-api-key': apiKey,
            'Authorization': `Bearer ${refreshToken}`
        }
    });

    const tokenData = await tokenRes.json();
    ACCESS_TOKEN = tokenData.access_token;

    loadFans(apiKey);
}

async function loadFans(apiKey) {
    const res = await fetch(`${BASE_URL}/get_list_of_devices`, {
        headers: {
            'x-api-key': apiKey,
            'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
    });

    const fans = await res.json();
    displayFans(fans);
    document.getElementById('loginContainer').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
}

function displayFans(fans) {
    const container = document.getElementById('fans');
    container.innerHTML = '';

    fans.forEach(fan => {
        const isOn = fan.power === 'ON' ? 1 : 0;
        const room = 'Living Room'; // Mock room
        const html = `
        <div onclick='openModal(${JSON.stringify({ ...fan, is_on: isOn, room, fan_name: fan.device_name })})'>
            <div class="bg-white dark:bg-atomCard rounded-[2rem] p-5 flex flex-row items-center gap-5 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-transparent hover:border-atomYellow/50">
                <div class="relative flex-shrink-0">
                    <div class="w-16 h-16 flex items-center justify-center rounded-2xl ${isOn ? 'bg-atomYellow/10' : 'bg-gray-50 dark:bg-black'} transition-colors duration-500">
                        <svg viewBox="0 0 100 100" class="w-10 h-10 transition-all duration-500 ${isOn ? 'fill-atomYellow fan-on' : 'fill-gray-400 fan-off'}">
                            <circle cx="50" cy="50" r="6"/>
                            <path d="M50 10 C65 10,70 25,60 35 C55 40,50 38,50 35Z"/>
                            <path d="M90 50 C90 65,75 70,65 60 C60 55,62 50,65 50Z"/>
                            <path d="M50 90 C35 90,30 75,40 65 C45 60,50 62,50 65Z"/>
                            <path d="M10 50 C10 35,25 30,35 40 C40 45,38 50,35 50Z"/>
                        </svg>
                    </div>
                    ${isOn ? '<span class="absolute -top-1 -right-1 flex h-3 w-3"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-atomYellow opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 bg-atomYellow"></span></span>' : ''}
                </div>
                <div class="flex-1 min-w-0">
                    <p class="font-bold text-lg truncate">${fan.device_name}</p>
                    <p class="text-xs text-gray-500 uppercase tracking-wide font-bold">${room}</p>
                    <div class="flex items-center gap-2 mt-2">
                        <span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/5 text-[10px] font-black tracking-tighter">SPD ${fan.speed}</span>
                    </div>
                </div>
                <div class="p-2">
                    <div class="w-2.5 h-2.5 rounded-full ${isOn ? 'bg-atomYellow shadow-[0_0_8px_#f5c542]' : 'bg-gray-300 dark:bg-gray-800'}"></div>
                </div>
            </div>
        </div>`;
        container.innerHTML += html;
    });
}

function openModal(fan) {
    currentFan = fan;

    document.getElementById("modalTitle").innerText = fan.fan_name;
    document.getElementById("modalRoom").innerText = fan.room;
    document.getElementById("modalSpeed").value = fan.speed;
    document.getElementById("speedValueDisplay").innerText = fan.speed;

    const pBtnText = document.getElementById("powerBtnText");
    pBtnText.innerText = fan.is_on == 1 ? "Turn OFF" : "Turn ON";

    document.getElementById("powerBtn").onclick = () => {
        const newPower = currentFan.is_on == 1 ? 'OFF' : 'ON';
        setPower(currentFan.device_id, newPower);
    };

    document.getElementById("modalSpeed").oninput = (e) => {
        document.getElementById("speedValueDisplay").innerText = e.target.value;
    };

    document.getElementById("modalSpeed").onchange = (e) => {
        setSpeed(currentFan.device_id, e.target.value);
    };

    modal.classList.remove("hidden");
    modal.classList.add("flex");

    setTimeout(() => {
        modal.style.opacity = "1";
        modalContent.style.transform = "translateY(0)";
    }, 10);
}

function closeModal() {
    modal.style.opacity = "0";
    modalContent.style.transform = window.innerWidth < 768 ? "translateY(100%)" : "translateY(20px)";
    setTimeout(() => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    }, 300);
}

async function setPower(device_id, value) {
    await sendCommand(device_id, 'power', value);
    closeModal();
    // Reload fans
    const apiKey = document.getElementById('apiKey').value;
    loadFans(apiKey);
}

async function setSpeed(device_id, value) {
    await sendCommand(device_id, 'speed', value);
    closeModal();
    // Reload fans
    const apiKey = document.getElementById('apiKey').value;
    loadFans(apiKey);
}

async function sendCommand(device_id, command, value) {
    await fetch(`${BASE_URL}/send_command`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ device_id, command, value })
    });
}

function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
}

(function init() {
    if (localStorage.getItem("theme") === "dark" || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add("dark");
    }
})();