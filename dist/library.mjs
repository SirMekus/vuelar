import { useRouter, useRoute } from 'vue-router';
import { openBlock, createElementBlock, createElementVNode, withModifiers, Fragment, renderList, normalizeClass, toDisplayString, createCommentVNode } from 'vue';

var script = {
  name : "vuelar",
  props: ['links'],
  setup(props) {
    const router = useRouter();
    const route = useRoute();

    function paginate(param) {
      router.push({ name: route.name, query: param });
    }

    function getQueryStringsFromUrl(url){
      if(url.split("?").length > 1){
        var query = url.split("?")[1];
        var urlSearchParams = new URLSearchParams(query);
        var params = Object.fromEntries(urlSearchParams.entries());
        return params
      }
      else {
        return null
      }
    }

    return {
      paginate,
      getQueryStringsFromUrl,
    }


  }
};

const _hoisted_1 = {
  key: 0,
  "aria-label": "Page navigation"
};
const _hoisted_2 = { class: "pagination d-flex justify-content-center" };
const _hoisted_3 = {
  key: 0,
  class: "page-item"
};
const _hoisted_4 = ["href"];
const _hoisted_5 = {
  key: 1,
  class: "page-item disabled"
};
const _hoisted_6 = /*#__PURE__*/createElementVNode("span", {
  class: "page-link",
  "aria-hidden": "true"
}, "‹", -1 /* HOISTED */);
const _hoisted_7 = [
  _hoisted_6
];
const _hoisted_8 = ["href", "onClick"];
const _hoisted_9 = {
  key: 2,
  class: "page-item"
};
const _hoisted_10 = ["href"];
const _hoisted_11 = {
  key: 3,
  class: "page-item disabled"
};
const _hoisted_12 = /*#__PURE__*/createElementVNode("span", {
  class: "page-link",
  "aria-hidden": "true"
}, "›", -1 /* HOISTED */);
const _hoisted_13 = [
  _hoisted_12
];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return ($props.links.current_page && ($props.links?.last_page && $props.links.last_page > 1))
    ? (openBlock(), createElementBlock("nav", _hoisted_1, [
        createElementVNode("ul", _hoisted_2, [
          ($props.links.prev_page_url != null)
            ? (openBlock(), createElementBlock("li", _hoisted_3, [
                createElementVNode("a", {
                  class: "page-link",
                  href: $props.links.prev_page_url,
                  rel: "prev",
                  "aria-label": "« Previous",
                  onClick: _cache[0] || (_cache[0] = withModifiers($event => ($setup.paginate($setup.getQueryStringsFromUrl($props.links.prev_page_url))), ["prevent"]))
                }, "‹", 8 /* PROPS */, _hoisted_4)
              ]))
            : (openBlock(), createElementBlock("li", _hoisted_5, _hoisted_7)),
          (openBlock(true), createElementBlock(Fragment, null, renderList($props.links.links, (link) => {
            return (openBlock(), createElementBlock(Fragment, null, [
              (isNaN(link.label) == false)
                ? (openBlock(), createElementBlock("li", {
                    key: 0,
                    class: normalizeClass(["page-item", { active: link.active == true }])
                  }, [
                    createElementVNode("a", {
                      class: normalizeClass(["page-link", { 'disabled-link': $props.links.current_page == link.label }]),
                      href: link.url,
                      onClick: withModifiers($event => ($setup.paginate($setup.getQueryStringsFromUrl(link.url))), ["prevent"])
                    }, toDisplayString(link.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_8)
                  ], 2 /* CLASS */))
                : createCommentVNode("v-if", true)
            ], 64 /* STABLE_FRAGMENT */))
          }), 256 /* UNKEYED_FRAGMENT */)),
          ($props.links.next_page_url != null)
            ? (openBlock(), createElementBlock("li", _hoisted_9, [
                createElementVNode("a", {
                  class: "page-link",
                  href: $props.links.next_page_url,
                  onClick: _cache[1] || (_cache[1] = withModifiers($event => ($setup.paginate($setup.getQueryStringsFromUrl($props.links.next_page_url))), ["prevent"])),
                  rel: "next",
                  "aria-label": "Next »"
                }, "›", 8 /* PROPS */, _hoisted_10)
              ]))
            : (openBlock(), createElementBlock("li", _hoisted_11, _hoisted_13))
        ])
      ]))
    : createCommentVNode("v-if", true)
}

script.render = render;
script.__file = "src/vuelar.vue";

var components = { vuelar: script };

const vuelarPlugin = {
  install (Vue) {
    for (const prop in components) {
      if (components.hasOwnProperty(prop)) {
        const component = components[prop];
        Vue.component(component.name, component);
      }
    }
  }
};

export { vuelarPlugin as default };
