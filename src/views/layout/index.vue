<template>
    <div>
        我是布局页
        <el-button type="primary" @click="goThree">主要按钮</el-button>
    </div>
</template>
<script>
export default {
    name: 'threejs',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        goThree() {
            this.$router.push('/threejs')
        }
    },
};
</script>
<style scoped>
    
</style>