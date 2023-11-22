This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# SCI Idea Board
## <a name="background"></a> Background
This is a web app developed for the University of Pittsburgh's School of Computing and Information, which is designed to replace the physical feedback boards located on campus in an effort for SCI to better field, analyze, & implement feedback from students, staff, and faculty. This project was initially developed by Shresta Kalla ([@shresta-kalla](https://github.com/shresta-kalla)), Brian Kim ([@briankim-pitt](https://github.com/briankim-pitt)), & Jonathan Price ([@jonprice99](https://github.com/jonprice99)) under the supervision of Matt de Lima Barbosa ([@drummondpitt](https://www.github.com/drummondpitt)) & Luis Oliveira ([@luisfnqoliveira](https://github.com/luisfnqoliveira)) for the Fall 2023 CS/CompBio Group Project Capstone (CS1980).

## <a name="requirements-and-dependencies"></a> Core Requirements & Dependencies
**Please ensure the following are installed & ready before proceeding:**
- Python 3.10
- Django 4.2.5
- Node.js 6.9.0
- Next.js 14
- MySQL Database *(Please ensure that it has all underlying tables with the schema defined in `./billboard/BillboardAPI/models.py` is accessible prior to running this project.)*

_To install additional dependencies related to the Django database API:_
```bash
# from the project root directory
pip install -r requirements.txt
```

_To install additional dependencies related to the Next.js web app:_
```bash
# from the project root directory
npm install
```

_To install the virtual environment for the Django database API:_
```bash
# from the project root directory
python3 -m venv myenv
```

## <a name="getting-started-development"></a> Getting Started for Development

To run the virtual environment for the Django database API:
```bash
# from the project root directory
./myenv/Scripts/Activate.ps1
```

_Should you need to deactivate the virtual environment:_
```bash
# from any folder while the virtual environment is running
deactivate
```

To run the back-end development server for the Django database API from the project root folder:
```bash
# starting from the project root directory
cd billboard
python manage.py runserver

# Note: Database connection settings are found in: ./billboard/billboard/settings.py
```

To run the front-end development server for the Next.js web app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the homepage.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Rubik & Open Sans, fonts affiliated with the University of Pittsburgh, from Google Fonts.

## <a name="next-development-overview"></a> A Rough Overview for Development with Next.js
This web app is built with Next.js 14, a framework that extends React.js and further enhances its capabilities. To get more in-depth info about Next, check [Learn More About Next.js](#learn-more-nextjs) for documentation and tutorial links. However, here are some rough overviews of the topics you may need to know for future/continued development:

### The App Router & Components
The app router is a new paradigm for building applications using React's latest features which enables greater modularity with CSS and components on a page-by-page level. This app router also better enables accessing parameters passed in from the URL for navigation and processing. All parts of the front-end web app such as pages, CSS formatting modules, JavaScript functions, & etc., live in the `./app` directory. Each page can have its own independent CSS styling that can be imported from the appropriate `.module.css` file of your choosing. The `./app/components` directory holds functions and web page parts (i.e., headers, footers, grids, etc.) that can then be used on multiple pages by imported and called within a return statement of a `.js` or `.jsx` file. *(To see an example of this, check out how `./app/layout.js` references './app/components/Header.jsx' by importing `Header` and referencing `<Header />` in the return statement.)*

### The Homepage & Use of layout.js
The file `./app/layout.js` is where any elements and/or CSS you wish to have present across **all pages** in the web app will live and be referenced/pulled from (i.e., headers, footers, global CSS formatting). The file `./app/page.js` is the homepage of the whole web app and it **does not** need to be located in a subdirectory of `./app`, unlike other pages in the web app.

### Adding New Pages to the Web App
**If you wish to have a page with a static URL:** You must create a subdirectory within the `./app` directory. This subdirectory's name will be used for the URL to that page, so it is best to be mindful of typical URL naming conventions & guidelines when you are naming it. The `.js` or `.jsx` file you create in that subdirectory to be the appropriate webpage for that URL **must** be named `page.jsx` for the Next.js App Router to recognize it as a webpage to be returned rather than a component. *(To see an example of this, check out `./app/login` and its related `page.jsx` file.)*

**If you wish to have a page with a dynamic URL:** Like with pages that use a static URL, you **must** create a subdirectory within the `./app` directory. Additionally, you **must** surround the name, at the least, with square brackets (e.g., `./app/[example]`). This will enable any value entered into the URL in that route to be handed into the router as an argument/parameter. *(To see an example of this, check out `./app/[category]` and its related `page.jsx` file)* If you wish to see more mutations of how this function of the Next.js App Router works, check out the following sections of their documentation:
- [Next.js Dynamic Routes (Catch-all Segments)](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#catch-all-segments)
- [Next.js Dynamic Routes (Optional Catch-all Segments)](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#optional-catch-all-segments)

### Adding Additional Assets
If you wish to have custom images, files, & etcetera as assets in the web app, place them in the `./public` directory, then import them into the appropriate `page.jsx` file for whichever webpage you wish to have it present in. *(For an example of this, check out how `./app/components/Home_Center.jsx` imports and references the files `Shield_White.png` and `Shield_Black.png` from the `./public` directory.)*

## <a name="django-development-overview"></a> A Rough Overview for Development with Django
This web app uses the Django REST framework for Python to build out an API for accessing and modifying the database which houses information related to the web app's core functionality (i.e., feedback categories, posts, users, etc). If you wish to learn more about Django, you can do so using the official website [here](https://www.django-rest-framework.org/).

### Adding a New Table to the Model
First, add a new serializer to `./billboard/BillboardAPI/serializers.py` similar to those that are premade in the file already. Then, add the definition of the table in accordance with its established schema in the database in `./billboard/BillboardAPI/models.py` in a similar fashion to those that are already defined in the file.

### Adding New API Endpoints
First, add and define the view/function to `./billboard/BillboardAPI/views.py` in a similar style to those that are already defined in the file. Then, add and define the URL path that will be used to perform a fetch from the Next.js front-end in `./billboard/BillboardAPI/urls.py` in a similar format to those that are already defined in the file.

## <a name="learn-more-nextjs"></a> Learn More About Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## <a name="deployment"></a> Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js. However, there are several other deployment options that you may consider and use (i.e., self-hosting).

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details on deployment.
