<template>
    <div class="channel-switch">
        <div class="icon">
            <img
                v-if="stat"
                src="@/assets/flash-on.svg"
                alt="flash icon"
            />
            <img
                v-else-if="!stat"
                src="@/assets/flash-off.svg"
                alt="flash icon"
            />
        </div>
        <div class="text">
            <p class="title">{{ getTitle }}</p>
        </div>
        <div class="action">
            <a-switch
                :checked="stat"
                @change="toggle"
                :disabled="!cardData.online"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { toggleChannel } from '@/api/device';
import { CardData } from '@/types';

export default defineComponent({
    name: 'ChannelSwitch',

    props: {
        title: {
            default: ''
        },
        index: {
            default: 0
        },
        stat: {
            required: true
        },
        cardData: {
            type: Object as PropType<CardData>,
            required: true
        }
    },

    methods: {
        async toggle(v: boolean, e: any) {
            e.stopPropagation();
            await toggleChannel(v, this.cardData, this.index);
        }
    },

    computed: {
        getTitle() {
            const channelName = this.cardData?.tags ? this.cardData?.tags[this.index] : ''
            const commonName = `${this.$t('card.channel')}${this.index + 1}`
            return channelName ? channelName : commonName
        }
    }
});
</script>

<style lang="stylus" scoped>
.channel-switch
    display flex
    align-items center

    .icon
        display flex
        justify-content center
        align-items center
        width 32px
        height 32px

    .text
        flex 1
        display flex
        justify-content space-between
        align-items center
        margin 0 14px
        & > p
            margin 0
        .title
            margin-right 14px

    .action
        display flex
        justify-content center
        align-items: center
        margin-right 6px
</style>
