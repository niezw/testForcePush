<template>
    <div class="curtain">
        <div class="icon-item">
            <control-circle type="curtain" curtainType="allon" @click.stop="curtainAction('on')"/>
            <control-circle type="curtain" curtainType="pause" @click.stop="curtainAction('pause')"/>
            <control-circle type="curtain" curtainType="alloff" @click.stop="curtainAction('off')"/>
        </div>
        <div class="status">
            <div class="topText">{{ $t('card.status') }}</div>
            <div class="curtain-status">
                {{ status }}
            </div>
        </div>
        <div class="slide">
            <ctrl-slider type="curtain" :cardData="cardData"/>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import ControlCircle from '@/components/CtrlItem/ControlCircle.vue';
import SlideControl from '@/components/CtrlItem/SlideControl.vue';
import CtrlSlider from '@/components/CtrlItem/CtrlSlider.vue';

import { curtainControl } from '@/api/device';

export default defineComponent({
    name:'Curtain',
    components:{
        SlideControl,
        ControlCircle,
        CtrlSlider
    },
    props:{
        cardData:{
            required:true
        }
    },
    computed:{
        status(){
            const { $t, cardData } = this as any;
            if(!cardData) return '';
            switch (cardData.params.setclose){
                case 100:
                    return $t('card.curtainalloff')
                case 0:
                    return $t('card.curtainallon')
                default:
                    return typeof cardData.params.setclose === 'number' ? `${cardData.params.setclose}%` : '50%'
            }
        },
        curtainValue():number{
            const { params } = this.cardData as any
            console.log(`ML ~ file: Curtain.vue ~ line 56 ~ curtainValue ~ params`, params);
            return params && params.setclose;
        }
    },
    methods:{
        async curtainAction(action:string){
            console.log('curtain');
            await curtainControl(this.cardData,action)
        },
    }
})
</script>
<style lang="stylus" scoped>
.curtain
    display flex
    flex-direction column
    justify-content center
    align-items center
    .icon-item
        width 100%
        display flex
        justify-content space-between
        align-items center
    .status
        display flex
        flex-direction column
        justify-content center
        margin-top 14px
        .topText
            text-align center
            font-size 16px
            color: #8C8C8C;
        .curtain-status
            font-size 28px
            color: #212121;
    .slide
        width 100%
</style>
