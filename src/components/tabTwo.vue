<template>
    <h1 class="title">
        {{msg}}
    </h1>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            msg: 'this is tabTwo'
        }
    },
    components: {

    }
};
</script>

<style scoped>
.title {
    font-size: 36px;
    line-height: 2;
    text-align: center;
    color: green
}
</style>