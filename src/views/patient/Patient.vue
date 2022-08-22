<template>
    <div>
        <mt-header title="新生儿胆道闭锁">
            <mt-button icon="more" slot="right" ></mt-button>
        </mt-header>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="扫一扫">
                <Scan></Scan>
            </mt-tab-container-item>
            <mt-tab-container-item id="预约就诊">
                <Reserve></Reserve>
            </mt-tab-container-item>
            <mt-tab-container-item id="相关知识">
                <Guilde></Guilde>
            </mt-tab-container-item>
            <mt-tab-container-item id="我的">
                <Profile></Profile>
            </mt-tab-container-item>
        </mt-tab-container>

        <mt-tabbar v-model="selected">
            <mt-tab-item id="扫一扫">
                <img slot="icon" src="../../assets/img/icon/1.png">
                预约
            </mt-tab-item>
            <mt-tab-item id="预约就诊">
                <img slot="icon" src="../../assets/img/icon/2.png">
                就诊记录
            </mt-tab-item>
            <mt-tab-item id="相关知识">
                <img slot="icon" src="../../assets/img/icon/3.png">
                纠正
            </mt-tab-item>
            <mt-tab-item id="我的">
                <img slot="icon" src="../../assets/img/icon/4.png">
                我的
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
    import Reserve from "./Reserve";
    import Scan from "./Scan";
    import Guilde from "./Guilde";
    import Profile from "./Profile";
    export default {
        name: "Patient",
        components: {Profile, Guilde, Scan, Reserve},
        data(){
            return {
                selected:'扫一扫',
            }
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>
