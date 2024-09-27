// Function to fetch profiles from Google Sheets
async function fetchProfiles() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbwsRAnkvEd0MXTdI2TVuGKLv_Oro_0UqsRWUbnizFgdqPq52ZizFCDEvDJvRTCUgjHz9g/exec');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        return []; // Return an empty array in case of error
    }
}


// Function to display profiles
async function displayProfiles() {
    const profiles = await fetchProfiles(); // Fetch profiles from Google Sheets
    window.profiles = profiles; // Store profiles globally for filtering
    const profileList = document.getElementById('profileList');
    profileList.innerHTML = '';

    profiles.forEach(profile => {
        const profileDiv = document.createElement('div');
        profileDiv.classList.add('profile');
        profileDiv.innerHTML = `
            <img src="${profile.image}" alt="${profile.name}">
            <p><strong>Name:</strong> ${profile.name}</p>
            <p><strong>Gender:</strong> ${profile.gender}</p>
            <p><strong>Branch:</strong> ${profile.branch}</p>
            <p><strong>Year:</strong> ${profile.year}</p>
            <p class="contact">Instagram: <a href="https://instagram.com/${profile.instaId.substring(1)}" target="_blank">${profile.instaId}</a></p>
        `;
        profileList.appendChild(profileDiv);
    });
}

// Function to filter profiles based on search, branch, gender, and year
function filterProfiles() {
    const profiles = window.profiles || []; // Use global profiles array
    const searchValue = document.getElementById('search').value.toLowerCase();
    const branchValue = document.getElementById('branchFilter').value;
    const genderValue = document.getElementById('genderFilter').value;
    const yearValue = document.getElementById('yearFilter').value;

    const filteredProfiles = profiles.filter(profile => {
        const matchesSearch = profile.name.toLowerCase().includes(searchValue);
        const matchesBranch = branchValue === "" || profile.branch === branchValue;
        const matchesGender = genderValue === "" || profile.gender === genderValue;
        const matchesYear = yearValue === "" || profile.year === yearValue;
        return matchesSearch && matchesBranch && matchesGender && matchesYear;
    });

    displayFilteredProfiles(filteredProfiles);
}

// Function to display filtered profiles
function displayFilteredProfiles(filteredProfiles) {
    const profileList = document.getElementById('profileList');
    profileList.innerHTML = '';

    filteredProfiles.forEach(profile => {
        const profileDiv = document.createElement('div');
        profileDiv.classList.add('profile');
        profileDiv.innerHTML = `
            <img src="${profile.image}" alt="${profile.name}">
            <p><strong>Name:</strong> ${profile.name}</p>
            <p><strong>Gender:</strong> ${profile.gender}</p>
            <p><strong>Branch:</strong> ${profile.branch}</p>
            <p><strong>Year:</strong> ${profile.year}</p>
            <p class="contact">Instagram: <a href="https://instagram.com/${profile.instaId.substring(1)}" target="_blank">${profile.instaId}</a></p>
        `;
        profileList.appendChild(profileDiv);
    });
}

// Event listeners for filtering
document.getElementById('search').addEventListener('input', filterProfiles);
document.getElementById('branchFilter').addEventListener('change', filterProfiles);
document.getElementById('genderFilter').addEventListener('change', filterProfiles);
document.getElementById('yearFilter').addEventListener('change', filterProfiles);

// Display profiles when the page loads
window.onload = displayProfiles;  
