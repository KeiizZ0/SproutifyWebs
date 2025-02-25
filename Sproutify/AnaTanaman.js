function searchCard() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const cardContainer = document.getElementById('cardContainer');
    
    // Hapus semua card yang ada di dalam container
    cardContainer.innerHTML = '';

    // Data tanaman yang ada (misal: Jagung, Padi, Gandum)
    const plants = [
        {
            category: 'jagung',
            name: 'Jagung',
            description: 'Jagung merupakan tanaman yang banyak dibudidayakan di berbagai negara.',
            imgSrc: 'https://images.bisnis.com/posts/2021/10/08/1451976/antarafoto-harga-jagung-turun-290921-yn-1-1.jpg',
            modalId: 'modalJagung'
        },
        {
            category: 'padi',
            name: 'Padi',
            description: 'Padi adalah sumber utama karbohidrat bagi mayoritas penduduk dunia.',
            imgSrc: 'https://pertanian.sultengprov.go.id/wp-content/uploads/2022/01/pupuk_padi.jpg',
            modalId: 'modalPadi'
        },
        {
            category: 'gandum',
            name: 'Gandum',
            description: 'Gandum adalah salah satu tanaman serealia yang paling penting di dunia.',
            imgSrc: 'https://www.greeners.co/wp-content/uploads/2017/09/Flora-Tanaman-Gandum-Tanaman-Penghasil-Roti-dari-Dataran-Tinggi.jpg',
            modalId: 'modalGandum'
        },
        {
            category: 'tomat',
            name: 'Tomat',
            description: 'Tomat merupakan tumbuhan nasih berkerabat dengan terung, kentang dan paprika.',
            imgSrc: 'https://asset.kompas.com/crops/49G2Bf73VUTRh2BSPNsITNTV3bw=/0x23:1000x689/750x500/data/photo/2023/01/24/63cf285552dcf.jpg',
            modalId: 'modalTomat'
        },
    ];

    // Cek apakah ada hasil pencarian yang cocok
    const foundPlants = plants.filter(plant => 
        plant.category.includes(searchInput) || plant.name.toLowerCase().includes(searchInput)
    );

    // Jika ada hasil yang cocok, tampilkan card baru
    if (foundPlants.length > 0) {
        foundPlants.forEach(plant => {
            const cardHTML = `
                <div class="card" data-category="${plant.category}">
                    <img src="${plant.imgSrc}" alt="${plant.name}">
                    <div class="card-content">
                        <h3>${plant.name}</h3>
                        <p>${plant.description}</p>
                        <button onclick="openModal('${plant.modalId}')">Pelajari Lebih Lanjut</button>
                    </div>
                </div>
            `;
            cardContainer.innerHTML += cardHTML; // Tambahkan ke cardContainer
        });
    } else {
        // Jika tidak ada hasil pencarian, tampilkan pesan "tidak ditemukan"
        cardContainer.innerHTML = '<p style="text-align:center;">Tanaman tidak ditemukan.</p>';
    }
}

function goBack() {
    // Kembali ke tampilan awal dengan mengembalikan semua card asli
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = `
        <div id="cardContainer" class="card-container">
        <!-- Existing cards (Jagung, Padi, Gandum) -->
        <div class="card" data-category="jagung">
            <img src="Image/Jagung.jpg" alt="Jagung">
            <div class="card-content">
                <h3>Jagung</h3>
                <p>Jagung merupakan tanaman yang banyak dibudidayakan di berbagai negara.</p>
                <button class="learn-more-btn" onclick="openModal('modalJagung')">Pelajari Lebih Lanjut</button>
            </div>
        </div>

        <div class="card" data-category="padi">
            <img src="Image/padi1.png" alt="Padi">
            <div class="card-content">
                <h3>Padi</h3>
                <p>Padi adalah sumber utama karbohidrat bagi mayoritas penduduk dunia.</p>
                <button class="learn-more-btn" onclick="openModal('modalPadi')">Pelajari Lebih Lanjut</button>
            </div>
        </div>

        <div class="card" data-category="gandum">
            <img src="https://www.greeners.co/wp-content/uploads/2017/09/Flora-Tanaman-Gandum-Tanaman-Penghasil-Roti-dari-Dataran-Tinggi.jpg" alt="Gandum">
            <div class="card-content">
                <h3>Gandum</h3>
                <p>Gandum adalah salah satu tanaman serealia yang paling penting di dunia.</p>
                <button class="learn-more-btn" onclick="openModal('modalGandum')">Pelajari Lebih Lanjut</button>
            </div>
        </div>


    </div>
    `;
    // Clear the search input
    document.getElementById('searchInput').value = '';
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector('.modal-content');
    
    // Show modal with animation
    modal.classList.add('show');
    modal.style.display = 'flex'; // Ensure the modal is visible
    setTimeout(() => {
        modalContent.classList.add('show'); // Add animation class for zoom-in and fade-in
    }, 10); // Small delay to allow the transition
}

// Function to close the modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector('.modal-content');
    
    // Remove animation and hide modal
    modalContent.classList.remove('show');
    setTimeout(() => {
        modal.classList.remove('show');
        modal.style.display = 'none'; // Hide the modal after animation
    }, 300); // Match the CSS transition duration (0.3 seconds)
}