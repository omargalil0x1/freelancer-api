const { JSDOM } = require('jsdom');

const axios = require('axios');

async function index(request, response) {

    try {

        const RESPONSE = await axios.get(`https://www.freelancer.com/freelancers${request.params.page_number !== undefined && Boolean(Number(request.params.page_number)) == true ? "/" + request.params.page_number : ""}`);

        const dom = new JSDOM(RESPONSE.data);

        const document = dom.window.document;

        const freelancers_username = document.querySelectorAll('.freelancer-details .freelancer-details-header .find-freelancer-username')

        const freelancers_hr_rating = document.querySelectorAll('.freelancer-card-stats .freelancer-hourlyrate')

        const freelancers_reviews = document.querySelectorAll('.freelancer-card-stats .Rating-review')

        const freelancers_earnings = document.querySelectorAll('.freelancer-card-stats .Earnings')

        const freelancers_stars = document.querySelectorAll('.freelancer-card-stats .Rating')

        const freelancers_skills = document.querySelectorAll('.freelancer-details .top-skills')

        const freelancers_bio = document.querySelectorAll('.freelancer-details .bio')

        let freelancers = []

        let number_of_cards = document.querySelectorAll('.freelancer-details .freelancer-details-header .find-freelancer-username').length

        for(let i = 0; i < number_of_cards; i++) {

            freelancers.push({
                'name': freelancers_username[i].textContent.replace('<br>', '').replace(/\s+/g, ' ').trim(),
                'hour-rating': freelancers_hr_rating[i].textContent.replace('<br>', '').replace(/\s+/g, ' ').trim(),
                'reviews': freelancers_reviews[i].textContent.replace('<br>', '').replace(/\s+/g, ' ').trim(),
                'earnings': freelancers_earnings[i].textContent.replace('<br>', '').replace(/\s+/g, ' ').trim(),
                'stars': freelancers_stars[i].getAttribute('data-star_rating'),
                'skills': freelancers_skills[i].textContent.replace('<br>', '').replace(/\s+/g, ' ').trim(),
                'bio': freelancers_bio[i].textContent.replace('<br>', '').replace(/\n/g, '').trim(),
                'freelancer-profile': 'https://freelancer.com/u/' + freelancers_username[i].textContent.replace('<br>', '').replace(/\s+/g, ' ').trim(),
            })
        }

        response.status(200).json({
            freelancers,
        })


    }
    catch (error) {
        response.status(401).json({
            // 'error': `Something went wrong!`,
            'error': error,
        })
    }
}


module.exports = { index }
