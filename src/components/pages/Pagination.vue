<template>
    <div>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item"  :class="{'disabled': !pagesData.has_pre}">
                <a class="page-link" href="#" aria-label="Previous"
                @click.prevent="currentPage(pagesData.current_page - 1)">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                <li class="page-item" v-for="page in pagesData.total_pages" 
                :key="page" :class="{'active': page === pagesData.current_page}">
                    <a class="page-link" href="#" @click.prevent="currentPage(page)">
                    {{ page }}
                    </a>
                </li>
                <li class="page-item" :class="{'disabled': !pagesData.has_next}">
                <a class="page-link" href="#" aria-label="Next"
                @click.prevent="currentPage(pagesData.current_page + 1)">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    props: ['pagesData'],
    methods: {
        currentPage(page) {
            this.$emit('current-page', page);
        }
    }
}
</script>