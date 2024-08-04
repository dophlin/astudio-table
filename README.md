# ReactJS Assignment for AStudio

This project implements a web application with two pages, `/users` and `/products`, using reusable components. The application fetches data from the [Dummy JSON API](https://dummyjson.com/) and provides filtering, searching, and pagination functionalities.

## Features

- **Pages**: Two main pages, `/users` and `/products`, utilizing the same reusable components.
- **Data Fetching**: Uses the Axios library to fetch data from the Dummy JSON API.
- **State Management**: Context API is used to manage state across the application.
- **Styling**: 
  - Black: `#322625`
  - Grey: `#ebebeb`
  - Blue: `#c0e3e5`
  - Yellow: `#fdc936`
- **Font**: Neutra Text

## Functionality

### Users Page

- **Filters**:
  - **Page Size**: Default value is 5. Clicking on it opens a dropdown with options 5, 10, 20, and 50. Changing the value sends a request to the API and updates the displayed data accordingly.
  - **Search Icon**: Clicking on it displays a text input for entering a search value, filtering the displayed data client-side. For example, entering "19" will show rows containing "19".
  - **Other Filters**: Each filter sends a request to the API to fetch data based on the specified value. Note: The API does not support filtering by more than one field at a time; changing one filter resets others.

### Products Page

- **Note**: The product API does not support filtering specifically on fields including Title and Brand, even though it is requested by the assignment. It only allows filtering products by a specific category.
- **Filters**:
  - **Category**: A dropdown labeled "Category" is provided as a filter option. It includes "All" and "Laptops," which filter the products accordingly.
  - **Tabs**: 
    - **ALL**: Displays all products.
    - **Laptops**: Displays only laptops.

### Data Table

- Displays data fetched from the API. Includes 12 columns with relevant information, including fields mentioned in the filters.

### Pagination

- Clicking on pagination controls sends a request to the API to fetch data for the corresponding page.

## Installation

1. Clone the repository:
```bash
git clone git@github.com:dophlin/astudio-table.git
```
2. Install dependencies:
```bash
cd astudio-table
yarn install
```
3. Start the development server:
```bash
yarn dev
```
## Usage

- Navigate to `/users` and `/products` pages to explore the functionalities.
- Use filters and pagination controls to interact with the data.

## Technologies Used

- React.js
- Axios
- Context API

## License

This project is licensed under the MIT License.
    
