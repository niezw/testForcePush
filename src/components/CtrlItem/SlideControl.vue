<template>
    <div class="slide-control">
        <template v-if="$props.type === 'bulb'">
            <div class="left">
                <div class="icon">
                    <img class="control" src="@/assets/light-brightness.png" alt="control">
                </div>
                <div class="text">
                    Brightness
                </div>
            </div>
            <div class="slide">
                <a-slider v-model:value="prograssValue" @afterChange='afterChange' />
            </div>
        </template>
        <template v-else-if="$props.type === 'curtain'">
            <div class="left">
                <div class="icon">
                    <img class="control" src="@/assets/curtain.png" alt="control">
                </div>
                <div class="text">
                    Manual
                </div>
            </div>
            <div class="slide">
                <a-slider v-model:value="prograssValue" @afterChange="(value) => afterChange(value,'curtain')" />
            </div>
        </template>
        <template v-else-if="$props.type === 'color-temp'">
            <div class="left">
                <div class="icon">
                    <img class="control" src="@/assets/color-temp.png" alt="control">
                </div>
                <div class="text">
                    Color Temp.
                </div>
            </div>
            <div class="slide" :style="linearColor">
                <a-slider v-model:value="prograssValue" @afterChange='afterChange' />
            </div>
        </template>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import { setCurtainValue } from '@/api/device'

export default defineComponent({
    name:'SlideControl',
    props:{
        type:{
            required:true
        },
        value:{
            required:true,
            type :Number
        },
        cardData:{
            required:true
        }
    },
    data(){
        return {
            prograssValue: 0
        }
    },
    computed:{
        linearColor(){
            return {
                background: 'linear-gradient(to right, #AAD3FF 0%, #FBFDFF 60%, #FFA205 100%)'
            }
        },
    },
    mounted(){
        this.prograssValue = this.$props.value
    },
    watch:{
        '$props.value':function (newV,oldV) {
            this.prograssValue = newV;
        }
    },
    methods:{
        async afterChange(value:any,type:string){
            // console.log(`ML ~ file: SlideControl.vue ~ line 75 ~ afterChange ~ type`, type);
            // console.log(`ML ~ file: FiveBulbControl.vue ~ line 26 ~ afterChange ~ value`, value);
            switch (type){
                case 'curtain':
                    await setCurtainValue(this.cardData,value);
                    return;
                case 'bulb':
                    return;
                case 'color-temp':
                    return;
            }
        }
    }
})
</script>
<style lang="stylus" scoped>
.slide-control
    display flex
    justify-content space-between
    align-items center
    .left
        display flex
        .icon
            margin-right 20px
            .control
                width 20px
                height 20px
    .slide
        width 250px
</style>
