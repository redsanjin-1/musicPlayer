<template>
    <div class="header">
        {{msg}}
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            msg: 'this is header'
        }
    },
    components: {

    }
};
</script>

<style scoped>
.header {
    color: red;
    text-align: center
}
</style>