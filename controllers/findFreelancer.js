const { JSDOM } = require('jsdom');
const axios = require('axios');

async function index(request, response) {
    try {
        const [freelancersResponse] = await Promise.all([
            axios.get(`https://www.freelancer.com/freelancers${request.params.page_number !== undefined && Boolean(Number(request.params.page_number)) == true ? "/" + request.params.page_number : ""}`)
        ]);

        const freelancersHTML = freelancersResponse.data;
        const dom = new JSDOM(freelancersHTML);
        const document = dom.window.document;

        const freelancers = [];

        const freelancerCards = document.querySelectorAll('.freelancer-details');

        freelancerCards.forEach((card) => {
            const usernameElement = card.querySelector('.freelancer-details-header .find-freelancer-username');
            const hrRatingElement = card.querySelector('.freelancer-card-stats .freelancer-hourlyrate');
            const reviewsElement = card.querySelector('.freelancer-card-stats .Rating-review');
            const earningsElement = card.querySelector('.freelancer-card-stats .Earnings');
            const starsElement = card.querySelector('.freelancer-card-stats .Rating');
            const skillsElement = card.querySelector('.freelancer-details .top-skills');
            const bioElement = card.querySelector('.freelancer-details .bio');

            freelancers.push({
                name: usernameElement.textContent.replace('<br>', '').replace(/\s+/g, ' ').trim(),
                hourRating: hrRatingElement.textContent.replace('<br>', '').replace(/\s+/g, ' ').trim(),
                reviews: reviewsElement.textContent.replace('<br>', '').replace(/\s+/g, ' ').trim(),
                earnings: earningsElement.textContent.replace('<br>', '').replace(/\s+/g, ' ').trim(),
                stars: starsElement.getAttribute('data-star_rating'),
                skills: skillsElement.textContent.replace('<br>', '').replace(/\s+/g, ' ').trim(),
                bio: bioElement.textContent.replace('<br>', '').replace(/\n/g, '').trim(),
                freelancerProfile: 'https://freelancer.com/u/' + usernameElement.textContent.replace('<br>', '').replace(/\s+/g, ' ').trim(),
            });
        });

        response.status(200).json({ freelancers });
    } catch (error) {
        console.error('Error fetching or parsing HTML:', error);
        response.status(500).json({ error: 'Something went wrong' });
    }
}

module.exports = { index };
