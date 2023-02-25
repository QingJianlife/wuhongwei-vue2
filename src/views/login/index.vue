<template>
    <div>
        <el-button type="primary" @click="goLayout">主要按钮</el-button>
    </div>
</template>

<script>
export default {
    name: 'login',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        goLayout() {
            this.$router.push('/')
        }
    },
};
</script>