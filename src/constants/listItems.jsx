import React from 'react';
import config from '~/config';

export const legalsLinkList = [
    {
        text: 'Legal',
        link: config.externalLink.legal,
    },
    {
        text: 'Safety & Privacy Center',
        link: config.externalLink.safety,
    },
    {
        text: 'Privacy Policy',
        link: config.externalLink.policy,
    },
    {
        text: 'Cookies',
        link: config.externalLink.cookies,
    },
    {
        text: 'About Ads',
        link: config.externalLink.aboutAds,
    },
    {
        text: 'Accessibility',
        link: config.externalLink.accessibility,
    },
];

export const contentFooterLinkList = {
    company: [
        {
            text: 'About',
            link: config.externalLink.about,
        },
        {
            text: 'Jobs',
            link: config.externalLink.jobs,
        },
        {
            text: 'For the Record',
            link: config.externalLink.record,
        },
    ],

    communities: [
        {
            text: 'For Artists',
            link: config.externalLink.artists,
        },
        {
            text: 'Developers',
            link: config.externalLink.developers,
        },
        {
            text: 'Advertising',
            link: config.externalLink.ads,
        },
        {
            text: 'Investors',
            link: config.externalLink.investors,
        },
        {
            text: 'Vendors',
            link: config.externalLink.vendor,
        },
    ],

    useful: [
        {
            text: 'Support',
            link: config.externalLink.support,
        },
        {
            text: 'Free Mobile App',
            link: config.externalLink.download,
        },
    ],

    plans: [
        {
            text: 'Premium Individual',
            link: config.externalLink['premium-individual'],
        },
        {
            text: 'Premium Student',
            link: config.externalLink['premium-student'],
        },
        {
            text: 'Spotify Free',
            link: config.externalLink['spotify-free'],
        },
    ]
}