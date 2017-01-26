import Page from './index.vue';

export function render(el, data) {
    new Vue({
        el,
        render: h => h(Page, {
            props: data
        })
    });
}
