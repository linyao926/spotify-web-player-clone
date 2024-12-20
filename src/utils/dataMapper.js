export const mapToNormalCardData = (item, type) => {
    switch (type) {
        case 'track':
            return {
                id: item.id,
                imgCircle: false,
                imgUrl: item.album?.images[0]?.url || '',
                title: item.name,
                subtitle: item.artists?.[0]?.name || '',
                routeLink: `/track/${item.id}`,
                showType: false,
                showAuthor: false,
                showDate: false,
            };
            
        case 'album':
            return {
                id: item.id,
                imgCircle: false,
                imgUrl: item.images?.[0]?.url || '',
                title: item.name,
                release_date: item['release_date'],
                album_type: item['album_type'],
                routeLink: `/album/${item.id}`,
                artists: item.artists,
                type: 'album',
                showType: true,
                showAuthor: false,
                showDate: true,
            };
            
        case 'artist':
            return {
                id: item.id,
                imgCircle: true,
                imgUrl: item.images?.[0]?.url || '',
                title: item.name,
                type: 'artist',
                routeLink: `/artist/${item.id}`,
                showType: true,
                showAuthor: false,
                showDate: false,
            };

        case 'playlist': 
            return {
                id: item.id,
                imgCircle: false,
                imgUrl: item.images?.[0]?.url || '',
                title: item.name,
                type: 'playlist',
                description: item.description ? item.description : '',
                routeLink: `/playlist/${item.id}`,
                author: item.owner['display_name'],
                showType: false,
                showAuthor: true,
                showDate: false,
            };
            
        default:
            return {
                imgCircle: false,
                imgUrl: '',
                title: 'Unknown',
                subtitle: '',
                routeLink: '#',
                showType: false,
                showAuthor: false,
                showDescription: false,
                showDate: false,
            };
    }
};