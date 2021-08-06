<template>
	<transition name="text-right">
		<div class="consultant-text-amin" v-show="STEP_COUNTER === index + 1">
			{{ itemdata.consultant_text }}
		</div>
	</transition>
</template>

<style>

   .text-right-enter-active {
    	transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  	}
  	.text-right-leave-active {
    	transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  	}
  	.text-right-enter {
    	transform: translateX(100%);
    	opacity: 0;
  	}
  	.text-right-leave
  /* .slide-fade-leave-active до версии 2.1.8 */ {
    	transform: translateX(-100%);
    	opacity: 0;
  	}



</style>

<script>

	import { mapGetters } from 'vuex'
	

	export default {
		components: {
			
		},
		props: {
			'itemdata': {
				default: {}
			},
			'index': {
				default: 0
			}
		},
		computed: {
			...mapGetters(['CONSULTANT','STEP_COUNTER'])
		}
	}


</script>