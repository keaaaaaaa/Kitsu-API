class KitsuAnimePlatform {
    constructor() {
        this.baseURL = 'https://kitsu.io/api/edge';
        this.currentPage = 1;
        this.pageSize = 12;
        this.currentSearch = '';
        this.currentFilters = {
            status: '',
            rating: ''
        };
        this.allAnime = [];

        this.initializeElements();
        this.attachEventListeners();
        this.loadAnime();
    }

    initializeElements() {
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.statusFilter = document.getElementById('statusFilter');
        this.ratingFilter = document.getElementById('ratingFilter');
        this.animeGrid = document.getElementById('animeGrid');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        this.pagination = document.getElementById('pagination');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.pageInfo = document.getElementById('pageInfo');
        this.animeModal = document.getElementById('animeModal');
        this.closeBtn = document.querySelector('.close-btn');
        this.modalBody = document.getElementById('modalBody');
    }

    attachEventListeners() {
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });

        this.statusFilter.addEventListener('change', () => this.handleFilterChange());
        this.ratingFilter.addEventListener('change', () => this.handleFilterChange());

        this.prevBtn.addEventListener('click', () => this.previousPage());
        this.nextBtn.addEventListener('click', () => this.nextPage());

        this.closeBtn.addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (e) => {
            if (e.target === this.animeModal) this.closeModal();
        });
    }

    async loadAnime() {
        this.showLoading(true);
        try {
            let url;
            
            if (this.currentSearch) {
                url = `${this.baseURL}/anime?filter[text]=${encodeURIComponent(this.currentSearch)}&page[limit]=20`;
            } else {
                url = `${this.baseURL}/anime?page[limit]=20`;
            }

            const response = await fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/vnd.api+json'
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            this.allAnime = data.data || [];

            if (this.allAnime.length === 0) {
                this.showError('No anime found. Try a different search or filter.');
                this.showLoading(false);
                return;
            }

            this.applyFilters();
            this.currentPage = 1;
            this.displayAnime();
        } catch (error) {
            console.error('Error loading anime:', error);
            this.showError('Failed to load anime: ' + error.message);
        } finally {
            this.showLoading(false);
        }
    }

    applyFilters() {
        let filtered = [...this.allAnime];

        // Apply status filter
        if (this.currentFilters.status) {
            filtered = filtered.filter(anime => {
                const status = anime.attributes.status;
                return status === this.currentFilters.status;
            });
        }

        // Apply rating filter
        if (this.currentFilters.rating) {
            filtered = filtered.filter(anime => {
                const rating = anime.attributes.ageRating;
                return rating === this.currentFilters.rating;
            });
        }

        this.allAnime = filtered;
    }

    displayAnime() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const paginatedAnime = this.allAnime.slice(start, end);

        if (paginatedAnime.length === 0) {
            this.animeGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1;">
                    <div class="empty-state-icon">📺</div>
                    <div class="empty-state-text">No anime found. Try a different search or filter.</div>
                </div>
            `;
            this.pagination.style.display = 'none';
            return;
        }

        this.animeGrid.innerHTML = paginatedAnime.map(anime => this.createAnimeCard(anime)).join('');
        this.updatePagination();
        this.pagination.style.display = 'flex';

        // Add click listeners to cards
        document.querySelectorAll('.anime-card').forEach((card, index) => {
            card.addEventListener('click', () => this.showAnimeDetails(paginatedAnime[index]));
        });
    }

    createAnimeCard(anime) {
        const { attributes } = anime;
        const title = attributes.canonicalTitle || attributes.titles.en_jp || 'Unknown';
        const poster = attributes.posterImage?.medium || 'https://via.placeholder.com/200x280?text=No+Image';
        const rating = attributes.averageRating ? Math.round(attributes.averageRating) : 'N/A';
        const status = attributes.status || 'unknown';

        return `
            <div class="anime-card">
                <img src="${poster}" alt="${title}" class="anime-image" onerror="this.src='https://via.placeholder.com/200x280?text=No+Image'">
                <div class="anime-info">
                    <h3 class="anime-title">${title}</h3>
                    <div class="anime-meta">
                        <span class="anime-rating">⭐ ${rating}</span>
                        <span class="anime-status">${status}</span>
                    </div>
                </div>
            </div>
        `;
    }

    showAnimeDetails(anime) {
        const { attributes, id } = anime;
        const title = attributes.canonicalTitle || attributes.titles.en_jp || 'Unknown';
        const poster = attributes.posterImage?.large || attributes.posterImage?.medium || 'https://via.placeholder.com/300x400?text=No+Image';
        const synopsis = attributes.synopsis || 'No description available.';
        const rating = attributes.averageRating ? Math.round(attributes.averageRating) + '%' : 'N/A';
        const status = attributes.status || 'Unknown';
        const episodeCount = attributes.episodeCount || 'Unknown';
        const episodeLength = attributes.episodeLength || 'Unknown';
        const ageRating = attributes.ageRating || 'Not Rated';
        const startDate = attributes.startDate ? new Date(attributes.startDate).toLocaleDateString() : 'N/A';
        const endDate = attributes.endDate ? new Date(attributes.endDate).toLocaleDateString() : 'N/A';

        const genres = attributes.genres ? attributes.genres.join(', ') : 'N/A';

        const html = `
            <img src="${poster}" alt="${title}" class="modal-poster" onerror="this.src='https://via.placeholder.com/300x400?text=No+Image'">
            <h2 class="modal-title">${title}</h2>
            <div class="modal-meta">
                <div class="modal-meta-item">
                    <strong>Rating:</strong> ${rating}
                </div>
                <div class="modal-meta-item">
                    <strong>Status:</strong> ${status}
                </div>
                <div class="modal-meta-item">
                    <strong>Episodes:</strong> ${episodeCount}
                </div>
                <div class="modal-meta-item">
                    <strong>Ep. Length:</strong> ${episodeLength} min
                </div>
                <div class="modal-meta-item">
                    <strong>Age Rating:</strong> ${ageRating}
                </div>
                <div class="modal-meta-item">
                    <strong>Start Date:</strong> ${startDate}
                </div>
                <div class="modal-meta-item">
                    <strong>End Date:</strong> ${endDate}
                </div>
                <div class="modal-meta-item">
                    <strong>Genres:</strong> ${genres}
                </div>
            </div>
            <div class="modal-synopsis">
                <div class="modal-synopsis-title">Synopsis</div>
                ${synopsis}
            </div>
        `;

        this.modalBody.innerHTML = html;
        this.animeModal.classList.add('active');
    }

    closeModal() {
        this.animeModal.classList.remove('active');
    }

    handleSearch() {
        this.currentSearch = this.searchInput.value.trim();
        this.currentFilters = {
            status: this.statusFilter.value,
            rating: this.ratingFilter.value
        };
        this.loadAnime();
    }

    handleFilterChange() {
        this.currentFilters = {
            status: this.statusFilter.value,
            rating: this.ratingFilter.value
        };
        this.currentPage = 1;
        this.loadAnime();
    }

    updatePagination() {
        const totalPages = Math.ceil(this.allAnime.length / this.pageSize);
        this.pageInfo.textContent = `Page ${this.currentPage} of ${totalPages}`;

        this.prevBtn.disabled = this.currentPage === 1;
        this.nextBtn.disabled = this.currentPage === totalPages;
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.displayAnime();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    nextPage() {
        const totalPages = Math.ceil(this.allAnime.length / this.pageSize);
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.displayAnime();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    showLoading(show) {
        this.loadingIndicator.classList.toggle('active', show);
    }

    showError(message) {
        this.animeGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <div class="empty-state-icon">❌</div>
                <div class="empty-state-text">${message}</div>
            </div>
        `;
    }
}

// Initialize the platform when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.kitsuPlatform = new KitsuAnimePlatform();
});
