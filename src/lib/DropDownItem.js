import {SvelteComponent} from "svelte";

export class Category {
    /** @type {String}*/
    color
    /** @type {String}*/
    title
    icon
    /**@type {Array<SubCategory>}*/
    sub_categories

    /**
     *
     * @param {String} color
     * @param {String} title
     * @param  icon
     * @param {Array<SubCategory>} sub_categories
     */
    constructor(color, title, icon, sub_categories) {
        this.color = color;
        this.title = title;
        this.icon = icon;
        this.sub_categories = sub_categories;
    }
}


export class SubCategory {
    /** @type {String}*/
    color
    /** @type {String}*/
    title
    icon
    /** @type {Boolean}*/
    is_clickable
    /** @type {Function}*/
    on_click
    /** @type {Boolean}*/
    has_page
    page

    /**
     *
     * @param {String} color
     * @param {String} title
     * @param  icon
     * @param {Boolean} is_clickable
     * @param {Function} on_click
     * @param {Boolean} has_page
     * @param  page
     */
    constructor(color, title, icon, is_clickable, on_click, has_page, page) {
        this.color = color;
        this.title = title;
        this.icon = icon;
        this.is_clickable = is_clickable;
        this.on_click = on_click;
        this.has_page = has_page;
        this.page = page;

    }
}
