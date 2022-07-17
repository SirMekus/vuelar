# vuelar

vuelar (Vue-Laravel) is a vue package that takes care of pagination for a Laravel-powered backend on a Single-Page Application. This package assumes familiarity with Laravel and requires vue-router for navigation. This package takes care of extra query parameters that may be appended to a URL as well and not just the 'page=*' query. This way, if your query in the backend is based on some logic or detail, it will still be preserved.

# Installation

$ npm install @sirmekus/vuelar

For starters, this package takes care of the navigation URL and updates the browser so that you can watch the route parameter change and perform any desired action.

# Usage

After Installation, in your app.js file, all you have to do is import the package like so:

```
import { createApp } from 'vue';
import  vuelarPlugin  from "@sirmekus/vuelar"

let app = createApp({});
app.use(vuelarPlugin)

//...continue doing other operations like component registration, etc. After which you can then mount your component(s)
```

Now the package will be available globally and you can reference or use it wherever you want pagination like so (please note that styling is done using Bootstrap 5 so you may want to check it out):

```
<template>

//template content goes in here. For instance, displaying all users of the platform

<vuelar :links="state.result"  />

</template
```

It is good practise to include the pagination component only when it's needed or necessary so the above code can be restructured to:

```
<template>

//template content goes in here. For instance, displaying all users of the platform

<vuelar v-if="state.result.last_page > 1" :links="state.result"  />

</template
```

### Overview

A typical laravel pagination-generated response looks (and should) like this. This is the condition necessary for this package to work.

```
current_page: 1
data: []
first_page_url: "https://example.com/api/users?page=1"
from: 1
last_page: 2
last_page_url: "https://example.com/api/users?page=2"
links: [{url: null, label: "&laquo; Previous", active: false},…]
next_page_url: "https://example.com/api/users?page=2"
path: "https://example.com/api/users"
per_page: 2
prev_page_url: null
to: 2
total: 3
```

In laravel, displaying this pagination has already been taken care of in blade when you do `{{ $result->links() }}` (asssumption: after feeding our view data via a variable called `"$result"`). On the front-end, however, we don't have any sure-fire, any-size-fits-all solution for this. This is where `VueLar` comes to the rescue. 

It is important that the variable being passed to the `:links` variable expected by the vuelar component be reactive. This is because this variable will typically contain data that will change as the pagination changes, thus needs to be 'refreshed' or 'recalculated' as well. To accomplish this you will typically have a function that calls an api after/during/before your component mounts (to avoid repeating yourself). After your component must have been mounted all you have to do is watch the URL bar for changes and then call this function. This package appends a query to the end of your browser url (whatever the URL may be) when a pagination link is clicked which you should then fetch and append as query to your API url. Let's take an example (we'll use the Composition API as it's encouraged but this package is not limited to using only the Composition API):

```
<template>

//template content goes in here. For instance, displaying all users of the platform

<vuelar v-if="state.result.last_page > 1" :links="state.result"  />

</template>

<script type="text/javascript" >
import { reactive, watch } from 'vue'
import { useRoute } from "vue-router"

export default {
    setup() {
        const route = useRoute()
        const endpoint = apiEndpoint //The api endpoint to your Laravel-powered backend where you fetch your data
        const state = reactive({
            result: null, //this is where we'll typical 'save' the result to be used in (y)our template
        })

    //Watch when the URL on the browser tab changes, fetch any available query appended there and then append it to your endpoint URL.
    watch(() => route.params, (toParams, previousParams) => {
            getResult(endpoint, route.query)
        })
        
    async function getResult(endpoint, data=null){
        try {
            const response = await axios.get(endpoint, {
                params: data
            })
            state.result = response.data
        } catch (error) {
           //do whatever your like here
        }
    }

    getResult(endpoint, route.query)

    return {
            state
        }
    }
}
</script>

```

From the above, whenever the URL bar changes the api endpoint will be called with the appended paginated query and the `state` will be 'refreshed'. The actual URL in the browser won't be changed (since in a typical SPA this URL will likely be different from the API endpoint(s)) and any existing query won't be removed or replaced, only the api-generated pagination query will be appended to it so that you can watch it and do whatever you like- typically to call the endpoint again.

I hope you enjoy the package. Greater days ahead