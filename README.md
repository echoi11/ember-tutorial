# ember-tutorial

Here are my notes from going through the ember.js tutorial

Source:
https://guides.emberjs.com/release/tutorial/part-1/


https://deb.nodesource.com/setup_12.x — Node.js 12 LTS "Erbium" (recommended)
   * https://deb.nodesource.com/setup_14.x — Node.js 14 LTS "Fermium"



# to install pub key
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -

# download and run setup.sh for nodesource
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash

sudo apt-get install -y nodejs


#now install ember js

sudo npm install -g ember-cli

ember --version

# create new ember project

ember new <proj_name>

# start the server. default port is 4200
ember server


# static pages
./app/templates/*.hbs
# url routers
./app/router.js

# acceptance tests
ember generate acceptance-test super-rentals

# generate new components (that can be re-used)
# --with-component-class creates a javascript file that allows defining behavior on the component
# see component-class generator to add a JS file to a component later.
# alternate command is ember g component map -gc, g=glimmer, gc=glimmer component
ember generate component <component-name> --with-component-class


# start auto AT test server; generates test report on localhost:7357
ember test --server

# set environment variables, such as Mapbox access token, here.
# changes to this file is NOT auto loaded.
config/environment.js

# parameterize using {{@parameter}}
# e.g. app/components/map.hbs
src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/{{@lng}},{{@lat}},{{@zoom}}/{{@width}}x{{@height}}@2x?access_token={{this.token}}"
    width={{@width}} height={{@height}}

# ...attributes, used to allow invoker to pass in extra attributes such as class, and allow overriding of existing attributes. Note, attributes appearing later will override prior attributes.


# user this.args.* API to access components arguments from within a javascript class
# e.g. create a function get src() {} in .js file, then refer to it in .hbs file as {{this.src}}

# ember autotracks any variables that rely on variables that are marked with @tracked

# to load data, create app/routes/index.js and use Route library
# functions for retrieving data are typically marked as async.
# this allows for await keyword to wait for data fetching operations to finish.

# using mock data in json files. put in public/api/rentals.json
# As mentioned above, fetching data from the server is usually an asynchronous operation. The Fetch API takes this into account, which is why fetch is an async function, just like our model hook. To consume its response, we will have to pair it with the await keyword.
# see app/routes/index.js
#     let response = await fetch('/api/rentals.json');
#    let parsed = await response.json();
#    return parsed;

# We can use the {{#each}}...{{/each}} in .hbs file to loop through an array of data.

# use app/router.js to create new urls, i.e. page to a specific listing
# use :rental_id (:) to specify a dynamic segment


# ember generate model rental
# create models in app/models/*.js.  This helps reduce code duplication found in app/routes/*.js
# Attributes declared with the @attr decorator work with the auto-track feature (which we learned about in a previous chapter). Therefore, we are free to reference any model attributes in our getter (this.category), and Ember will know when to invalidate its result.

# update app/routes/*.js with
# return this.store.findAll('rental');
# As mentioned above, Ember Data provides a store service, which we can inject into our route using the @service store; declaration, making the Ember Data store available as this.store. It provides the find and findAll methods for loading records. Specifically, the find method takes a model type (rental in our case) and a model ID (for us, that would be params.rental_id from the URL) as arguments and fetches a single record from the store. On the other hand, the findAll method takes the model type as an argument and fetches all records of that type from the store.

# Adapters and Serializers
# how and where to retrieve data
# By convention, adapters are located at app/adapters. Furthermore, the adapter named application is called the application adapter, which will be used to fetch data for all models in our app.
# Similarly, serializers are located at app/serializers. Adapters and serializers are always added together as a pair. We added an application adapter, so we also added a corresponding serializer to go with it as well. Since the JSON data returned by our server is JSON:API-compliant, the default JSONAPISerializer work just fine for us without further customization.

# Inputs
#Ember's <Input> component is pretty neat; it will wire up things behind the scenes such that, whenever the user types something into the input box, this.query changes accordingly. In other words, this.query is kept in sync with the value of what is being searched; we finally have the perfect way of storing the state of our search query!

# If you want to see this in action, try adding <p>{{this.query}}</p> to the component template and watch it update live as you type!

# Filtering rentals.
Adding the <Rentals::Filter> Provider Component
Now that our search query is wired up to our <Rentals> component, we can get into the really fun stuff! Namely, we can make our component filter results based on our search query. In order to encapsulate this functionality, we'll create another component called <Rentals::Filter>.
