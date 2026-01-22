Frontend Camera Management Dashboard
A robust and intuitive dashboard designed for the efficient management of security camera infrastructures. This project was developed as part of the Frontend Developer selection process for Wobot AI, focusing on performance, modularity, and adherence to strict design principles.

🚀 Live Demo
Deployment Link: https://vercel.com/vanshs-projects-0034dad9/wobot2/CKTZtYrJTcGspEdYFPhiYMcZwTby

✨ Key Features
Real-time Data Integration: Synchronizes with the Wobot AI API to fetch and display live camera systems.

Multi-Parameter Filtering: Allows users to filter the camera inventory based on physical Location and operational Status (Active/Inactive).

Instant Search: Features a global search bar for real-time keyword-based camera identification.

Optimistic Status Updates: Implements high-speed status toggling through API POST requests with immediate local state synchronization for a fluid UI experience.

Custom Pagination Engine: Supports configurable page limits (10/20 rows) and full navigation controls, engineered without external libraries.

Responsive Design: Fully optimized for mobile, tablet, and desktop environments using custom CSS media queries.

🛠️ Technical Stack
To demonstrate fundamental frontend proficiency, this project avoids high-level UI abstractions in favor of core technologies:

React (v18): Leverages functional components and hooks (useState, useEffect) for state orchestration.

Vanilla CSS: Utilizes custom CSS variables, Flexbox, and Grid for styling, strictly adhering to the "No UI Library" requirement.

Vite: Employed as the primary build tool for optimized development and production cycles.

Axios: Manages asynchronous API communications and error handling.

Lucide React: Integrated for scalable and lightweight iconography.

Follow these steps to initialize the project locally:

1. Clone the Repository:

    git clone [Your-Repo-URL]
   cd [Your-Project-Folder]

2. Install Dependencies:

   npm install

3. Configure Environment Variables: Create a .env file in the root directory and append the following credentials:

   VITE_APITOKEN = [Your_Unique_API_Token]
   VITE_URL = [Your API URL]

4. Execute Development Environment:

   npm run dev

🧠 Architectural Decisions
Vanilla CSS vs. Tailwind/Bootstrap: To comply with the "No UI Library" constraint, all styling was custom-authored to demonstrate proficiency in CSS architecture and the Box Model.

Derived State Management: Filtering and search logic are implemented using the "Derived State" pattern, recalculating filtered lists during render to ensure data integrity and performance.

Technical Documentation: All components are documented using JSDoc standards to facilitate code readability and developer handovers.

Developed by: Vansh Mudgal
