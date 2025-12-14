# Kitsu - Anime Discovery Platform

A modern web application for discovering, searching, and learning about anime using the official Kitsu API. Browse thousands of anime titles with detailed information and advanced filtering options.

## Features

### Anime Discovery
- **Browse Anime**: Automatically loads popular anime when you open the app
- **Search Function**: Search for anime by title keyword
- **Detailed Information**: View comprehensive details about each anime including:
  - Poster image
  - Title and alternative titles
  - Average rating (percentage)
  - Air status (current, finished, upcoming)
  - Episode count and episode length
  - Age rating
  - Start and end dates
  - Genres
  - Full synopsis

### Filtering & Sorting
- **Status Filter**: Filter anime by:
  - Currently Airing
  - Finished Airing
  - Upcoming
- **Rating Filter**: Filter by content rating:
  - G (All Ages)
  - PG (Children)
  - PG-13 (Teens 13+)
  - R (17+)
  - R18+ (Adults)

### Navigation
- **Grid Layout**: Browse anime in an organized grid
- **Pagination**: Navigate through pages of results
- **Previous/Next Buttons**: Easy navigation between pages
- **Page Counter**: See your current page number

### User Interface
- **Dark Theme**: Easy on the eyes with a modern dark interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modal Details**: Click any anime card to view full details in a popup
- **Loading Indicator**: Visual feedback while fetching data
- **Empty States**: Clear messages when no results are found

## How to Use

### Browsing Anime
1. Open `index.html` in your web browser
2. The app automatically loads popular anime on startup
3. Scroll through the anime grid to see available titles
4. Use the Next/Previous buttons at the bottom to navigate between pages

### Searching for Anime
1. Enter the anime title in the search bar at the top
2. Click the "SEARCH" button or press Enter
3. Results will update to show matching anime

### Filtering Results
1. Use the **Status Filter** dropdown to filter by airing status
2. Use the **Rating Filter** dropdown to filter by content rating
3. Filters work together - both applied filters will be active
4. Filters can be combined with search results

### Viewing Anime Details
1. Click on any anime card in the grid
2. A modal window will open with full details
3. Read the synopsis, check ratings, genres, and dates
4. Click the X button or outside the modal to close it

### Keyboard Navigation
- **Type in Search**: Start typing to search for anime
- **Enter Key**: Submit search query
- **Click Cards**: View detailed information

## API Integration

This application uses the **Kitsu API** - a free, public API for anime data.

- **Base URL**: `https://kitsu.io/api/edge`
- **Endpoints Used**:
  - GET `/anime` - Fetch anime list
  - Filter parameters for search, status, and rating
- **No Authentication Required**: The API is public and free to use
- **Rate Limits**: Reasonable rate limits apply (typically sufficient for personal use)

## Features Explained

### Search
- Searches anime titles in the Kitsu database
- Returns results matching your keyword
- Works with partial matches (e.g., "demon" will find "Demon Slayer")

### Status Options
- **Current**: Anime currently airing new episodes
- **Finished**: Anime that has completed its run
- **Upcoming**: Anime that hasn't aired yet

### Ratings
- **G**: Suitable for all ages
- **PG**: Parental guidance suggested
- **PG-13**: Parents strongly cautioned for ages 13+
- **R**: Restricted to ages 17+
- **R18+**: Restricted to ages 18+ only

## Files

- `index.html` - HTML structure and layout
- `styles.css` - Styling, responsive design, and dark theme
- `script.js` - API integration, search, filtering, and interactivity
- `README.md` - This file

## Browser Compatibility

Works on all modern browsers:
- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

Requires JavaScript to be enabled.

## Tips

1. **First Load**: The first time you load the page, it may take a moment to fetch data from the API
2. **Combine Filters**: Use both status and rating filters together for more specific results
3. **Click to Explore**: Each anime card contains a wealth of information - click to learn more
4. **Mobile Friendly**: The grid automatically adjusts for different screen sizes
5. **Pagination**: If you have many results, use pagination to browse without overwhelming the page

## Troubleshooting

### No Anime Loading
- Check your internet connection
- The Kitsu API may be temporarily unavailable
- Try refreshing the page

### Search Returns No Results
- Try searching with different keywords
- Some anime may not be in the Kitsu database
- Check for spelling errors

### Page Takes Too Long to Load
- The API might be slow
- Wait a few seconds for the loading spinner to complete
- Try refreshing the page

## API Credits

Data provided by [Kitsu](https://kitsu.io/) - A modern anime discovery platform.

This is an unofficial application that uses the public Kitsu API for educational and personal use purposes.
