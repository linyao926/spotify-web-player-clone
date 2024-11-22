export const mapToNormalCardData = (item, type) => {
    switch (type) {
        case 'track':
            return {
                imgCircle: false,
                imgUrl: item.album?.images[0]?.url || '',
                title: item.name,
                subtitle: item.artists?.[0]?.name || '',
                routeLink: `/track/${item.id}`,
            };
            
        case 'album':
            return {
                imgCircle: false,
                imgUrl: item.images?.[0]?.url || '',
                title: item.name,
                subtitle: item.artists?.[0]?.name || '',
                routeLink: `/album/${item.id}`,
            };
            
        case 'artist':
            return {
                imgCircle: true,
                imgUrl: item.images?.[0]?.url || '',
                title: item.name,
                subtitle: 'Artist',
                routeLink: `/artist/${item.id}`,
            };

        case 'playlist': 
            return {
                imgCircle: false,
                imgUrl: item.images?.[0]?.url || '',
                title: item.name,
                subtitle: 'Artist',
                routeLink: `/artist/${item.id}`,
            };
            
        default:
            return {
                imgCircle: false,
                imgUrl: '',
                title: 'Unknown',
                subtitle: '',
                routeLink: '#',
            };
    }
};