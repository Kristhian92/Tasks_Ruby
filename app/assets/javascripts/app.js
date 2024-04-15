document.addEventListener('DOMContentLoaded', async () => {
    const featuresList = document.getElementById('featuresList');
    const magTypeFilter = document.getElementById('magTypeFilter');
    const pagination = document.getElementById('pagination');
    let currentPage = 1;
    let totalPages = 0;
    let perPage = 10;

    fetchData();

    async function fetchData() {
        try {
            const response = await fetch(`http://localhost:3000/api/features?page=${currentPage}&per_page=${perPage}&filters[mag_type]=${magTypeFilter.value}`);
            const data = await response.json();
            renderFeatures(data.data);
            currentPage = data.pagination.current_page;
            totalPages = data.pagination.total;
            perPage = data.pagination.per_page;
            renderPagination();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function renderFeatures(features) {
        featuresList.innerHTML = features.map(feature => `
      <li>
        <p>ID: ${feature.id}</p>
        <p>Title: ${feature.attributes.title}</p>
        <p>Magnitude: ${feature.attributes.magnitude}</p>
        <p>Place: ${feature.attributes.place}</p>
        <p>Time: ${feature.attributes.time}</p>
        <p>Tsunami: ${feature.attributes.tsunami ? 'Yes' : 'No'}</p>
        <p>Magnitude Type: ${feature.attributes.mag_type}</p>
        <p>Coordinates: ${feature.attributes.coordinates.longitude}, ${feature.attributes.coordinates.latitude}</p>
        <a href="${feature.links.external_url}" target="_blank" rel="noopener noreferrer">More info</a>
        <form>
          <input type="text" name="body" required />
          <button type="submit">Add Comment</button>
        </form>
      </li>
    `).join('');
    }

    function renderPagination() {
        pagination.innerHTML = `
      <button ${currentPage === 1 ? 'disabled' : ''} onclick="prevPage()">Previous Page</button>
      <span>Page ${currentPage} of ${totalPages}</span>
      <button ${currentPage === totalPages ? 'disabled' : ''} onclick="nextPage()">Next Page</button>
    `;
    }

    window.prevPage = () => {
        currentPage--;
        fetchData();
    };

    window.nextPage = () => {
        currentPage++;
        fetchData();
    };

    magTypeFilter.addEventListener('change', () => {
        currentPage = 1;
        fetchData();
    });

    featuresList.addEventListener('submit', async event => {
        event.preventDefault();
        const featureId = event.target.parentNode.querySelector('p:nth-child(1)').textContent.split(':')[1].trim();
        const body = event.target.elements.body.value;
        try {
            const response = await fetch(`http://localhost:3000/api/features/${featureId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ body })
            });
            const data = await response.json();
            console.log('Comment created successfully:', data);
            // Aquí podrías actualizar tu estado para reflejar el nuevo comentario.
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    });
});
