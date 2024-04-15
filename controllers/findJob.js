const { JSDOM } = require('jsdom');
const axios = require('axios');

async function index(request, response) {
    try {
        const page_number = request.params.page_number !== undefined && !isNaN(request.params.page_number) ? `/${request.params.page_number}` : '';
        const url = `https://www.freelancer.com/jobs${page_number}`;

        const { data } = await axios.get(url);
        const dom = new JSDOM(data);
        const document = dom.window.document;

        const posts = [];

        const jobCards = document.querySelectorAll('.JobSearchCard-item');

        jobCards.forEach((card) => {
            const titleElement = card.querySelector('.JobSearchCard-primary-heading');
            const descriptionElement = card.querySelector('.JobSearchCard-primary-description');
            const linkElement = card.querySelector('.JobSearchCard-primary-heading-link');
            const tagsElement = card.querySelector('.JobSearchCard-primary-tags');
            const priceElement = card.querySelector('.JobSearchCard-secondary-price');
            const bidsElement = card.querySelector('.JobSearchCard-secondary-entry');
            const daysElement = card.querySelector('.JobSearchCard-primary-heading-days');
            const statusElement = card.querySelector('.JobSearchCard-primary-heading-status');

            const projectTitle = titleElement?.textContent?.trim().replace('<br>', '').replace(/\s+/g, ' ') || 'No Title';
            const projectDescription = descriptionElement?.textContent?.trim().replace('<br>', '').replace(/\s+/g, ' ') || 'No Description';
            const projectLink = linkElement?.href ? 'https://www.freelancer.com' + linkElement.href : '';
            const projectTags = tagsElement?.textContent?.trim().replace('<br>', '').replace(/\s+/g, ' ') || 'No Tags';
            const projectPrice = priceElement?.textContent?.trim().replace('<br>', '').replace(/\s+/g, ' ') || 'No Price';
            const freelancersBids = bidsElement?.textContent?.trim().replace('<br>', '').replace(/\s+/g, ' ') || 'No Bids';
            const endsIn = daysElement?.textContent?.trim().replace('<br>', '').replace(/\s+/g, ' ') || 'No Deadline';
            const paymentStatus = statusElement?.textContent?.trim() ? 'Payment Verified' : 'Payment Not Verified';

            posts.push({
                'project-title': projectTitle,
                'project-description': projectDescription,
                'project-link': projectLink,
                'project-tags': projectTags,
                'ends in': endsIn,
                'project-price': projectPrice,
                'freelancers-bids': freelancersBids,
                'payment': paymentStatus,
            });
        });

        response.status(200).json({ posts });
    } catch (error) {
        console.error('Error fetching or parsing HTML:', error);
        response.status(500).json({ error: 'Something went wrong' });
    }
}

module.exports = { index };


/*
    posts.push({
        'project-title': titles[i].textContent.replace('<br>', '').replace(/\s+/g, ' ').trim(),
        'project-description': description[i].textContent.replace('<br>', '').replace(/\s+/g, ' ').trim(),
        'project-link': 'https://www.freelancer.com' + links[i].href,
        'project-tags': tags[i].textContent.replace('<br>', '').replace(/\s+/g, ' ').trim(),
        'ends in': days[i].textContent.replace('<br>', '').replace(/\s+/g, ' ').trim(),
        'project-price': price_if,
        'freelancers-bids': bids_if,
        'payment': status_if,
    })
*/
