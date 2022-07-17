<template>
  <nav v-if="links.current_page && (links?.last_page && links.last_page > 1)" aria-label="Page navigation">
    <ul class="pagination d-flex justify-content-center">
      <li v-if="links.prev_page_url != null" class="page-item">
        <a class="page-link" :href="links.prev_page_url" rel="prev" aria-label="&laquo; Previous"
          @click.prevent="paginate(getQueryStringsFromUrl(links.prev_page_url))">&lsaquo;</a>
      </li>

      <li v-else class="page-item disabled">
        <span class="page-link" aria-hidden="true">&lsaquo;</span>
      </li>

      <template v-for="link in links.links">
        <li v-if="isNaN(link.label) == false" class="page-item" :class="{ active: link.active == true }">
          <a class="page-link" :class="{ 'disabled-link': links.current_page == link.label }" :href="link.url"
            @click.prevent="paginate(getQueryStringsFromUrl(link.url))">{{ link.label }}</a>
        </li>
      </template>


      <li class="page-item" v-if="links.next_page_url != null">
        <a class="page-link" :href="links.next_page_url"
          @click.prevent="paginate(getQueryStringsFromUrl(links.next_page_url))" rel="next"
          aria-label="Next &raquo;">&rsaquo;</a>
      </li>

      <li v-else class="page-item disabled">
        <span class="page-link" aria-hidden="true">&rsaquo;</span>
      </li>
    </ul>

  </nav>
</template>

<script>
import { useRouter, useRoute } from "vue-router"
export default {
  name : "vuelar",
  props: ['links'],
  setup(props) {
    const router = useRouter()
    const route = useRoute()

    function paginate(param) {
      router.push({ name: route.name, query: param })
    }

    function getQueryStringsFromUrl(url){
      if(url.split("?").length > 1){
        var query = url.split("?")[1]
        var urlSearchParams = new URLSearchParams(query)
        var params = Object.fromEntries(urlSearchParams.entries());
        return params
      }
      else{
        return null
      }
    }

    return {
      paginate,
      getQueryStringsFromUrl,
    }


  }
}
</script>