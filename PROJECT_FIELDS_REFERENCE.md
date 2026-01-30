# Project Model - Field Reference

## Project Fields (Updated)

The Project model now includes the following fields:

### Required Fields:
- **id** (String) - Auto-generated MongoDB ID
- **name** (String) - Project name
- **imageUrl** (String) - URL to project image

### Optional Fields:
- **description** (String) - Detailed description of the property
- **type** (String) - Property type (e.g., "Modern Skyline Apartments", "Luxury Villa Estate", "Penthouse Paradise")
- **location** (String) - Location/address (e.g., "Downtown Manhattan, NY", "Beverly Hills, CA", "Miami Beach, FL")
- **price** (Double) - Property price in dollars (e.g., 850000)
- **bedrooms** (Integer) - Number of bedrooms (e.g., 3, 4, 5)
- **bathrooms** (Integer) - Number of bathrooms (e.g., 2, 3, 4)
- **squareFeet** (Double) - Property size in square feet (e.g., 2400, 5800, 3600)

## Example Project Data (JSON)

```json
{
  "name": "Modern Skyline Apartments",
  "type": "Apartment",
  "description": "Luxurious high-rise apartments with breathtaking city views",
  "imageUrl": "https://example.com/apartment.jpg",
  "location": "Downtown Manhattan, NY",
  "price": 850000,
  "bedrooms": 3,
  "bathrooms": 2,
  "squareFeet": 2400
}
```

```json
{
  "name": "Luxury Villa Estate",
  "type": "Villa",
  "description": "Exclusive beachfront villa with premium amenities",
  "imageUrl": "https://example.com/villa.jpg",
  "location": "Beverly Hills, CA",
  "price": 3200000,
  "bedrooms": 5,
  "bathrooms": 4,
  "squareFeet": 5800
}
```

```json
{
  "name": "Penthouse Paradise",
  "type": "Penthouse",
  "description": "Modern penthouse with panoramic views and luxury finishes",
  "imageUrl": "https://example.com/penthouse.jpg",
  "location": "Miami Beach, FL",
  "price": 2500000,
  "bedrooms": 4,
  "bathrooms": 3,
  "squareFeet": 3600
}
```

## How to Add Projects via API

### Using cURL:
```bash
curl -X POST http://localhost:8080/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Modern Skyline Apartments",
    "type": "Apartment",
    "description": "Luxurious high-rise apartments with breathtaking city views",
    "imageUrl": "https://example.com/apartment.jpg",
    "location": "Downtown Manhattan, NY",
    "price": 850000,
    "bedrooms": 3,
    "bathrooms": 2,
    "squareFeet": 2400
  }'
```

### Using Postman:
1. Set method to **POST**
2. Set URL to `http://localhost:8080/api/projects`
3. Go to **Body** tab and select **raw** → **JSON**
4. Paste the project JSON data
5. Click **Send**

## Frontend Display

The projects are displayed as cards showing:
- **Image** with price badge
- **Type** badge (colored tag)
- **Name** (large heading)
- **Location** with location pin icon
- **Description** (truncated)
- **Specs** - Bedrooms, Bathrooms, Square Footage icons
- **View Details** button

Cards have hover animation for better user experience.
