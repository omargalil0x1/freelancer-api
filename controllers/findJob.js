const { JSDOM } = require('jsdom');

const axios = require('axios');

async function index(request, response) {

    try {

        const RESPONSE = await axios.get(`https://www.freelancer.com/jobs${request.params.page_number !== undefined && Boolean(Number(request.params.page_number)) == true ? "/" + request.params.page_number : ""}`);

        const dom = new JSDOM(RESPONSE.data);

        const document = dom.window.document;

        const titles = document.getElementsByClassName('JobSearchCard-primary-heading')

        const links = document.querySelectorAll('.JobSearchCard-primary-heading .JobSearchCard-primary-heading-link')

        const description = document.getElementsByClassName('JobSearchCard-primary-description')

        const tags = document.getElementsByClassName('JobSearchCard-primary-tags')

        const price = document.querySelectorAll('.JobSearchCard-secondary-price')

        const bids = document.querySelectorAll('.JobSearchCard-secondary-entry')

        const days = document.getElementsByClassName('JobSearchCard-primary-heading-days')

        const status = document.querySelectorAll('.JobSearchCard-primary-heading-status')


        let posts = []

        let number_of_cards = document.getElementsByClassName('JobSearchCard-item ').length

        for(let i = 0; i < number_of_cards; i++) {

            let status_if = status[i] == undefined || null ? 'Payment Not Verified' : 'Payment Verified'
            let price_if = price[i] == undefined || null ? 'No Price Yet' : price[i].textContent.replace('<br>', '').replace(/\s+/g, ' ').trim()
            let bids_if = bids[i] == undefined || null ? 'No Bids Yet' : bids[i].textContent.replace('<br>', '').replace(/\s+/g, ' ').trim()

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
        }

        response.status(200).json({
            posts,
        })

    }
    catch (error) {
        response.status(401).json({
            // 'error': `Error, Something went wrong`,
            'error': `Something went wrong!`
        })
    }
}


module.exports = { index }
